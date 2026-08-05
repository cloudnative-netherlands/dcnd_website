# GitHub Pages Deployment and Netlify Migration

This document describes how the Dutch Cloud Native Day website is built and
deployed on GitHub Pages, what still has to be configured by hand in GitHub and
DNS, and how to cut over from the current Netlify deployment with a rollback
path at every step.

- [Architecture](#architecture)
- [How the workflow works](#how-the-workflow-works)
- [Path prefix handling](#path-prefix-handling)
- [Running the production build locally](#running-the-production-build-locally)
- [Triggering a manual deployment](#triggering-a-manual-deployment)
- [Required GitHub configuration](#required-github-configuration)
- [CNAME decision](#cname-decision)
- [DNS records](#dns-records)
- [Cutover procedure](#cutover-procedure)
- [Validation commands](#validation-commands)
- [Netlify assessment](#netlify-assessment)
- [Known limitations and risks](#known-limitations-and-risks)

## Architecture

```text
GitHub repository (main)
  └── GitHub Actions: .github/workflows/pages.yml
        ├── npm ci
        ├── npm run test:analytics
        ├── gatsby build            → public/
        ├── actions/upload-pages-artifact (public/)
        └── actions/deploy-pages    → GitHub Pages
              └── https://www.dutchcloudnativeday.nl
```

There is exactly one deployment mechanism. The generated `public/` directory is
never committed (it stays in `.gitignore`), and there is no `gh-pages` branch —
the build output only ever travels as a Pages artifact.

## How the workflow works

[`.github/workflows/pages.yml`](../.github/workflows/pages.yml) runs on every
push to `main` and on manual `workflow_dispatch`. It uses the official Pages
actions and the permissions required by the OIDC-based deployment:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

A `concurrency: { group: pages, cancel-in-progress: false }` block lets one
deployment finish before the next one starts.

### Job `build`

1. `actions/checkout@v4`.
2. `actions/setup-node@v4` with Node.js 22 and the built-in npm cache. The
   project requires `node >= 20.5.1` (`package.json` → `engines`) and has no
   `.nvmrc` or `.node-version`, so Node 22 is the current supported release that
   satisfies it.
3. `npm ci` — installs exactly what `package-lock.json` pins.
4. `npm run test:analytics` — the repository's existing analytics/consent test
   (`scripts/test-analytics-consent-and-goatcounter.mjs`). It is the only test
   script in the repository and it guards production analytics behavior, so it
   runs before anything is deployed.
5. `actions/configure-pages@v5` — reports where the site will actually be
   served from (`base_url`, `base_path`).
6. `npm run build` — `gatsby build`, with the environment described in
   [Path prefix handling](#path-prefix-handling).
7. A verification step that fails the run before upload unless every important
   generated file exists (see below).
8. `actions/upload-pages-artifact@v3` with `path: ./public`.

### Job `deploy`

`actions/deploy-pages@v4` in the `github-pages` environment publishes the
uploaded artifact. The deployed URL is exposed as the environment URL on the
workflow run.

### Verified output

The build fails before deployment if any of these are missing:

```text
public/index.html
public/program/index.html
public/schedule/index.html
public/speakers/index.html
public/team/index.html
public/vision/index.html
public/privacy/index.html
public/conduct/index.html
public/404.html
public/sitemap-index.xml
public/manifest.webmanifest
public/2025/index.html
public/2025/schedule/index.html
```

These are the real generated routes. Note two of them in particular:

- The code of conduct is served from `/conduct/`, not `/code-of-conduct/` — the
  slug comes from `content/static-pages/code_conduct.md` (`slug: conduct`).
- `/vision/` and `/privacy/` come from the other two MDX files in
  `content/static-pages/`.

The step additionally checks that asset paths match the deployment state: when
serving from `/` it fails if the HTML still contains `/dcnd_website` links, and
when serving from a sub-path it fails if the font links are not prefixed.

## Path prefix handling

Gatsby needs to emit different asset and link paths depending on where the site
is served:

| Deployment state                                          | Served from     | Asset paths         |
| --------------------------------------------------------- | --------------- | ------------------- |
| `https://cloudnative-netherlands.github.io/dcnd_website/` | `/dcnd_website` | `/dcnd_website/...` |
| `https://www.dutchcloudnativeday.nl/`                     | `/`             | `/...`              |

This is handled without hard-coding anything permanent:

- `gatsby-config.js` sets `pathPrefix` from the `PATH_PREFIX` environment
  variable, with trailing slashes stripped. Unset (local development, local
  production build) means an empty prefix, i.e. served from the domain root.
- The workflow sets `PREFIX_PATHS: "true"` (read by `gatsby build`, equivalent
  to `--prefix-paths`) and `PATH_PREFIX: ${{ steps.pages.outputs.base_path }}`.
- `actions/configure-pages` returns `base_path: /dcnd_website` while the site
  lives on the repository URL, and `base_path: /` once the custom domain is
  configured — which the config normalizes to an empty prefix. The same workflow
  therefore produces correct output in both states, with no follow-up commit
  needed at cutover.
- `GATSBY_DEFAULT_SITE_URL: ${{ steps.pages.outputs.base_url }}` feeds
  `siteMetadata.siteUrl`, which drives canonical/OG URLs and the sitemap. Both
  values are normalized in `gatsby-config.js` (trailing slashes stripped),
  because the Pages API reports URLs with a trailing slash and the metadata is
  assembled as `siteUrl + pathname`.
- `src/html.jsx` wraps the hand-written font preload in Gatsby's `withPrefix()`
  so that it follows the same prefix as everything Gatsby generates itself.
- `src/components/shared/seo/seo.jsx` resolves the canonical/OG URL through the
  `URL` constructor instead of string concatenation. Under a path prefix,
  `pathname` already contains the prefix that `siteUrl` ends with, so
  concatenating produced `…/dcnd_website/dcnd_website/program/`. Resolution is
  identical to concatenation when the site is served from the root, so this
  changes nothing at the custom domain.

## Running the production build locally

```bash
npm ci
npm run test:analytics
npm run build
npm run serve   # serves public/ on http://localhost:9000
```

That reproduces the custom-domain state (no path prefix). To reproduce what the
temporary repository URL deployment produces:

```bash
PREFIX_PATHS=true PATH_PREFIX=/dcnd_website \
  GATSBY_DEFAULT_SITE_URL=https://cloudnative-netherlands.github.io/dcnd_website \
  npm run build
```

Serving a prefixed build locally needs the same prefix, because `gatsby serve`
reads `pathPrefix` from `gatsby-config.js`:

```bash
PATH_PREFIX=/dcnd_website npm run serve -- --prefix-paths
```

The site is then at `http://localhost:9000/dcnd_website/`.

To build exactly as production does, add the GTM container ID:

```bash
GATSBY_GTM_ID=GTM-WGZC5SKF npm run build
```

## Triggering a manual deployment

Actions → **Deploy to GitHub Pages** → **Run workflow** → branch `main`.
Any push to `main` deploys as well.

## Required GitHub configuration

These cannot be set from source code and have **not** been changed by this
work — someone with repository admin rights must do them in the GitHub UI.

### 1. Pages source (required before the first deployment)

Settings → **Pages** → **Build and deployment** → **Source**: `GitHub Actions`.

If Pages is currently set to "Deploy from a branch", GitHub serves the branch
content directly (which renders `README.md` through Jekyll) and
`actions/deploy-pages` cannot publish. Switching the source to GitHub Actions
replaces that behavior with the workflow in this repository.

### 2. Repository variable for Google Tag Manager

Settings → **Secrets and variables** → **Actions** → **Variables** →
**New repository variable**:

- Name: `GATSBY_GTM_ID`
- Value: `GTM-WGZC5SKF` (the production container ID currently configured in
  Netlify and documented in [docs/analytics.md](analytics.md))

It is a variable, not a secret: the container ID is public by design because it
is embedded in the served HTML. If the variable is missing, the build logs a
warning and the site deploys without GTM/GA4 — GoatCounter keeps working.

### 3. Custom domain

Settings → **Pages** → **Custom domain**: `www.dutchcloudnativeday.nl` → Save.
GitHub then checks DNS and provisions a Let's Encrypt certificate.

### 4. Enforce HTTPS

Settings → **Pages** → **Enforce HTTPS**, once the certificate has been issued
(the checkbox stays disabled until then).

### 5. Domain verification at organization level (recommended)

`cloudnative-netherlands` organization → Settings → **Pages** → **Add a domain**
for `dutchcloudnativeday.nl`, then add the `_github-pages-challenge-…` TXT
record it shows. This prevents another repository or account from taking over
the domain later. It is not required for the site to work.

## CNAME decision

**No `CNAME` file is added to this repository.**

With the artifact-based deployment model (`upload-pages-artifact` +
`deploy-pages`), the custom domain is stored in the repository's Pages
configuration and applied by the Pages service at the routing layer. GitHub only
writes/needs a `CNAME` file for branch-based (`Deploy from a branch`)
publishing, where the file in the served branch _is_ the configuration. Adding a
`CNAME` file to a workflow-built artifact does not configure anything, and
committing one would create a second source of truth that silently disagrees
with the Settings value.

Fallback, only if the custom domain is ever observed to reset itself after a
deployment: create `static/CNAME` containing exactly

```text
www.dutchcloudnativeday.nl
```

Gatsby copies `static/` verbatim into `public/`, so the file lands at the root
of the artifact. Re-check the Settings value afterwards.

## DNS records

The registrar/DNS provider for `dutchcloudnativeday.nl` currently points at
Netlify. No DNS record has been changed by this work — the records below are the
target state for the cutover.

`www` (the canonical hostname the site is served from):

```text
Type: CNAME
Name: www
Value: cloudnative-netherlands.github.io
```

The value must be the **user/organization** Pages host, with no path:

```text
✅ cloudnative-netherlands.github.io
❌ cloudnative-netherlands.github.io/dcnd_website
```

A CNAME record can only contain a hostname; a path would be invalid and the
domain would fail to validate. GitHub routes the request to the right repository
based on the custom domain configured in this repository's Pages settings.

Apex (`dutchcloudnativeday.nl`), so that it redirects to `www`:

```text
Type: A
Name: @
Value: 185.199.108.153
```

```text
Type: A
Name: @
Value: 185.199.109.153
```

```text
Type: A
Name: @
Value: 185.199.110.153
```

```text
Type: A
Name: @
Value: 185.199.111.153
```

Optional IPv6 records for the apex:

```text
Type: AAAA
Name: @
Value: 2606:50c0:8000::153
```

```text
Type: AAAA
Name: @
Value: 2606:50c0:8001::153
```

```text
Type: AAAA
Name: @
Value: 2606:50c0:8002::153
```

```text
Type: AAAA
Name: @
Value: 2606:50c0:8003::153
```

With `www.dutchcloudnativeday.nl` configured as the custom domain and the apex
A/AAAA records pointing at GitHub, GitHub Pages serves the apex as a redirect to
the `www` host. Remove the old Netlify records (the previous `www` target and
any apex A/ALIAS record pointing at Netlify) as part of the same change —
leaving both sets in place produces non-deterministic routing.

## Cutover procedure

1. Merge the Pages workflow to `main`.
2. Set Settings → Pages → Source to **GitHub Actions**, and create the
   `GATSBY_GTM_ID` repository variable.
3. Run the workflow (push or manual dispatch) and confirm the deployment at
   `https://cloudnative-netherlands.github.io/dcnd_website/`.
4. Test the temporary deployment: home, `/program/`, `/speakers/`, `/team/`,
   `/vision/`, `/privacy/`, `/conduct/`, `/schedule/` (client-side redirect to
   `/program/`), `/404.html`, images and fonts, the Eventbrite ticket flow, the
   cookie-consent banner, GoatCounter requests to `gc.zgo.at`, and — with
   consent granted — GTM. See the note about `/2025/` under
   [Known limitations and risks](#known-limitations-and-risks): the frozen
   archive is expected to be unreachable on this temporary URL only, and is the
   one thing that cannot be fully validated before the domain moves.
5. Add `www.dutchcloudnativeday.nl` as the custom domain in Settings → Pages and
   wait for GitHub's DNS check.
6. Change DNS: point `www` at `cloudnative-netherlands.github.io` and the apex
   at the GitHub A/AAAA addresses; remove the Netlify records. Lower the TTL a
   day in advance if the provider allows it.
7. Wait for DNS propagation, GitHub's domain validation and certificate
   provisioning (usually minutes, occasionally up to ~24 hours).
8. Enable **Enforce HTTPS**.
9. Verify apex → `www` redirection and re-run the page checks from step 4 —
   including `/2025/` and `/2025/schedule/`, which are only fully correct at the
   domain root.
10. Leave the Netlify site deployed and untouched throughout propagation so that
    reverting DNS is an instant rollback.
11. Only once GitHub Pages has been stable for at least a full propagation
    window: unlink the repository from Netlify (or stop auto-publishing) and
    finally delete the Netlify site. Record the Netlify environment variables
    before deleting anything.

Rollback at any point before step 11: restore the previous Netlify DNS records.
Nothing in this repository depends on GitHub Pages, so a redeploy on Netlify
keeps working.

### State of the Netlify site at the time of writing (2026-08-05)

`https://www.dutchcloudnativeday.nl/` and the apex both return **HTTP 503** from
Netlify with the body `{"error":"usage_exceeded","message":"Usage exceeded"}`.
The public site is therefore already down, which changes two things:

- Steps 10 and 11 are formalities rather than a safety net. The DNS rollback
  described above restores a site that is currently serving errors, so it is not
  a real fallback — move through the cutover promptly instead of waiting out a
  long soak on the temporary URL.
- Both `www` and the apex are currently plain `A` records
  (`63.176.8.218`, `35.157.26.135`) hosted on NS1 nameservers. `www` therefore
  needs its `A` records **deleted** before the `CNAME` above can be created — a
  `CNAME` cannot coexist with other records on the same name.

Re-check the live status before starting, in case the Netlify account has been
restored in the meantime.

## Validation commands

Local build validation:

```bash
npm ci
npm run test:analytics
npm run build
```

```bash
test -f public/index.html
test -f public/program/index.html
test -f public/schedule/index.html
test -f public/speakers/index.html
test -f public/team/index.html
test -f public/vision/index.html
test -f public/privacy/index.html
test -f public/conduct/index.html
test -f public/404.html
test -f public/sitemap-index.xml
test -f public/manifest.webmanifest
test -f public/2025/index.html
test -f public/2025/schedule/index.html
```

No stale path prefix in a root build, and no leftover Netlify URLs:

```bash
grep -r "/dcnd_website" public --include="*.html" || echo "clean"
```

```bash
grep -ri "netlify" public --include="*.html" --include="*.js" --include="*.xml" || echo "clean"
```

DNS validation after the cutover:

```bash
dig www.dutchcloudnativeday.nl CNAME
```

```bash
dig dutchcloudnativeday.nl A
```

```bash
dig dutchcloudnativeday.nl AAAA
```

HTTP validation after the cutover:

```bash
curl -I https://www.dutchcloudnativeday.nl/
```

```bash
curl -I https://dutchcloudnativeday.nl/
```

```bash
curl -I https://www.dutchcloudnativeday.nl/2025/
```

```bash
curl -I https://www.dutchcloudnativeday.nl/2025/schedule/
```

Expected: `200` for the `www` URLs and a `301` to
`https://www.dutchcloudnativeday.nl/` for the apex.

## Netlify assessment

Everything Netlify-specific in the repository was inspected. There is very
little of it, because the Netlify configuration was never committed.

| Netlify feature               | Present in repository?                                             | Assessment                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `netlify.toml`                | No (never existed in git history)                                  | Nothing to port. Build settings live in the Netlify UI.                                                           |
| `_redirects` / `_headers`     | No (neither in the repo nor in `static/`)                          | Nothing to port.                                                                                                  |
| `gatsby-plugin-netlify`       | Not a dependency                                                   | Gatsby's `createRedirect` calls were therefore never emitted as Netlify redirects.                                |
| Netlify Functions             | None                                                               | —                                                                                                                 |
| Netlify Forms                 | None                                                               | —                                                                                                                 |
| Netlify Identity              | None                                                               | —                                                                                                                 |
| Proxy rules / rewrites        | None                                                               | —                                                                                                                 |
| Build plugins                 | None                                                               | —                                                                                                                 |
| Deploy contexts               | `process.env.CONTEXT === 'production'` in `gatsby-node.js`         | Replaced (see below).                                                                                             |
| Environment variables         | `GATSBY_DEFAULT_SITE_URL`, `GATSBY_GTM_ID` (set in the Netlify UI) | Reproduced by the workflow: site URL from `configure-pages`, GTM ID from the `GATSBY_GTM_ID` repository variable. |
| Netlify-specific URL handling | None (`GATSBY_DEFAULT_SITE_URL` is generic)                        | —                                                                                                                 |

### `process.env.NETLIFY` check in `gatsby-node.js`

`onPreBootstrap` warned when a **production Netlify build** had no valid
`GATSBY_GTM_ID`. Outside Netlify, `NETLIFY` is never `"true"`, so the check would
have been silently dead on GitHub Pages: a deploy with a missing GTM variable
would have shipped without analytics and without any warning. That is a concrete
reason to change it, so it now uses a generic production-deploy check:

```javascript
const isProductionDeployBuild = process.env.CI === 'true' && process.env.NODE_ENV === 'production';
```

`CI=true` is set by GitHub Actions (and by Netlify, so the warning keeps working
there until that deployment is retired), and `gatsby build` sets
`NODE_ENV=production`. Local production builds stay quiet, exactly as before.
The assertions in `scripts/test-analytics-consent-and-goatcounter.mjs` that
pinned the old Netlify check were updated to pin the new one.

### The `/schedule/` redirect

`gatsby/create-pages.js` calls `createRedirect({ fromPath: '/schedule/', toPath:
'/program/' })`. Gatsby core only writes those entries to `.cache/redirects.json`
— a hosting plugin has to translate them, and no such plugin is installed, so
this never produced a server-side redirect on Netlify either. The behavior users
actually get comes from `src/pages/schedule.jsx`, a real page that client-side
navigates to `/program`. It is generated as `public/schedule/index.html`,
verified by the workflow, and works identically on GitHub Pages. The
`createRedirect` call is left in place: it is what makes the redirect work in
`gatsby develop`, and removing it would change development behavior for no
deployment benefit.

### HTTP response headers

Nothing in this repository sets custom headers today (there is no `_headers`,
no `netlify.toml`, and the `gatsby-plugin-gatsby-cloud` header block in
`gatsby-config.js` is commented out), so the migration drops no header behavior
that is under version control.

Still worth knowing, and worth checking in the Netlify dashboard before deleting
the site: **GitHub Pages cannot set arbitrary response headers.** There is no
equivalent of `_headers` or `netlify.toml [[headers]]`. If any custom headers
were configured in the Netlify UI — CSP, `X-Frame-Options`, `Referrer-Policy`,
long-lived `Cache-Control` for fonts — they cannot be reproduced on GitHub
Pages. GitHub Pages sends its own `Cache-Control` (short-lived HTML, and its own
policy for assets) and serves HTTPS with HSTS once **Enforce HTTPS** is on.
Reproducing custom security headers would require a CDN in front of Pages
(Cloudflare or similar), which is out of scope for this migration and should be
a deliberate, separate decision.

### After the migration

Nothing in the repository depends on Netlify any more. The only Netlify mentions
left are historical notes in this document. Netlify itself should be switched
off only at step 11 of the cutover.

## Known limitations and risks

- **The frozen 2025 archive is only reachable at the domain root.**
  `static/2025/` is a Gatsby build that was frozen with `pathPrefix="/2025"`, so
  its HTML references absolute paths such as `/2025/styles.…css`. The site also
  links to it with plain absolute anchors
  (`src/components/pages/home/schedule/schedule.jsx`,
  `src/components/pages/schedule/schedule/schedule.jsx`,
  `src/components/pages/speakers/speakers/speakers.jsx` and the `past2025` entry
  in `src/constants/links.js`). All of that is correct at
  `https://www.dutchcloudnativeday.nl/2025/` and was correct on Netlify, but
  during the temporary `…github.io/dcnd_website/` phase those links point at the
  host root, where GitHub serves nothing for this repository: the archive links
  404 and, if opened directly under the prefix, the archive pages load without
  their CSS. The archive files themselves are deployed and verified
  (`public/2025/index.html`, `public/2025/schedule/index.html`). Re-prefixing
  them would mean rebuilding the 2025 source, and rewriting the anchors would
  still only turn a 404 into an unstyled page, so this is accepted as a
  transient issue of the temporary URL that disappears as soon as the custom
  domain is active. Verify `/2025/` and `/2025/schedule/` again after cutover.
- **`@font-face` URLs are absolute.** `src/styles/fonts.css` references
  `/fonts/…`, which is correct at the domain root and 404s under the temporary
  repository URL (the browser falls back to system fonts). Changing these to
  relative URLs would make webpack resolve them as modules at build time, so
  they are intentionally left alone; the preload link in `src/html.jsx` uses
  `withPrefix()` and is correct in both states.
- **SEO metadata points at whichever host Pages reports.** During the temporary
  phase, OG URLs and `sitemap-0.xml` are generated against
  `https://cloudnative-netherlands.github.io/dcnd_website`. The URLs themselves
  are correct (verified in both build modes), but they are not the public
  addresses — do not submit the temporary URL to search engines. After the
  custom domain is configured, `configure-pages` reports
  `https://www.dutchcloudnativeday.nl` and the metadata matches production
  again.
- **No server-side redirects and no custom headers on GitHub Pages.** Neither is
  used today, but any future need for them (for example moving `/schedule/` to a
  real 301) cannot be met by GitHub Pages alone.
- **The `speakers` and `schedule` pages of the 2025 archive fetch live from the
  Sessionize API**, as documented in `static/2025/README-ARCHIVE.txt`. That is
  unrelated to hosting and unchanged by this migration.
- **Pages settings are manual.** The workflow cannot switch the Pages source,
  set the custom domain, or enable HTTPS. Until Settings → Pages → Source is
  `GitHub Actions`, `actions/deploy-pages` fails.
