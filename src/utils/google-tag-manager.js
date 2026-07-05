export const GTM_SCRIPT_ID = 'dcnd-google-tag-manager';
export const GTM_CONSENT_EVENT = 'dcnd_analytics_consent_granted';
export const GTM_CONSENT_EVENT_FLAG = '__dcndGtmConsentEventPushed';
export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

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
