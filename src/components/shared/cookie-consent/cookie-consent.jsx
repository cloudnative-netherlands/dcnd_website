import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  CONSENT_STORAGE_KEY,
  defaultConsent,
  readStoredConsent,
  removeGoogleAnalyticsCookies,
  removeLinkedInCookies,
  writeStoredConsent,
} from 'utils/consent-storage';
import { loadGoogleTagManager, updateGoogleConsent } from 'utils/google-tag-manager';

const CookieConsentContext = createContext({
  hasMadeChoice: false,
  hasAnalyticsConsent: false,
  hasMarketingConsent: false,
  hasTicketCheckoutConsent: false,
  acceptTicketCheckout: () => {},
  rejectOptionalCookies: () => {},
  openCookiePreferences: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

const CookieConsent = ({ children }) => {
  const [consent, setConsent] = useState(defaultConsent);
  const consentRef = useRef(defaultConsent);
  const [selectedConsent, setSelectedConsent] = useState({
    googleAnalytics: false,
    linkedInAds: false,
    eventbrite: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();
    consentRef.current = storedConsent;
    setConsent(storedConsent);
    setSelectedConsent({
      googleAnalytics: storedConsent.googleAnalytics,
      linkedInAds: storedConsent.linkedInAds,
      eventbrite: storedConsent.eventbrite,
    });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && (consent.googleAnalytics || consent.linkedInAds)) {
      // GTM is injected only after consent so Google receives no pre-consent requests.
      // Consent Mode grants analytics and advertising storage independently per choice.
      loadGoogleTagManager(undefined, {
        analytics: consent.googleAnalytics,
        ads: consent.linkedInAds,
      });
    }
  }, [consent.googleAnalytics, consent.linkedInAds, isLoaded]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== CONSENT_STORAGE_KEY) {
        return;
      }

      const storedConsent = readStoredConsent();
      consentRef.current = storedConsent;
      setConsent(storedConsent);
      setSelectedConsent({
        googleAnalytics: storedConsent.googleAnalytics,
        linkedInAds: storedConsent.linkedInAds,
        eventbrite: storedConsent.eventbrite,
      });
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveConsent = useCallback((nextConsent) => {
    const previousConsent = consentRef.current;
    const isWithdrawingGoogleAnalytics =
      previousConsent.googleAnalytics && !nextConsent.googleAnalytics;
    const isWithdrawingLinkedInAds = previousConsent.linkedInAds && !nextConsent.linkedInAds;
    const isWithdrawing = isWithdrawingGoogleAnalytics || isWithdrawingLinkedInAds;

    if (isWithdrawing) {
      updateGoogleConsent({
        analytics: Boolean(nextConsent.googleAnalytics),
        ads: Boolean(nextConsent.linkedInAds),
      });
    }

    const savedConsent = writeStoredConsent(nextConsent);
    consentRef.current = savedConsent;
    setConsent(savedConsent);

    if (isWithdrawing) {
      if (isWithdrawingGoogleAnalytics) {
        removeGoogleAnalyticsCookies();
      }
      if (isWithdrawingLinkedInAds) {
        removeLinkedInCookies();
      }
      window.location.reload();
      return;
    }

    setSelectedConsent({
      googleAnalytics: savedConsent.googleAnalytics,
      linkedInAds: savedConsent.linkedInAds,
      eventbrite: savedConsent.eventbrite,
    });
    setIsPreferencesOpen(false);
  }, []);

  const acceptTicketCheckout = useCallback(() => {
    saveConsent({
      googleAnalytics: consent.googleAnalytics,
      linkedInAds: consent.linkedInAds,
      eventbrite: true,
    });
  }, [consent.googleAnalytics, consent.linkedInAds, saveConsent]);

  const rejectOptionalCookies = useCallback(() => {
    saveConsent({ googleAnalytics: false, linkedInAds: false, eventbrite: false });
  }, [saveConsent]);

  const acceptSelected = useCallback(() => {
    saveConsent(selectedConsent);
  }, [saveConsent, selectedConsent]);

  const acceptAll = useCallback(() => {
    saveConsent({ googleAnalytics: true, linkedInAds: true, eventbrite: true });
  }, [saveConsent]);

  const openCookiePreferences = useCallback(() => {
    setSelectedConsent({
      googleAnalytics: consent.googleAnalytics,
      linkedInAds: consent.linkedInAds,
      eventbrite: consent.eventbrite,
    });
    setIsPreferencesOpen(true);
  }, [consent.googleAnalytics, consent.linkedInAds, consent.eventbrite]);

  const closeCookiePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const handleSelectedConsentChange = useCallback((event) => {
    const { name, checked } = event.target;
    setSelectedConsent((currentConsent) => ({
      ...currentConsent,
      [name]: checked,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      hasMadeChoice: consent.hasMadeChoice,
      hasAnalyticsConsent: consent.googleAnalytics,
      hasMarketingConsent: consent.linkedInAds,
      hasTicketCheckoutConsent: consent.eventbrite,
      acceptTicketCheckout,
      rejectOptionalCookies,
      openCookiePreferences,
    }),
    [
      acceptTicketCheckout,
      consent.googleAnalytics,
      consent.hasMadeChoice,
      consent.linkedInAds,
      consent.eventbrite,
      openCookiePreferences,
      rejectOptionalCookies,
    ]
  );

  const shouldShowBanner = isLoaded && !consent.hasMadeChoice && !isPreferencesOpen;

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {shouldShowBanner && (
        <section className="cookie-banner" aria-label="Cookie choices">
          <div className="cookie-banner__content">
            <h2>Cookie choices</h2>
            <p>
              We use GoatCounter for limited, cookie-free aggregate traffic statistics. You can
              separately choose whether to enable additional Google Analytics, LinkedIn marketing
              cookies and the embedded Eventbrite ticket checkout. See our{' '}
              <a href="/privacy">privacy page</a>.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button
              type="button"
              className="cookie-button cookie-button--secondary"
              onClick={rejectOptionalCookies}
            >
              Reject optional services
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--primary"
              onClick={acceptAll}
            >
              Accept all
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--text"
              onClick={openCookiePreferences}
            >
              Privacy and cookie settings
            </button>
          </div>
        </section>
      )}

      {isPreferencesOpen && (
        <div className="cookie-modal" role="presentation">
          <div
            className="cookie-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div className="cookie-modal__header">
              <h2 id="cookie-modal-title">Cookie preferences</h2>
              {consent.hasMadeChoice && (
                <button
                  type="button"
                  className="cookie-modal__close"
                  aria-label="Close cookie preferences"
                  onClick={closeCookiePreferences}
                >
                  x
                </button>
              )}
            </div>

            <div className="cookie-modal__section">
              <div>
                <h3>Necessary</h3>
                <p>Required for the website to work. These cannot be disabled.</p>
              </div>
              <span className="cookie-modal__status">Always on</span>
            </div>

            <label className="cookie-modal__section cookie-modal__choice">
              <input
                aria-label="Additional analytics — Google Analytics"
                type="checkbox"
                name="googleAnalytics"
                checked={selectedConsent.googleAnalytics}
                onChange={handleSelectedConsentChange}
              />
              <span>
                <h3>Additional analytics — Google Analytics</h3>
                <p>
                  Allow Google Analytics to collect additional information about website usage, such
                  as campaign attribution, device information, approximate location and interactions
                  with important links. Google Analytics is disabled unless you enable it.
                </p>
              </span>
            </label>

            <label className="cookie-modal__section cookie-modal__choice">
              <input
                aria-label="Marketing — LinkedIn Insight Tag"
                type="checkbox"
                name="linkedInAds"
                checked={selectedConsent.linkedInAds}
                onChange={handleSelectedConsentChange}
              />
              <span>
                <h3>Marketing — LinkedIn Insight Tag</h3>
                <p>
                  Allow LinkedIn to measure the performance of our LinkedIn campaigns and to show
                  you relevant ads on LinkedIn based on your visit to this website (retargeting).
                  LinkedIn may set cookies and process personal data. Disabled unless you enable
                  it.
                </p>
              </span>
            </label>

            <label className="cookie-modal__section cookie-modal__choice">
              <input
                aria-label="Ticket checkout"
                type="checkbox"
                name="eventbrite"
                checked={selectedConsent.eventbrite}
                onChange={handleSelectedConsentChange}
              />
              <span>
                <h3>Eventbrite ticket checkout</h3>
                <p>
                  Allow the embedded Eventbrite ticket checkout to load. Eventbrite may process
                  personal data and use cookies or similar technologies for checkout, payment,
                  security, analytics and related services.
                </p>
              </span>
            </label>

            <div className="cookie-modal__actions">
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={rejectOptionalCookies}
              >
                Reject optional services
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={acceptSelected}
              >
                Accept selected
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={acceptAll}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
};

CookieConsent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CookieConsent;
