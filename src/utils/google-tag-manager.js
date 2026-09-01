export const GTM_SCRIPT_ID = 'dcnd-google-tag-manager';
export const GTM_CONSENT_EVENT = 'dcnd_analytics_consent_granted';
export const GTM_CONSENT_EVENT_FLAG = '__dcndGtmConsentEventPushed';
export const GTM_MARKETING_CONSENT_EVENT = 'dcnd_marketing_consent_granted';
export const GTM_MARKETING_CONSENT_EVENT_FLAG = '__dcndGtmMarketingEventPushed';
export const GTM_BOOTSTRAP_EVENT = 'gtm.js';
export const GTM_BOOTSTRAP_FLAG = '__dcndGtmBootstrapPushed';
export const GTM_CONSENT_INITIALIZED_FLAG = '__dcndGtmConsentInitialized';
export const GTM_CONSENT_FLAGS_KEY = '__dcndGtmAppliedConsentFlags';
export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

// analytics -> Google Analytics (analytics_storage); ads -> advertising pixels such as the
// LinkedIn Insight Tag (ad_storage, ad_user_data, ad_personalization).
const buildGoogleConsent = ({ analytics = false, ads = false } = {}) => ({
  analytics_storage: analytics ? 'granted' : 'denied',
  ad_storage: ads ? 'granted' : 'denied',
  ad_user_data: ads ? 'granted' : 'denied',
  ad_personalization: ads ? 'granted' : 'denied',
});

const deniedGoogleConsent = buildGoogleConsent();

let hasWarnedAboutMissingGtmId = false;
let hasWarnedAboutInvalidGtmId = false;

export const isValidGtmId = (gtmId) => GTM_ID_PATTERN.test(gtmId || '');

export const getConfiguredGtmId = () => (process.env.GATSBY_GTM_ID || '').trim();

const warnIfGtmUnavailable = (gtmId) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (!gtmId && !hasWarnedAboutMissingGtmId) {
    hasWarnedAboutMissingGtmId = true;
    // eslint-disable-next-line no-console
    console.info('Google Tag Manager is disabled. Set GATSBY_GTM_ID to test it locally.');
  }

  if (gtmId && !hasWarnedAboutInvalidGtmId) {
    hasWarnedAboutInvalidGtmId = true;
    // eslint-disable-next-line no-console
    console.warn(`Skipping Google Tag Manager because GATSBY_GTM_ID is invalid: ${gtmId}`);
  }
};

function gtag() {
  // Google Consent Mode consumes the argument object used by the standard gtag helper.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export const updateGoogleConsent = (consentFlags) => {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) {
    return false;
  }

  gtag('consent', 'update', buildGoogleConsent(consentFlags));
  return true;
};

export const loadGoogleTagManager = (
  gtmId = getConfiguredGtmId(),
  consentFlags = { analytics: true, ads: false }
) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (!isValidGtmId(gtmId)) {
    warnIfGtmUnavailable(gtmId);
    return false;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  if (!window[GTM_CONSENT_INITIALIZED_FLAG]) {
    // This remains local until GTM starts. The user has already opted in.
    gtag('consent', 'default', deniedGoogleConsent);
    window[GTM_CONSENT_INITIALIZED_FLAG] = true;
  }

  // Re-push the consent update only when the granted set actually changes, so repeated
  // calls (e.g. enabling marketing after analytics) stay idempotent.
  const appliedConsent = buildGoogleConsent(consentFlags);
  const appliedConsentKey = JSON.stringify(appliedConsent);
  if (window[GTM_CONSENT_FLAGS_KEY] !== appliedConsentKey) {
    gtag('consent', 'update', appliedConsent);
    window[GTM_CONSENT_FLAGS_KEY] = appliedConsentKey;
  }

  if (!window[GTM_BOOTSTRAP_FLAG]) {
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: GTM_BOOTSTRAP_EVENT,
    });
    window[GTM_BOOTSTRAP_FLAG] = true;
  }

  if (!document.getElementById(GTM_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTM_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  if (consentFlags.analytics && !window[GTM_CONSENT_EVENT_FLAG]) {
    window.dataLayer.push({
      event: GTM_CONSENT_EVENT,
    });
    window[GTM_CONSENT_EVENT_FLAG] = true;
  }

  if (consentFlags.ads && !window[GTM_MARKETING_CONSENT_EVENT_FLAG]) {
    window.dataLayer.push({
      event: GTM_MARKETING_CONSENT_EVENT,
    });
    window[GTM_MARKETING_CONSENT_EVENT_FLAG] = true;
  }

  return true;
};
