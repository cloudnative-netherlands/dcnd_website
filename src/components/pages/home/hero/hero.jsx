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

            {/* CTA Buttons */}
            <div className="hero-cta-container">
              <a
                href="/#tickets"
                className="hero-cta-button hero-cta-button--primary"
                data-goatcounter-click="ticket-click"
                data-goatcounter-title="Ticket click"
              >
                Buy Tickets
              </a>
              <a
                href="https://drive.google.com/file/d/1pmfb1SrN77O9qqoincRnnVsluhhDmk8e/view"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-button hero-cta-button--secondary"
                data-goatcounter-click="sponsor-click"
                data-goatcounter-title="Sponsor click"
              >
                Become a Sponsor
              </a>
              <a
                href="/program"
                className="hero-cta-button hero-cta-button--secondary"
                data-goatcounter-click="program-click"
                data-goatcounter-title="Program click"
              >
                CFP Closed
              </a>
            </div>
            <p className="hero-support-text">
              CFP is now closed. We’re reviewing submissions and building the 2026 program.
            </p>

            <p className="hero-description hero-detail-description">
              On 29–30 October 2026, the cloud native community will gather at Jaarbeurs in Utrecht
              for two full days of talks, workshops and hallway conversations. Come and join us!
            </p>

            {/* Feature List */}
            <ul className="hero-feature-list">
              <li className="hero-feature-item">
                <Calendar className="hero-icon" />
                <span>Workshops on 29 October, conference talks on 30 October</span>
              </li>
              <li className="hero-feature-item">
                <MapPin className="hero-icon" />
                <span>Jaarbeurs, Utrecht, The Netherlands</span>
              </li>
              <li className="hero-feature-item">
                <Users className="hero-icon" />
                <span>
                  Developers, platform engineers, DevOps engineers, SREs, AI infrastructure
                  engineers and cloud native enthusiasts.
                </span>
              </li>
            </ul>

            <p className="hero-description">
              Expect sessions on using AI tools and agents to develop, operate, secure and
              troubleshoot cloud-native production infrastructure, alongside practical lessons on
              running modern AI workloads.
            </p>
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

export default Hero;
