/* eslint-disable react/prop-types */
import React from 'react';

import Schedule from 'components/pages/schedule/schedule';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const ProgramPage = () => (
  <Layout headerClassnames="!bg-white">
    <section className="safe-paddings pb-20 pt-24 lg:pt-[4.5rem] md:pb-16 md:pt-16 sm:py-8">
      <div className="container mx-auto px-4 text-center text-primary-1">
        <h1 className="text-5xl font-bold leading-tight md:text-4xl">Agenda</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Workshops on Thursday 29 October, conference talks on Friday 30 October 2026.
        </p>
      </div>
      <Schedule />
    </section>
  </Layout>
);

export default ProgramPage;

export const Head = ({ location: { pathname } }) => <SEO {...SEO_DATA.program} pathname={pathname} />;
