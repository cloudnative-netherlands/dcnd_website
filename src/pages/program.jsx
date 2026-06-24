/* eslint-disable react/prop-types */
import React from 'react';

import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const ProgramPage = () => (
  <Layout headerClassnames="!bg-white">
    <section className="safe-paddings pb-20 pt-24 lg:pt-[4.5rem] md:pb-16 md:pt-16 sm:py-8">
      <div className="container mx-auto max-w-3xl px-4 text-primary-1">
        <h1 className="mb-8 text-5xl font-bold leading-tight md:text-4xl">
          Program Coming Soon
        </h1>

        <div className="space-y-6 text-lg leading-8 text-gray-600">
          <p>
            The Call for Papers is now closed. Thank you to everyone who submitted. We received
            proposals for talks, workshops, panels and lightning talks from across the cloud native
            community. We’re grateful for every submission and are now working through the selection
            process.
          </p>
          <p>
            We’re reviewing submissions and shaping an engaging, practical program for Dutch Cloud
            Native Day 2026. The full schedule will be published once the selection process is
            complete.
          </p>
        </div>

        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-primary-1">Submitted a proposal?</h2>
          <p className="mb-6 text-lg leading-8 text-gray-600">
            You can still view your submission through Sessionize. For questions, contact{' '}
            <a
              href="mailto:info@dutchcloudnativeday.nl"
              className="font-bold text-primary-1 hover:underline"
            >
              info@dutchcloudnativeday.nl
            </a>
            .
          </p>
          <a
            href="https://sessionize.com/dutch-cloud-native-day-2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary-1 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-1"
          >
            Open Sessionize
          </a>
        </section>
      </div>
    </section>
  </Layout>
);

export default ProgramPage;

export const Head = ({ location: { pathname } }) => <SEO {...SEO_DATA.program} pathname={pathname} />;
