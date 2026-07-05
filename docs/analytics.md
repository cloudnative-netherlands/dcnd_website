# Analytics

The site uses a two-tier analytics model.

## Summary

GoatCounter is the limited aggregate traffic layer. It runs for all visitors,
is loaded directly from the HTML template, and is not controlled by the optional
consent banner.

Google Analytics 4 is the additional analytics layer. It runs through Google Tag
Manager only after a visitor enables `Additional analytics — Google Analytics`.

Do not route GoatCounter through GTM. Do not add a direct `gtag.js` or GA4
snippet to the site.

## Normal Development

Start the site normally:

```bash
npm run start
```

Google Tag Manager is disabled when `GATSBY_GTM_ID` is not set. GoatCounter,
consent storage, Eventbrite consent and the rest of the site continue to work
normally.

## Testing GTM Locally

To explicitly test the Google Tag Manager integration path locally, start the
site with the GTM ID configured:

```bash
GATSBY_GTM_ID=GTM-WGZC5SKF npm run start
```

GTM still loads only after accepting `Additional analytics — Google Analytics`.
This uses the production GTM container and may create local test traffic in GA4.

## Production Configuration

Configure this public Gatsby environment variable in Netlify under **Site
configuration > Environment variables** for the production build context:

```bash
GATSBY_GTM_ID=GTM-WGZC5SKF
```

This is needed only for Google Tag Manager. GoatCounter does not need a Netlify
environment variable. Gatsby embeds `GATSBY_*` values during build time, so
changing this variable requires a new deployment before browser code sees it.

Recommended Netlify context policy:

- Production: configure the real GTM ID.
- Deploy previews: leave disabled unless actively testing consent/GTM.
- Branch deploys: leave disabled.

If the production Netlify build has no valid `GATSBY_GTM_ID`, the build prints a
warning and the site continues without GTM or GA4. This keeps the website
available while making accidental analytics misconfiguration visible.

GA4 measurement ID `G-L2BFB87LQ2` and stream ID `15203939146` are configured
remotely inside the GTM container. GTM is loaded only after Google Analytics
consent. The GTM container must listen for the custom event:

```text
dcnd_analytics_consent_granted
```

## Consent Storage

Optional-service consent is stored in `localStorage` under
`dcnd-cookie-consent-v2`:

```json
{
  "version": 2,
  "consentRevision": 1,
  "googleAnalytics": false,
  "eventbrite": false,
  "updatedAt": "2026-07-05T00:00:00.000Z"
}
```

The `googleAnalytics` property means Google Analytics only. GoatCounter is not
represented in this optional consent structure. `consentRevision` is separate
from the storage schema version and can be increased if the meaning of optional
consent materially changes.

Older `dcnd-cookie-consent-v1` values are migrated only for the Eventbrite
ticket checkout choice. Google Analytics is never inferred from the old
Eventbrite-only preference and remains denied until the visitor opts in.

## Reporting Use

Use GoatCounter for broad aggregate traffic trends, such as baseline page views
and referrers.

Use GA4 for richer consented reporting, such as campaign attribution,
engagement events and conversion analysis.

Traffic totals between GoatCounter and GA4 will differ by design because GA4
includes only visitors who consent to additional analytics and are not otherwise
blocked.

## Local Reset

To reset consent locally, run this in the browser console:

```js
localStorage.removeItem('dcnd-cookie-consent-v2');
localStorage.removeItem('dcnd-cookie-consent-v1');
document.cookie
  .split(';')
  .map((cookie) => cookie.trim().split('=')[0])
  .filter((name) => name === '_ga' || name.startsWith('_ga_'))
  .forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  });
```

## Manual Testing

Then test these cases in a clean browser profile or after clearing local storage
and cookies:

- Before optional consent, GoatCounter loads from `gc.zgo.at`.
- Before Google Analytics consent, there are no requests to
  `googletagmanager.com` or `google-analytics.com`.
- Reject optional services: GoatCounter still loads; GTM, Google Analytics and
  Eventbrite do not.
- Accept Additional analytics — Google Analytics: `window.dataLayer` includes
  `dcnd_analytics_consent_granted`.
- In GTM Preview or Tag Assistant, GA4 measurement ID `G-L2BFB87LQ2` fires from
  GTM after consent.
- Accept Eventbrite only: the Eventbrite checkout loads while GTM does not.
- Withdraw Google Analytics and reload: GTM no longer loads while GoatCounter
  remains active.

An already executed third-party script cannot reliably be unloaded from the
current document, so the reload is the full Google Analytics withdrawal check.
