import React, { useRef, useState } from 'react';

import { EVENTBRITE_EVENT_ID, EVENTBRITE_TICKETS_URL, loadEventbriteWidget } from './eventbrite';

const EventbriteCheckoutButton = ({ className, children, triggerId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isInitialized = useRef(false);

  const handleCheckoutClick = () => {
    if (isInitialized.current || isLoading) {
      return;
    }

    setIsLoading(true);

    loadEventbriteWidget(() => {
      if (!window.EBWidgets) {
        window.location.href = EVENTBRITE_TICKETS_URL;
        return;
      }

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: EVENTBRITE_EVENT_ID,
        modal: true,
        modalTriggerElementId: triggerId,
        onOrderComplete: () => {},
      });

      isInitialized.current = true;
      setIsLoading(false);

      window.requestAnimationFrame(() => {
        document.getElementById(triggerId)?.click();
      });
    });
  };

  return (
    <>
      <noscript>
        <a href={EVENTBRITE_TICKETS_URL} rel="noopener noreferrer" target="_blank">
          Buy Tickets on Eventbrite
        </a>
      </noscript>
      <button id={triggerId} type="button" className={className} onClick={handleCheckoutClick}>
        {isLoading ? 'Loading checkout...' : children}
      </button>
    </>
  );
};

export default EventbriteCheckoutButton;
