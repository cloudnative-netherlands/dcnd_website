import React from 'react';
import './tickets.css';

import { useCookieConsent } from 'components/shared/cookie-consent';

import { EVENTBRITE_TICKETS_URL } from '../eventbrite';
import EventbriteEmbeddedCheckout from '../eventbrite-embedded-checkout';

const Tickets = () => {
  const { hasTicketCheckoutConsent, openCookiePreferences } = useCookieConsent();
  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-container">
        <h2 className="section-title">Tickets</h2>

        <div className="tickets-card">
          <div className="tickets-card-heading">
            <h3>Dutch Cloud Native Day 2026</h3>
          </div>
          {hasTicketCheckoutConsent ? (
            <EventbriteEmbeddedCheckout />
          ) : (
            <div className="tickets-card-content">
              <p>Allow the ticket checkout service to show the embedded Eventbrite checkout.</p>
              <div className="tickets-actions">
                <button
                  type="button"
                  className="tickets-checkout-button"
                  data-goatcounter-click="ticket-click"
                  data-goatcounter-title="Ticket click"
                  onClick={openCookiePreferences}
                >
                  Allow ticket checkout
                </button>
                <a
                  className="tickets-eventbrite-link"
                  href={EVENTBRITE_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-goatcounter-click="eventbrite-open"
                  data-goatcounter-title="Eventbrite checkout opened"
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
                  Eventbrite&apos;s privacy and cookie information
                </a>
                .
              </p>
            </div>
          )}
        </div>

        {hasTicketCheckoutConsent && (
          <p className="tickets-cookie-note">
            Ticket checkout is loaded from Eventbrite because you allowed the ticket checkout
            service. You can change this in Privacy and cookie settings.
          </p>
        )}

        <div className="diversity-ticket-card">
          <h3 className="mb-2 font-semibold">Diversity Tickets</h3>
          <p className="text-sm">
            Contact us at{' '}
            <a
              href="mailto:info@dutchcloudnativeday.nl"
              className="text-primary font-bold hover:underline"
              data-goatcounter-click="contact-click"
              data-goatcounter-title="Contact click"
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
