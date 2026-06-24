import React from 'react';

import './speakers.css';

const Speakers = () => (
  <section className="py-16">
    <div className="container mx-auto max-w-2xl px-4 text-center">
      <h1 className="mb-6 text-3xl font-bold text-primary-1">Program Coming Soon</h1>
      <p className="mb-8 text-gray-600">
        The Call for Papers is now closed. We are reviewing submissions and shaping the 2026
        program. You can still view an existing submission through Sessionize, or browse the{' '}
        <a
          href="/2025/speakers/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold hover:underline"
        >
          2025 speakers
        </a>{' '}
        for a taste of previous editions.
      </p>
      <a
        href="https://sessionize.com/dutch-cloud-native-day-2026/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-md bg-primary-1 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-1"
      >
        Open Sessionize
      </a>
    </div>
  </section>
);

export default Speakers;
