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
                  className="button"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                 Submit a Talk
                </a>
                <a
                  href="/2026-Sponsorship-Prospectus-DCND.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  Become a Sponsor
                </a>
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
