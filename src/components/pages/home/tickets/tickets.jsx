import React, { useEffect } from 'react';
import './tickets.css';

import { EVENTBRITE_EVENT_ID, loadEventbriteWidget } from '../eventbrite';

const EVENTBRITE_WIDGET_CONTAINER_ID = `eventbrite-widget-container-${EVENTBRITE_EVENT_ID}`;

const Tickets = () => {
  useEffect(() => {
    const createEventbriteWidget = () => {
      if (!window.EBWidgets) {
        return;
      }

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: EVENTBRITE_EVENT_ID,
        iframeContainerId: EVENTBRITE_WIDGET_CONTAINER_ID,
        iframeContainerHeight: 425,
        onOrderComplete: () => {},
      });
    };

    return loadEventbriteWidget(createEventbriteWidget);
  }, []);

  return (
    <section className="tickets-section" id="tickets">
      <div className="tickets-container">
        <h2 className="section-title">Tickets</h2>

        <div className="tickets-card">
          <div id={EVENTBRITE_WIDGET_CONTAINER_ID} />
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
