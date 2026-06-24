import PropTypes from 'prop-types';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CONSENT_STORAGE_KEY = 'dcnd-cookie-consent-v1';

const defaultConsent = {
  hasMadeChoice: false,
  tickets: false,
};

const CookieConsentContext = createContext({
  hasMadeChoice: false,
  hasTicketCheckoutConsent: false,
  acceptTicketCheckout: () => {},
  rejectOptionalCookies: () => {},
  openCookiePreferences: () => {},
});

const readStoredConsent = () => {
  if (typeof window === 'undefined') {
    return defaultConsent;
  }

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value ? { ...defaultConsent, ...JSON.parse(value) } : defaultConsent;
  } catch {
    return defaultConsent;
  }
};

const writeStoredConsent = (consent) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
};

export const useCookieConsent = () => useContext(CookieConsentContext);

const CookieConsent = ({ children }) => {
  const [consent, setConsent] = useState(defaultConsent);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setIsLoaded(true);
  }, []);

  const saveConsent = useCallback((nextConsent) => {
    setConsent(nextConsent);
    writeStoredConsent(nextConsent);
    setIsPreferencesOpen(false);
  }, []);

  const acceptTicketCheckout = useCallback(() => {
    saveConsent({ hasMadeChoice: true, tickets: true });
  }, [saveConsent]);

  const rejectOptionalCookies = useCallback(() => {
    saveConsent({ hasMadeChoice: true, tickets: false });
  }, [saveConsent]);

  const openCookiePreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closeCookiePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      hasMadeChoice: consent.hasMadeChoice,
      hasTicketCheckoutConsent: consent.tickets,
      acceptTicketCheckout,
      rejectOptionalCookies,
      openCookiePreferences,
    }),
    [
      acceptTicketCheckout,
      consent.hasMadeChoice,
      consent.tickets,
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
              Dutch Cloud Native Day uses cookie-free aggregate analytics and does not use
              advertising cookies. We only load Eventbrite when you allow the ticket checkout
              service.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button
              type="button"
              className="cookie-button cookie-button--secondary"
              onClick={rejectOptionalCookies}
            >
              Reject optional
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--primary"
              onClick={acceptTicketCheckout}
            >
              Allow ticket checkout
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--text"
              onClick={openCookiePreferences}
            >
              Manage choices
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

            <div className="cookie-modal__section">
              <div>
                <h3>Ticket checkout - Eventbrite</h3>
                <p>
                  The only consent-controlled third-party embed on this website is the Eventbrite
                  checkout. Eventbrite may process personal data and use cookies or similar
                  technologies for checkout, payment, security, analytics, and related services.
                </p>
              </div>
            </div>

            <div className="cookie-modal__actions">
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={rejectOptionalCookies}
              >
                Reject optional
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={acceptTicketCheckout}
              >
                Allow ticket checkout
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
