import React from 'react';

import './speakers.css';

const Speakers = () => (
  <section className="py-16">
    <div className="container mx-auto max-w-2xl px-4 text-center">
      <h1 className="mb-6 text-3xl font-bold text-primary-1">Speakers — 2026</h1>
      <p className="text-gray-600">
        The 2026 speaker lineup has not been announced yet. Submissions open soon via our Call for
        Speakers — check back here, or browse the{' '}
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
    </div>
  </section>
);

export default Speakers;
