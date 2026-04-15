import React from 'react';

import './schedule.css';

const Schedule = () => (
  <section className="py-16">
    <div className="container mx-auto max-w-2xl px-4 text-center">
      <h1 className="mb-6 text-3xl font-bold text-primary-1">Schedule — 2026</h1>
      <p className="text-gray-600">
        The 2026 program will be published here once sessions are confirmed. In the meantime, you
        can revisit the{' '}
        <a
          href="/2025/schedule/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold hover:underline"
        >
          2025 schedule
        </a>
        .
      </p>
    </div>
  </section>
);

export default Schedule;
