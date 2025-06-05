import { StaticImage } from 'gatsby-plugin-image';
import { Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <section className="hero-section">
        <div className="hero-background-grid" />

        <div className="hero-content-container">
          <div className="hero-grid">
            {/* Left column - Content */}
            <div className="hero-left-column fade-in-up">
              {/* Date Badge */}
              <span className="hero-badge">July 3rd 2025</span>

              {/* Title */}
              <h1 className="hero-title">Dutch Cloud Native Day</h1>

              {/* Description */}
              <p className="hero-description">
                On July 3rd 2025, the cloud native community will gather in Utrecht. Come and join us!
              </p>

              {/* Feature List */}
              <ul className="hero-feature-list">
                <li className="hero-feature-item">
                  <Calendar className="hero-icon" />
                  <span>A Full Day of technical talks and Workshops</span>
                </li>
                <li className="hero-feature-item">
                  <MapPin className="hero-icon" />
                  <span>Utrecht, The Netherlands</span>
                </li>
                <li className="hero-feature-item">
                  <Users className="hero-icon" />
                  <span>Developers, Platform Engineers, AI Wizards and Cloud Native Enthusiasts</span>
                </li>
              </ul>

              <p className="hero-description">
                After Amsterdam 2024, Dutch Cloud Native Day (DCND) is back!...Utrecht, here we come!
              </p>
              {/* CTA Buttons */}
              <div className="hero-cta-container">
                <button
                  type="button"
                  className="button"
                  style={{ cursor: 'pointer' }}
                  onClick={() => (window.location.href = '#tickets')}
                >
                  Get your Ticket
                </button>
                {
                  <button
                    type="button"
                    className="hero-cta-secondary"
                    onClick={() => (window.location.href = '#agenda')}
                  >
                    Our Agenda
                  </button>
                }
                {
                  <button
                    type="button"
                    className="hero-cta-secondary"
                    onClick={() => (window.location.href = '#sponsors')}
                  >
                    Become a Sponsor
                  </button>
                }
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
                    src="./images/hero-illustration.png"
                    alt="Hero"
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
