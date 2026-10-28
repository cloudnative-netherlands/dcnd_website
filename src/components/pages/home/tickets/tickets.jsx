import React from 'react';
import './tickets.css';

const Tickets = () => (
  <section className="tickets-section" id="tickets">
    <div className="tickets-container">
      <h2 className="section-title">Tickets</h2>

      <div className="tickets-sold-out-card">
        <span className="tickets-sold-out-label">Sold out</span>
        <h3 className="tickets-sold-out-title">Thank you, and see you in Utrecht!</h3>
        <p className="tickets-sold-out-text">
          Dutch Cloud Native Day 2026 is completely sold out. There are no tickets left for the
          workshop day on 29 October or the conference day on 30 October.
        </p>
        <p className="tickets-sold-out-text">
          Thank you to everyone who got a ticket. We can&apos;t wait to see you at Jaarbeurs
          Supernova!
        </p>
      </div>
    </div>
  </section>
);

export default Tickets;
