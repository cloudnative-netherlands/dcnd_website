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

        <div className="tickets-sold-out">
          <strong>The workshop day on 29 October is sold out.</strong> Tickets for the conference
          day on 30 October are still available.
        </div>

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

        <div className="special-tickets" id="diversity-tickets">
          <div className="special-ticket-card">
            <h3>Student tickets</h3>
            <p>
              Students get a discounted ticket. Email us with proof of enrolment and we will send
              you a discount code.
            </p>
            <a
              href="mailto:info@dutchcloudnativeday.nl?subject=Student%20ticket%20for%20Dutch%20Cloud%20Native%20Day%202026"
              className="special-ticket-button"
              data-goatcounter-click="student-ticket-click"
              data-goatcounter-title="Student ticket click"
            >
              Request a student discount
            </a>
          </div>
          <div className="special-ticket-card">
            <h3>Free diversity tickets</h3>
            <p>
              Free tickets for people from groups underrepresented in tech, sponsored by Stichting
              Cloud Native NL.
            </p>
            <a
              href="mailto:info@dutchcloudnativeday.nl?subject=Diversity%20ticket%20for%20Dutch%20Cloud%20Native%20Day%202026"
              className="special-ticket-button"
              data-goatcounter-click="diversity-ticket-click"
              data-goatcounter-title="Diversity ticket click"
            >
              Apply for a diversity ticket
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tickets;
