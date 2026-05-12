/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/home/hero';
import Info from 'components/pages/home/info';
import Sponsors from 'components/pages/home/sponsors';
import Tickets from 'components/pages/home/tickets';
import Venue from 'components/pages/home/venue';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const HomePage = () => (
  <Layout homepage>
    <Hero />
    <Info />
    <Tickets />
    <Venue />
    <Sponsors />
  </Layout>
);

/*
<Speakers location={location} />
<FloorPlan />
<GoldSponsor />
<Proposal />
<Schedule />
<Venue />
<Details />
<Partners />
<Proposal />
<Tickets />
<Speakers />
<Sponsors />
<Details />
<Proposal />
*/

export default HomePage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;
