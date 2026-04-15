import React from 'react';

import './schedule.css';

const Schedule = () => (
  <section id="schedule" className="py-12 sm:py-20" style={{ marginBottom: '2rem' }}>
    <div className="container mx-auto px-4 text-center">
      <h2 className="section-title">Schedule</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-600">
        The 2026 program will appear here once the Call for Speakers closes and sessions are
        confirmed. In the meantime, check out{' '}
        <a
          href="/2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold hover:underline"
        >
          the 2025 archive
        </a>{' '}
        for a sense of what to expect.
      </p>
    </div>
  </section>
);

export default Schedule;
