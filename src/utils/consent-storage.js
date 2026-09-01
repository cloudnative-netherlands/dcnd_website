export const CONSENT_STORAGE_KEY = 'dcnd-cookie-consent-v2';
export const LEGACY_CONSENT_STORAGE_KEY = 'dcnd-cookie-consent-v1';
export const CONSENT_VERSION = 2;
export const CONSENT_REVISION = 1;

export const defaultConsent = {
  version: CONSENT_VERSION,
  consentRevision: CONSENT_REVISION,
  googleAnalytics: false,
  linkedInAds: false,
  eventbrite: false,
  updatedAt: null,
  hasMadeChoice: false,
};

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const isValidTimestamp = (value) => {
  if (typeof value !== 'string' || value.length === 0) {
    return false;
  }

  const timestamp = Date.parse(value);

  return Number.isFinite(timestamp) && timestamp <= Date.now() + 60 * 1000;
};

// linkedInAds was added after launch; stored consents without it remain valid and the
// missing choice is treated as declined.
const isValidStoredConsent = (value) =>
  value &&
  value.version === CONSENT_VERSION &&
  value.consentRevision === CONSENT_REVISION &&
  typeof value.googleAnalytics === 'boolean' &&
  (typeof value.linkedInAds === 'boolean' || value.linkedInAds === undefined) &&
  typeof value.eventbrite === 'boolean' &&
  isValidTimestamp(value.updatedAt);

const withChoiceFlag = (consent, hasMadeChoice = true) => ({
  ...consent,
  linkedInAds: Boolean(consent.linkedInAds),
  hasMadeChoice,
});

const createStoredConsent = ({ googleAnalytics, linkedInAds, eventbrite }) => ({
  version: CONSENT_VERSION,
  consentRevision: CONSENT_REVISION,
  googleAnalytics: Boolean(googleAnalytics),
  linkedInAds: Boolean(linkedInAds),
  eventbrite: Boolean(eventbrite),
  updatedAt: new Date().toISOString(),
});

export const createConsent = ({
  googleAnalytics = false,
  linkedInAds = false,
  eventbrite = false,
} = {}) => withChoiceFlag(createStoredConsent({ googleAnalytics, linkedInAds, eventbrite }));

const readLegacyConsent = () => {
  const value = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);

    if (parsed && parsed.hasMadeChoice === true && typeof parsed.tickets === 'boolean') {
      return createStoredConsent({
        googleAnalytics: false,
        linkedInAds: false,
        eventbrite: parsed.tickets,
      });
    }
  } catch {
    return null;
  }

  return null;
};

export const readStoredConsent = () => {
  if (!isBrowser()) {
    return defaultConsent;
  }

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (value) {
      const parsed = JSON.parse(value);
      return isValidStoredConsent(parsed) ? withChoiceFlag(parsed) : defaultConsent;
    }

    const migrated = readLegacyConsent();

    if (migrated) {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
      return withChoiceFlag(migrated);
    }
  } catch {
    return defaultConsent;
  }

  return defaultConsent;
};

export const writeStoredConsent = ({
  googleAnalytics = false,
  linkedInAds = false,
  eventbrite = false,
}) => {
  const consent = createConsent({ googleAnalytics, linkedInAds, eventbrite });

  if (!isBrowser()) {
    return consent;
  }

  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({
      version: consent.version,
      consentRevision: consent.consentRevision,
      googleAnalytics: consent.googleAnalytics,
      linkedInAds: consent.linkedInAds,
      eventbrite: consent.eventbrite,
      updatedAt: consent.updatedAt,
    })
  );

  return consent;
};

const removeCookiesMatching = (matchesName) => {
  if (typeof document === 'undefined') {
    return;
  }

  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter(matchesName);

  if (cookieNames.length === 0) {
    return;
  }

  const hostParts = window.location.hostname.split('.').filter(Boolean);
  const domainCandidates = new Set(['']);

  for (let index = 0; index < hostParts.length - 1; index += 1) {
    domainCandidates.add(`.${hostParts.slice(index).join('.')}`);
  }

  const pathCandidates = ['/', window.location.pathname || '/'];

  cookieNames.forEach((name) => {
    domainCandidates.forEach((domain) => {
      pathCandidates.forEach((path) => {
        document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${
          domain ? `; domain=${domain}` : ''
        }`;
      });
    });
  });
};

export const removeGoogleAnalyticsCookies = () =>
  removeCookiesMatching((name) => name === '_ga' || name.startsWith('_ga_'));

// First-party cookies set by the LinkedIn Insight Tag. LinkedIn's own third-party cookies
// live on linkedin.com and cannot be removed from here.
export const removeLinkedInCookies = () =>
  removeCookiesMatching((name) => name === 'li_fat_id' || name === 'ln_or');
