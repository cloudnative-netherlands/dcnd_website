export const EVENTBRITE_EVENT_ID = '1988815582946';
export const EVENTBRITE_WIDGET_SCRIPT_ID = 'eventbrite-widget-script';
export const EVENTBRITE_WIDGET_SCRIPT_SRC = 'https://www.eventbrite.nl/static/widgets/eb_widgets.js';

export const loadEventbriteWidget = (onLoad) => {
  const existingScript = document.getElementById(EVENTBRITE_WIDGET_SCRIPT_ID);

  if (existingScript) {
    existingScript.addEventListener('load', onLoad);
    onLoad();

    return () => {
      existingScript.removeEventListener('load', onLoad);
    };
  }

  const script = document.createElement('script');
  script.id = EVENTBRITE_WIDGET_SCRIPT_ID;
  script.src = EVENTBRITE_WIDGET_SCRIPT_SRC;
  script.async = true;
  script.addEventListener('load', onLoad);
  document.body.appendChild(script);

  return () => {
    script.removeEventListener('load', onLoad);
  };
};
