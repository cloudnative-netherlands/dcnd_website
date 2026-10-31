import { StaticImage } from 'gatsby-plugin-image';
import { Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import './hero.css';

const Hero = () => (
  <div className="hero-container">
    <section className="hero-section">
      <div className="hero-background-grid" />

      <div className="hero-content-container">
        <div className="hero-grid">
          <div className="hero-mobile-illustration fade-in-scale">
            <StaticImage
              src="./images/CND-NL-Buildings.png"
              alt="Dutch Cloud Native Day buildings"
              formats={['auto', 'webp']}
            />
          </div>

          {/* Left column - Content */}
          <div className="hero-left-column fade-in-up">
            {/* Date Badge */}
            <span className="hero-badge">29–30 October 2026</span>

            {/* Title */}
            <h1 className="hero-title">Dutch Cloud Native Day</h1>
            <p className="hero-theme">2026 Theme: Cloud Native in the Age of AI</p>

            {/* Description */}
            <p className="hero-description hero-short-description">
              Two days of cloud native talks, workshops and community in Utrecht, exploring how AI
              is changing the way we build, run and scale modern platforms.
            </p>

            {/* Post-event thank you */}
            <div className="hero-sold-out-banner">
              <span className="hero-sold-out-banner-label">Thank you</span>
              <p className="hero-sold-out-banner-title">Thank you for making DCND 2026 happen!</p>
              <p className="hero-sold-out-banner-text">
                To everyone who joined us, shared their knowledge, volunteered, organized and
                supported the event: thank you for two wonderful days of learning and connection.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-container">
              <a
                href="/agenda"
                className="hero-cta-button hero-cta-button--primary"
                data-goatcounter-click="program-click"
                data-goatcounter-title="Program click"
              >
                View 2026 agenda
              </a>
            </div>
            <p className="hero-description hero-detail-description">
              On 29–30 October 2026, the cloud native community gathered at Jaarbeurs in Utrecht
              for two days of talks, workshops and hallway conversations.
            </p>

            <p className="hero-description">
              Sessions explored the use of AI tools and agents to develop, operate, secure and
              troubleshoot cloud native production infrastructure, alongside practical lessons on
              running modern AI workloads.
            </p>
          </div>

          {/* Illustration (desktop only) and event details, centred next to the intro */}
          <div className="hero-aside">
            <div className="hero-right-column fade-in-scale">
              <div className="hero-illustration-container">
                <StaticImage
                  src="./images/CND-NL-Buildings.png"
                  alt="Dutch Cloud Native Day illustration"
                  formats={['auto', 'webp']}
                />
              </div>
            </div>

            <div className="hero-details fade-in-up">
              <ul className="hero-feature-list">
                <li className="hero-feature-item">
                  <Calendar className="hero-icon" />
                  <div className="hero-days">
                    <div className="hero-day">
                      <span className="hero-day-title">
                        Thursday 29 October <span className="hero-sold-out">Sold out</span>
                      </span>
                      <span>Workshops</span>
                      <span>Doors open 09:00</span>
                      <span>Workshops start 09:45</span>
                      <span>Workshops end 15:30</span>
                    </div>
                    <div className="hero-day">
                      <span className="hero-day-title">
                        Friday 30 October <span className="hero-sold-out">Sold out</span>
                      </span>
                      <span>Conference talks</span>
                      <span>Doors open 08:45</span>
                      <span>Talks start 09:30</span>
                      <span>Talks end 17:25</span>
                      <span>Drinks (borrel) until 18:00</span>
                    </div>
                  </div>
                </li>
                <li className="hero-feature-item">
                  <MapPin className="hero-icon" />
                  <span>
                    <a
                      href="https://www.jaarbeurs.nl/location/congreslocatie/mediaplaza/supernova"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Jaarbeurs Supernova
                    </a>
                    , Jaarbeursplein 6, 3521 AL Utrecht, The Netherlands
                  </span>
                </li>
                <li className="hero-feature-item">
                  <Users className="hero-icon" />
                  <span>
                    Developers, platform engineers, DevOps engineers, SREs, AI infrastructure
                    engineers and cloud native enthusiasts.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Hero;
