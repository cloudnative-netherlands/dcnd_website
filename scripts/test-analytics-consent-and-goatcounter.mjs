/* eslint-disable no-console, no-new-func */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { JSDOM } from 'jsdom';

const repoRoot = new URL('../', import.meta.url);

const read = (path) => readFileSync(new URL(path, repoRoot), 'utf8');

const loadModule = (path, exportNames) => {
  const source = read(path).replace(/export const /g, 'const ');
  const factory = new Function(`${source}\nreturn { ${exportNames.join(', ')} };`);
  return factory();
};

const consentStorage = loadModule('src/utils/consent-storage.js', [
  'CONSENT_STORAGE_KEY',
  'LEGACY_CONSENT_STORAGE_KEY',
  'CONSENT_REVISION',
  'createConsent',
  'readStoredConsent',
  'writeStoredConsent',
  'removeGoogleAnalyticsCookies',
]);

const gtm = loadModule('src/utils/google-tag-manager.js', [
  'GTM_SCRIPT_ID',
  'GTM_CONSENT_EVENT',
  'GTM_BOOTSTRAP_EVENT',
  'getConfiguredGtmId',
  'isValidGtmId',
  'updateGoogleConsent',
  'loadGoogleTagManager',
]);

const setupDom = () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://www.dutchcloudnativeday.nl/',
  });

  global.window = dom.window;
  global.document = dom.window.document;

  return dom;
};

const teardownDom = () => {
  delete global.window;
  delete global.document;
};

const getGtmScripts = () =>
  [...document.querySelectorAll('script')].filter((script) =>
    script.src.includes('googletagmanager.com/gtm.js')
  );

const html = read('src/html.jsx');
const hero = read('src/components/pages/home/hero/hero.jsx');
const tickets = read('src/components/pages/home/tickets/tickets.jsx');
const checkout = read('src/components/pages/home/eventbrite-embedded-checkout.jsx');
const sponsors = read('src/components/pages/home/sponsors/sponsors.jsx');
const footer = read('src/components/shared/footer/footer.jsx');
const cookieConsent = read('src/components/shared/cookie-consent/cookie-consent.jsx');
const gatsbyNode = read('gatsby-node.js');

const assertGoatCounterIsConfigured = () => {
  assert.match(html, /data-goatcounter="https:\/\/dcnd\.goatcounter\.com\/count"/);
  assert.match(html, /src="https:\/\/gc\.zgo\.at\/count\.js"/);
  assert.equal((html.match(/gc\.zgo\.at\/count\.js/g) || []).length, 1);
};

const assertNoGtm = () => {
  assert.equal(getGtmScripts().length, 0);
  assert.deepEqual(window.dataLayer, undefined);
};

const persist = ({ googleAnalytics = false, eventbrite = false } = {}) =>
  consentStorage.writeStoredConsent({ googleAnalytics, eventbrite });

const sourceFiles = [];
const collectSourceFiles = (directory) => {
  readdirSync(directory).forEach((entry) => {
    const fullPath = join(directory, entry);
    const relativePath = fullPath.replace(repoRoot.pathname, '');

    if (
      relativePath.startsWith('.cache/') ||
      relativePath.startsWith('.git/') ||
      relativePath.startsWith('static/') ||
      relativePath.startsWith('public/') ||
      relativePath.startsWith('node_modules/') ||
      relativePath === 'scripts/test-analytics-consent-and-goatcounter.mjs' ||
      relativePath === 'package-lock.json'
    ) {
      return;
    }

    if (statSync(fullPath).isDirectory()) {
      collectSourceFiles(fullPath);
      return;
    }

    if (/\.(js|jsx|md|json|html|env|example)$/.test(entry)) {
      sourceFiles.push(fullPath);
    }
  });
};

collectSourceFiles(repoRoot.pathname);

const searchableSource = sourceFiles.map((path) => readFileSync(path, 'utf8')).join('\n');
const runtimeSource = sourceFiles
  .filter((path) => /\/(src|gatsby)-?/.test(path) || path.endsWith('gatsby-config.js'))
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');

