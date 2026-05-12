import { StaticImage } from 'gatsby-plugin-image';
import { Calendar, MapPin, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import './hero.css';

import { EVENTBRITE_EVENT_ID, loadEventbriteWidget } from '../eventbrite';

const EVENTBRITE_MODAL_TRIGGER_ID = `eventbrite-widget-modal-trigger-${EVENTBRITE_EVENT_ID}`;
const EVENTBRITE_TICKETS_URL = `https://www.eventbrite.nl/e/dutch-cloud-native-day-2026-tickets-${EVENTBRITE_EVENT_ID}`;

const Hero = () => {
  useEffect(() => {
    const createEventbriteModal = () => {
      if (!window.EBWidgets) {
        return;
      }

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: EVENTBRITE_EVENT_ID,
        modal: true,
        modalTriggerElementId: EVENTBRITE_MODAL_TRIGGER_ID,
        onOrderComplete: () => {},
      });
    };

    return loadEventbriteWidget(createEventbriteModal);
  }, []);

  return (
    <div className="hero-container">
      <section className="hero-section">
        <div className="hero-background-grid" />

        <div className="hero-content-container">
          <div className="hero-grid">
            {/* Left column - Content */}
            <div className="hero-left-column fade-in-up">
              {/* Date Badge */}
              <span className="hero-badge">29 &amp; 30 October 2026</span>

              {/* Title */}
              <h1 className="hero-title">Dutch Cloud Native Day</h1>

              {/* Description */}
              <p className="hero-description">
                On 29 and 30 October 2026, the cloud native community will gather at Jaarbeurs in
                Utrecht for two full days of talks, workshops and hallway conversations. Come and
                join us!
              </p>

              {/* Feature List */}
              <ul className="hero-feature-list">
                <li className="hero-feature-item">
                  <Calendar className="hero-icon" />
                  <span>Two full days of technical talks and workshops</span>
                </li>
                <li className="hero-feature-item">
                  <MapPin className="hero-icon" />
                  <span>Jaarbeurs, Utrecht — The Netherlands</span>
                </li>
                <li className="hero-feature-item">
                  <Users className="hero-icon" />
                  <span>Developers, Platform Engineers, AI Wizards and Cloud Native Enthusiasts</span>
                </li>
              </ul>

              <p className="hero-description">
                After a great 2025 edition in Utrecht, Dutch Cloud Native Day returns in 2026. See
                you there!
              </p>
              {/* CTA Buttons */}
              <div className="hero-cta-container">
                <a
                  href="https://sessionize.com/dutch-cloud-native-day-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-button"
                >
                  Submit a Talk
                </a>
                <a
                  href="https://drive.google.com/file/d/1pmfb1SrN77O9qqoincRnnVsluhhDmk8e/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-button"
                >
                  Become a Sponsor
                </a>
                <noscript>
                  <a href={EVENTBRITE_TICKETS_URL} rel="noopener noreferrer" target="_blank">
                    Buy Tickets on Eventbrite
                  </a>
                </noscript>
                <button id={EVENTBRITE_MODAL_TRIGGER_ID} type="button" className="hero-cta-button">
                  Buy Tickets
                </button>
              </div>
            </div>

            <div className="hero-right-column fade-in-scale">
              <div className="hero-illustration-container">
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '0.8',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                  }}
                >
                  <StaticImage
                    src="./images/CND-NL-Buildings.png"
                    alt="Dutch Cloud Native Day illustration"
                    formats={['auto', 'webp']}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
