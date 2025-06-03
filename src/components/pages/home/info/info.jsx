import { Users, Calendar, MapPin } from 'lucide-react';
import Tickets from 'components/pages/home/tickets/tickets';

import React from 'react';
import './info.css';

const Info = () => (
  <section className="info-section">
    <div className="info-container">
      {/* About CNS Section */}
      <div className="about-section">
        <h2 className="section-title">About Dutch Cloud Native Day</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              Dutch Cloud Native Day is a local (and International), community-organized event that gathers
              adopters and technologists from open source and cloud native communities.
            </p>
            <div className="text-start">
              <button
                type="button"
                className="button"
                style={{ cursor: 'pointer', marginTop: '2rem' }}
                onClick={() => {
                  window.location.href = '/vision';
                }}
              >
                Our Vision
              </button>
            </div>
          </div>
          <div className="about-text">
            <p>
              This is the second edition of DCND in the Netherlands, aiming to bring the community together. The
              event provides a platform for professionals and experts from all levels and
              backgrounds to learn, network, and share their knowledge about cloud native
              technologies.
            </p>
          </div>
        </div>

        {/* Video Section */}
        {/* (Removed YouTube video iframe section) */}
      </div>

      {/* What to Expect Section */}
      <div className="expect-section">
        <h2 className="section-title">What to Expect?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <Users className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Community Networking</h3>
              <p className="feature-text">Connect with peers from the cloud native community</p>
            </div>
          </div>

          <div className="feature-item">
            <Calendar className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Technical Talks</h3>
              <p className="feature-text">Engaging presentations from industry experts</p>
            </div>
          </div>

          <div className="feature-item">
            <MapPin className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Unique Venue</h3>
              <p className="feature-text">
                A fantastic multi-room venue with ample space for activities
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* What to Expect Section */}
      <div className="expect-section" id="tickets">
        <h2 className="section-title">Get your Ticket now!</h2>
        <div className="expect-section">
          {/* Ticket Section */}
          <Tickets />
        </div>
      </div>
    </div>
  </section>
);

export default Info;
