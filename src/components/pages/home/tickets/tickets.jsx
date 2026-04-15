import React from 'react';
import './tickets.css';

const Tickets = () => (
  <div className="overflow-hidden rounded-lg  border">
    <div className="space-y-6 p-6">
      <div className="space-y-2 rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold">Tickets for 2026</h3>
        <p className="text-sm text-gray-600">
          Ticket sales for Dutch Cloud Native Day 2026 have not opened yet. Follow us on LinkedIn
          or check back here soon — we&apos;ll announce pricing and on-sale dates as the event
          takes shape.
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold">Diversity Tickets</h4>
        <p className="text-sm">
          Contact us at{' '}
          <a
            href="mailto:info@dutchcloudnativeday.nl"
            className="text-primary font-bold hover:underline"
          >
            info@dutchcloudnativeday.nl
          </a>{' '}
          to apply for a diversity ticket - sponsored by Stichting Cloud Native NL.
        </p>
      </div>
    </div>
  </div>
);

export default Tickets;
