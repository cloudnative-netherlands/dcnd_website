import React from 'react';
import './tickets.css';

import EventbriteCheckoutButton from '../eventbrite-checkout-button';

const Tickets = () => {
  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-container">
        <h2 className="section-title">Tickets</h2>

        <div className="tickets-card">
          <div className="tickets-card-content">
            <h3>Dutch Cloud Native Day 2026</h3>
            <p>Tickets are handled by Eventbrite in a secure checkout window.</p>
            <EventbriteCheckoutButton
              triggerId="eventbrite-ticket-section-checkout-trigger"
              className="tickets-checkout-button"
            >
              Buy Tickets
            </EventbriteCheckoutButton>
            <p className="tickets-privacy-note">
              Ticket checkout is handled by Eventbrite. When you continue, Eventbrite may process
              your personal data and use cookies or similar technologies for checkout, payment,
              security, analytics, and related services. See{' '}
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
        </div>

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