assert.doesNotMatch(runtimeSource, /gtag\.js|google-analytics\.com/);
assert.doesNotMatch(read('src/html.jsx'), /googletagmanager|gtag|noscript/);
assert.match(searchableSource, /GoatCounter|goatcounter|gc\.zgo\.at|data-goatcounter/);
assertGoatCounterIsConfigured();
[
  ['ticket-click', 'Ticket click', `${hero}\n${tickets}`],
  ['eventbrite-open', 'Eventbrite checkout opened', `${tickets}\n${checkout}`],
  ['program-click', 'Program click', hero],
  ['sponsor-click', 'Sponsor click', `${hero}\n${sponsors}`],
  ['contact-click', 'Contact click', `${tickets}\n${sponsors}\n${footer}`],
].forEach(([path, title, source]) => {
  assert.match(source, new RegExp(`data-goatcounter-click="${path}"`));
  assert.match(source, new RegExp(`data-goatcounter-title="${title}"`));
});
assert.match(checkout, /window\.goatcounter/);
assert.match(checkout, /typeof window\.goatcounter\.count === 'function'/);
assert.match(checkout, /path: 'eventbrite-open'/);
assert.match(gatsbyNode, /process\.env\.NETLIFY === 'true'/);
assert.match(gatsbyNode, /process\.env\.CONTEXT === 'production'/);
assert.match(read('.env.example'), /GATSBY_GTM_ID=GTM-WGZC5SKF/);
assert.match(read('.env.example'), /Leave unset for normal local development and tests/);
assert.match(read('README.md'), /docs\/analytics\.md/);
assert.match(read('docs/analytics.md'), /GoatCounter is the limited aggregate traffic layer/);
assert.match(read('docs/analytics.md'), /dcnd_analytics_consent_granted/);
assert.match(read('docs/analytics.md'), /GoatCounter does not need a Netlify/);
assert.match(read('docs/analytics.md'), /Google Tag Manager is disabled when `GATSBY_GTM_ID` is not set/);
assert.match(cookieConsent, /updateGoogleConsent\(/);
assert.match(cookieConsent, /writeStoredConsent\(nextConsent\)/);
assert.match(cookieConsent, /removeGoogleAnalyticsCookies\(\)/);
assert.match(cookieConsent, /window\.location\.reload\(\)/);
assert.match(
  read('content/static-pages/privacy.md'),
  /Limited Aggregate Analytics With GoatCounter/
);
assert.match(
  read('src/components/shared/cookie-consent/cookie-consent.jsx'),
  /Additional analytics — Google Analytics/
);

setupDom();
assert.deepEqual(consentStorage.readStoredConsent(), {
  version: 2,
  consentRevision: consentStorage.CONSENT_REVISION,
  googleAnalytics: false,
  eventbrite: false,
  updatedAt: null,
  hasMadeChoice: false,
});
assertGoatCounterIsConfigured();
assertNoGtm();
assert.doesNotMatch(read('src/components/pages/home/tickets/tickets.jsx'), /EBWidgets/);
teardownDom();

setupDom();
const rejectedConsent = persist();
assertGoatCounterIsConfigured();
assert.equal(rejectedConsent.hasMadeChoice, true);
assert.equal(rejectedConsent.googleAnalytics, false);
assert.equal(rejectedConsent.eventbrite, false);
assert.equal(
  JSON.parse(window.localStorage.getItem(consentStorage.CONSENT_STORAGE_KEY)).googleAnalytics,
  false
);
assertNoGtm();
teardownDom();

setupDom();
const analyticsOnlyConsent = persist({ googleAnalytics: true });
assertGoatCounterIsConfigured();
assert.equal(analyticsOnlyConsent.googleAnalytics, true);
assert.equal(analyticsOnlyConsent.eventbrite, false);
assert.equal(gtm.loadGoogleTagManager('GTM-WGZC5SKF'), true);
assert.equal(gtm.loadGoogleTagManager('GTM-WGZC5SKF'), true);
assert.equal(getGtmScripts().length, 1);
assert.equal(getGtmScripts()[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-WGZC5SKF');
assert.equal(window.dataLayer.length, 4);
assert.deepEqual([...window.dataLayer[0]], [
  'consent',
  'default',
  {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
]);
assert.deepEqual([...window.dataLayer[1]], [
  'consent',
  'update',
  {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
]);
assert.equal(window.dataLayer[2].event, gtm.GTM_BOOTSTRAP_EVENT);
assert.equal(typeof window.dataLayer[2]['gtm.start'], 'number');
assert.deepEqual(window.dataLayer[3], { event: gtm.GTM_CONSENT_EVENT });
assert.equal(gtm.updateGoogleConsent('denied'), true);
assert.deepEqual([...window.dataLayer[4]], [
  'consent',
  'update',
  {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
]);
teardownDom();

setupDom();
window.dataLayer = { stale: true };
assert.equal(gtm.loadGoogleTagManager('GTM-WGZC5SKF'), true);
assert.equal(window.dataLayer.length, 4);
assert.deepEqual(window.dataLayer[3], { event: gtm.GTM_CONSENT_EVENT });
assert.equal(getGtmScripts().length, 1);
teardownDom();

setupDom();
const eventbriteOnlyConsent = persist({ eventbrite: true });
assertGoatCounterIsConfigured();
assert.equal(eventbriteOnlyConsent.googleAnalytics, false);
assert.equal(eventbriteOnlyConsent.eventbrite, true);
assert.match(tickets, /hasTicketCheckoutConsent \? \(\s*<EventbriteEmbeddedCheckout \/>/);
assertNoGtm();
teardownDom();

setupDom();
const allConsent = persist({ googleAnalytics: true, eventbrite: true });
assertGoatCounterIsConfigured();
assert.equal(allConsent.googleAnalytics, true);
assert.equal(allConsent.eventbrite, true);
assert.match(tickets, /hasTicketCheckoutConsent \? \(\s*<EventbriteEmbeddedCheckout \/>/);
assert.equal(gtm.loadGoogleTagManager('GTM-WGZC5SKF'), true);
assert.equal(getGtmScripts().length, 1);
teardownDom();

setupDom();
window.localStorage.setItem(
  consentStorage.CONSENT_STORAGE_KEY,
  JSON.stringify({
    version: 2,
    consentRevision: consentStorage.CONSENT_REVISION,
    googleAnalytics: true,
    eventbrite: false,
    updatedAt: '2026-07-05T00:00:00.000Z',
  })
);
const returningConsent = consentStorage.readStoredConsent();
assertGoatCounterIsConfigured();
assert.equal(returningConsent.googleAnalytics, true);
assert.equal(returningConsent.eventbrite, false);
assert.equal(gtm.loadGoogleTagManager('GTM-WGZC5SKF'), true);
assert.equal(window.dataLayer.length, 4);
assert.deepEqual(window.dataLayer[3], { event: gtm.GTM_CONSENT_EVENT });
teardownDom();

setupDom();
window.localStorage.setItem(
  consentStorage.LEGACY_CONSENT_STORAGE_KEY,
  JSON.stringify({ hasMadeChoice: true, tickets: true })
);
const migratedConsent = consentStorage.readStoredConsent();
assertGoatCounterIsConfigured();
assert.equal(migratedConsent.googleAnalytics, false);
assert.equal(migratedConsent.eventbrite, true);
assert.equal(
  JSON.parse(window.localStorage.getItem(consentStorage.CONSENT_STORAGE_KEY)).eventbrite,
  true
);
assertNoGtm();
teardownDom();

setupDom();
persist({ googleAnalytics: true, eventbrite: true });
document.cookie = '_ga=GA1.1.123; path=/';
document.cookie = '_ga_ABC123=GS1.1.456; path=/';
document.cookie = 'dcnd_session=keep; path=/';
const withdrawnConsent = persist({ eventbrite: true });
window.dataLayer = [];
assert.equal(
  gtm.updateGoogleConsent('denied'),
  true
);
consentStorage.removeGoogleAnalyticsCookies();
assertGoatCounterIsConfigured();
assert.equal(withdrawnConsent.googleAnalytics, false);
assert.equal(withdrawnConsent.eventbrite, true);
assert.doesNotMatch(document.cookie, /(^|; )_ga=/);
assert.doesNotMatch(document.cookie, /(^|; )_ga_ABC123=/);
assert.match(document.cookie, /dcnd_session=keep/);
assert.deepEqual([...window.dataLayer[0]], [
  'consent',
  'update',
  {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
]);
setupDom();
window.localStorage.setItem(
  consentStorage.CONSENT_STORAGE_KEY,
  JSON.stringify({
    version: 2,
    consentRevision: consentStorage.CONSENT_REVISION,
    googleAnalytics: false,
    eventbrite: true,
    updatedAt: '2026-07-05T00:00:00.000Z',
  })
);
assert.equal(consentStorage.readStoredConsent().googleAnalytics, false);
assertGoatCounterIsConfigured();
assertNoGtm();
teardownDom();

setupDom();
assert.equal(gtm.isValidGtmId('GTM-WGZC5SKF'), true);
assert.equal(gtm.isValidGtmId(' GTM-WGZC5SKF '), false);
assert.equal(gtm.loadGoogleTagManager(''), false);
assert.equal(gtm.loadGoogleTagManager('not-a-gtm-id'), false);
assert.equal(gtm.updateGoogleConsent('denied'), false);
assertGoatCounterIsConfigured();
assertNoGtm();
teardownDom();

const originalGtmId = process.env.GATSBY_GTM_ID;
process.env.GATSBY_GTM_ID = ' GTM-WGZC5SKF ';
assert.equal(gtm.getConfiguredGtmId(), 'GTM-WGZC5SKF');
delete process.env.GATSBY_GTM_ID;
assert.equal(gtm.getConfiguredGtmId(), '');
if (originalGtmId === undefined) {
  delete process.env.GATSBY_GTM_ID;
} else {
  process.env.GATSBY_GTM_ID = originalGtmId;
}

setupDom();
window.localStorage.setItem(consentStorage.CONSENT_STORAGE_KEY, 'not-json');
assert.deepEqual(consentStorage.readStoredConsent(), {
  version: 2,
  consentRevision: consentStorage.CONSENT_REVISION,
  googleAnalytics: false,
  eventbrite: false,
  updatedAt: null,
  hasMadeChoice: false,
});
window.localStorage.setItem(
  consentStorage.CONSENT_STORAGE_KEY,
  JSON.stringify({
    version: 2,
    consentRevision: consentStorage.CONSENT_REVISION,
    googleAnalytics: true,
    eventbrite: true,
    updatedAt: 'bad',
  })
);
assert.deepEqual(consentStorage.readStoredConsent(), {
  version: 2,
  consentRevision: consentStorage.CONSENT_REVISION,
  googleAnalytics: false,
  eventbrite: false,
  updatedAt: null,
  hasMadeChoice: false,
});
teardownDom();

console.log('Analytics consent tests passed.');
