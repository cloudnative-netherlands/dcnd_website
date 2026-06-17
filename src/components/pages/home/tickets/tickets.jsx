import React from 'react';
import './tickets.css';

import { useCookieConsent } from 'components/shared/cookie-consent';

import EventbriteEmbeddedCheckout from '../eventbrite-embedded-checkout';
import { EVENTBRITE_TICKETS_URL } from '../eventbrite';

const Tickets = () => {
  const { hasTicketCheckoutConsent, openCookiePreferences } = useCookieConsent();

  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-container">
        <h2 className="section-title">Tickets</h2>

        <div className="tickets-card">
          {hasTicketCheckoutConsent ? (
            <EventbriteEmbeddedCheckout />
          ) : (
            <div className="tickets-card-content">
              <h3>Dutch Cloud Native Day 2026</h3>
              <p>Allow the ticket checkout service to show the embedded Eventbrite checkout.</p>
              <div className="tickets-actions">
                <button
                  type="button"
                  className="tickets-checkout-button"
                  onClick={openCookiePreferences}
                >
                  Allow ticket checkout
                </button>
                <a
                  className="tickets-eventbrite-link"
                  href={EVENTBRITE_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on Eventbrite
                </a>
              </div>
              <p className="tickets-privacy-note">
                Eventbrite may process your personal data and use cookies or similar technologies
                for checkout, payment, security, analytics, and related services. See{' '}
                <a
                  href="https://www.eventbrite.com/help/en-us/articles/460838/eventbrite-privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eventbrite's privacy and cookie information
                </a>
                .
              </p>
            </div>
          )}
        </div>

        {hasTicketCheckoutConsent && (
          <p className="tickets-cookie-note">
            Ticket checkout is loaded from Eventbrite because you allowed the ticket checkout
            service. You can change this in Cookie settings.
          </p>
        )}

        <div className="diversity-ticket-card">
          <h3 className="mb-2 font-semibold">Diversity Tickets</h3>
          <p className="text-sm">
            Contact us at{' '}
            <a
              href="mailto:info@dutchcloudnativeday.nl"
              className="text-primary font-bold hover:underline"
            >
              info@dutchcloudnativeday.nl
            </a>{' '}
            to apply for a diversity ticket - sponsored by Stichting Cloud Native NL.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tickets;
