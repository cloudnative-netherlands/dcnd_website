export const GTM_SCRIPT_ID = 'dcnd-google-tag-manager';
export const GTM_CONSENT_EVENT = 'dcnd_analytics_consent_granted';
export const GTM_CONSENT_EVENT_FLAG = '__dcndGtmConsentEventPushed';
export const GTM_DEFAULT_CONSENT_FLAG = '__dcndGtmDefaultConsentQueued';
export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

const grantedGoogleConsent = {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

const deniedGoogleConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

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

export const updateGoogleConsent = (analyticsStorage) => {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) {
    return false;
  }

  gtag(
    'consent',
    'update',
    analyticsStorage === 'granted' ? grantedGoogleConsent : deniedGoogleConsent
  );
  return true;
};

export const loadGoogleTagManager = (gtmId = getConfiguredGtmId()) => {
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

  if (!window[GTM_DEFAULT_CONSENT_FLAG]) {
    // GTM reads this queued state as it starts, before Google tags can execute.
    gtag('consent', 'default', grantedGoogleConsent);
    window[GTM_DEFAULT_CONSENT_FLAG] = true;
  }

  if (!document.getElementById(GTM_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTM_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  if (!window[GTM_CONSENT_EVENT_FLAG]) {
    window.dataLayer.push({
      event: GTM_CONSENT_EVENT,
    });
    window[GTM_CONSENT_EVENT_FLAG] = true;
  }

  return true;
};
