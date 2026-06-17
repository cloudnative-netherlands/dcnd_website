import React, { useEffect, useRef, useState } from 'react';

import { EVENTBRITE_EVENT_ID, EVENTBRITE_TICKETS_URL, loadEventbriteWidget } from './eventbrite';

const CHECKOUT_CONTAINER_ID = 'eventbrite-inline-checkout';

const countEventbriteOpen = () => {
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({
      path: 'eventbrite-open',
      title: 'Eventbrite checkout opened',
      event: true,
    });
  }
};

const EventbriteEmbeddedCheckout = () => {
  const [status, setStatus] = useState('loading');
  const hasInitialized = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const removeLoadListener = loadEventbriteWidget(() => {
      if (!isMounted || hasInitialized.current) {
        return;
      }

      if (!window.EBWidgets) {
        setStatus('fallback');
        return;
      }

      hasInitialized.current = true;
      countEventbriteOpen();

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: EVENTBRITE_EVENT_ID,
        iframeContainerId: CHECKOUT_CONTAINER_ID,
        iframeContainerHeight: 620,
        onOrderComplete: () => {},
      });

      setStatus('ready');
    });

    return () => {
      isMounted = false;
      removeLoadListener?.();
    };
  }, []);

  return (
    <div className="eventbrite-embed">
      {status === 'loading' && <p className="eventbrite-embed__status">Loading checkout...</p>}
      {status === 'fallback' && (
        <div className="eventbrite-embed__fallback">
          <p>Eventbrite checkout could not be loaded in this browser.</p>
          <a href={EVENTBRITE_TICKETS_URL} target="_blank" rel="noopener noreferrer">
            Open on Eventbrite
          </a>
        </div>
      )}
      <div id={CHECKOUT_CONTAINER_ID} className="eventbrite-embed__container" />
    </div>
  );
};

export default EventbriteEmbeddedCheckout;
