import { Calendar, Coffee, Mic2, Users } from 'lucide-react';
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
              Dutch Cloud Native Day is a community-organized event for cloud native adopters,
              technologists, platform engineers and open source practitioners from the Netherlands,
              Europe and beyond.
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
              The event is supported by Stichting Cloud Native Netherlands and remains vendor
              neutral, inclusive and community first. Expect practical content, open space sessions
              and plenty of room to meet peers across the cloud native ecosystem.
            </p>
          </div>
        </div>

        {/* Video Section */}
        {/* (Removed YouTube video iframe section) */}
      </div>

      {/* What to Expect Section */}
      <div className="expect-section">
        <h2 className="section-title">What is included</h2>
        <div className="features-grid">
          <div className="feature-item">
            <Calendar className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Workshop day</h3>
              <p className="feature-text">Hands-on sessions planned for Thursday 29 October</p>
            </div>
          </div>

          <div className="feature-item">
            <Mic2 className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Conference day</h3>
              <p className="feature-text">
                Practical talks, panels and community sessions on Friday 30 October
              </p>
            </div>
          </div>

          <div className="feature-item">
            <Coffee className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Food included</h3>
              <p className="feature-text">
                Vegetarian and vegan-friendly catering during the conference day
              </p>
            </div>
          </div>

          <div className="feature-item">
            <Users className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Community space</h3>
              <p className="feature-text">
                Hallway conversations, sponsors and a welcoming vendor-neutral crowd
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* What to Expect Section */}
    </div>
  </section>
);

export default Info;
