/* eslint-disable react/prop-types */
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';

import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const SchedulePage = () => {
  useEffect(() => {
    navigate('/program', { replace: true });
  }, []);

  return (
    <Layout headerClassnames="!bg-white">
      <section className="safe-paddings pb-20 pt-24 lg:pt-[4.5rem] md:pb-16 md:pt-16 sm:py-8">
        <div className="container mx-auto max-w-3xl px-4 text-primary-1">
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-4xl">
            Program Coming Soon
          </h1>
          <p className="text-lg leading-8 text-gray-600">
            Redirecting to the Dutch Cloud Native Day 2026 program page.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SchedulePage;

export const Head = ({ location: { pathname } }) => (
  <SEO {...SEO_DATA.program} pathname={pathname} />
);
