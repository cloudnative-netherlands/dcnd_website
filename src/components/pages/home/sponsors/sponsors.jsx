import clsx from 'clsx';
import React from 'react';

import Clastix from 'icons/clastix-logo.png';
import Dash0 from 'icons/dash0-logo.svg';
import Exoscale from 'icons/exoscale-logo.png';
import Grafana from 'icons/grafanalabs.webp';
import Isovalent from 'icons/isovalent.svg';
import itq from 'icons/itq-logo.png';
import learnk8s from 'icons/learnk8s-logo.png';
import Rubicon from 'icons/rubicon-logo.svg';
import SUSE from 'icons/suse-logo.png';
import sysdig from 'icons/sysdig.png';

import './sponsor.css';

const SHOW_SPONSORS = true;

// Sponsor prominence is set by tier card dimensions. Per-logo scale only compensates
// for source artwork whitespace and aspect ratio so logos look optically balanced.
const tierConfig = {
  platinum: {
    title: 'Platinum',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-purple-50 text-purple-500',
    cardClass: '',
    cardWidth: 352,
    cardHeight: 156,
    logoBoxWidth: 260,
    logoBoxHeight: 82,
    headingClass: 'text-2xl',
    containerClass: 'flex flex-wrap justify-center gap-4',
  },
  gold: {
    title: 'Gold',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-yellow-50 text-yellow-500',
    cardClass: '',
    cardWidth: 304,
    cardHeight: 132,
    logoBoxWidth: 224,
    logoBoxHeight: 68,
    headingClass: 'text-[1.35rem]',
    containerClass: 'flex flex-wrap justify-center gap-4',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-gray-50 text-gray-500',
    cardClass: '',
    cardWidth: 248,
    cardHeight: 112,
    logoBoxWidth: 170,
    logoBoxHeight: 50,
    headingClass: 'text-xl',
    containerClass: 'flex flex-wrap justify-center gap-4',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-orange-50 text-orange-500',
    cardClass: '',
    cardWidth: 220,
    cardHeight: 96,
    logoBoxWidth: 164,
    logoBoxHeight: 46,
    headingClass: 'text-xl',
    containerClass: 'flex flex-wrap justify-center gap-4',
  },
  partner: {
    title: 'Community Partners',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-green-50 text-green-500',
    cardClass: '',
    cardWidth: 220,
    cardHeight: 96,
    logoBoxWidth: 164,
    logoBoxHeight: 46,
    headingClass: 'text-xl',
    containerClass: 'flex flex-wrap justify-center gap-4',
  },
};

const sponsorsList = [
  {
    name: 'CLASTIX',
    icon: Clastix,
    url: 'https://www.clastix.io/',
    tier: 'platinum',
    logoScale: 1.1,
  },
  {
    name: 'Dash0',
    icon: Dash0,
    url: 'https://www.dash0.com/',
    tier: 'platinum',
    logoScale: 0.9,
  },
  {
    name: 'Exoscale (A1.digital)',
    icon: Exoscale,
    url: 'https://www.exoscale.com',
    tier: 'gold',
    logoScale: 0.92,
  },
  {
    name: 'Isovalent',
    icon: Isovalent,
    url: 'https://isovalent.com/',
    tier: 'gold',
    logoScale: 0.92,
  },
  {
    name: 'SUSE',
    icon: SUSE,
    url: 'https://www.suse.com/',
    tier: 'platinum',
    logoScale: 1.04,
  },
  {
    name: 'ITQ',
    icon: itq,
    url: 'https://itq.eu/nl',
    tier: 'silver',
    logoScale: 0.94,
  },
  {
    name: 'Grafana',
    icon: Grafana,
    url: 'https://grafana.com/',
    tier: 'silver',
    logoScale: 1.1,
  },
  {
    name: 'Sysdig',
    icon: sysdig,
    url: 'https://www.sysdig.com/',
    tier: 'silver',
    logoScale: 0.86,
  },
  {
    name: 'Learnk8s',
    icon: learnk8s,
    url: 'https://kube.careers/',
    tier: 'partner',
    logoScale: 0.92,
  },
  {
    name: 'Rubicon',
    icon: Rubicon,
    url: 'https://rubicon.nl/',
    tier: 'gold',
    // Dense wordmark; reduced within the shared Gold logo box for optical balance.
    logoScale: 0.86,
  },
];

const contactEmail = 'info@dutchcloudnativeday.nl';

const DEFAULT_LOGO_WIDTH = 150;
const DEFAULT_LOGO_HEIGHT = 70;

const Sponsors = () => {
  if (!SHOW_SPONSORS) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Become a Sponsor</h2>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://drive.google.com/file/d/1pmfb1SrN77O9qqoincRnnVsluhhDmk8e/view"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
                style={{ cursor: 'pointer', textDecoration: 'none' }}
                data-goatcounter-click="sponsor-click"
                data-goatcounter-title="Sponsor click"
              >
                Sponsorship Prospectus
              </a>
              <a
                href={`mailto:${contactEmail}?subject=Dutch%20Cloud%20Native%20Day%202026%20sponsorship`}
                className="button"
                style={{ cursor: 'pointer', textDecoration: 'none' }}
                data-goatcounter-click="sponsor-click"
                data-goatcounter-title="Sponsor click"
              >
                Become a Sponsor
              </a>
            </div>
            <p className="text-lg text-gray-500">
              Support our local cloud native community and help make Dutch Cloud Native Day
              possible.
            </p>
            <p className="text-sm text-gray-600">
              Contact us at{' '}
              <a
                href={`mailto:${contactEmail}`}
                className=" hover:underline"
                style={{ color: '#21468B', fontWeight: 'bold' }}
                data-goatcounter-click="contact-click"
                data-goatcounter-title="Contact click"
              >
                {contactEmail}
              </a>{' '}
              to learn more about sponsorship opportunities
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show the full sponsors section when SHOW_SPONSORS is true
  return (
    <section id="sponsors" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="section-title">Our sponsors</h2>
      <div className="mb-10 text-center">
        <p className="mb-8 text-lg text-gray-500">
          Thank you to the organizations supporting Dutch Cloud Native Day 2026.
        </p>
      </div>

      {Object.entries(tierConfig).map(([tier, config], index) => {
        const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier} className={clsx('mb-12', index > 0 && 'pt-8')}>
            <div className="mb-4 flex items-center justify-center gap-2">
              <h3 className={clsx('font-semibold text-gray-900', config.headingClass)}>
                {config.title}
              </h3>
              <span
                className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}
              >
                {tierSponsors.length}
              </span>
            </div>

            <div className={config.containerClass}>
              {tierSponsors.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center justify-center rounded-lg transition-all duration-200',
                    'hover:scale-[1.02] hover:shadow-md',
                    config.cardClass,
                    config.class
                  )}
                  data-goatcounter-click="sponsor-click"
                  data-goatcounter-title="Sponsor click"
                  style={{
                    width: `min(100%, ${config.cardWidth}px)`,
                    height: config.cardHeight,
                  }}
                >
                  <div className="relative flex h-full w-full items-center justify-center px-4">
                    {sponsor.icon ? (
                      <span
                        className="flex items-center justify-center"
                        style={{
                          width: config.logoBoxWidth || DEFAULT_LOGO_WIDTH,
                          height: config.logoBoxHeight || DEFAULT_LOGO_HEIGHT,
                          transform: `translate(${sponsor.logoX || 0}px, ${
                            sponsor.logoY || 0
                          }px) scale(${sponsor.logoScale || 1})`,
                          transformOrigin: 'center',
                        }}
                      >
                        <img
                          src={sponsor.icon}
                          alt={sponsor.name}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </span>
                    ) : (
                      <span className="px-4 text-center text-xl font-semibold text-gray-900">
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-12 text-center">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">Become a Sponsor</h3>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://drive.google.com/file/d/1pmfb1SrN77O9qqoincRnnVsluhhDmk8e/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-1 px-6 py-3 text-white transition-all"
              data-goatcounter-click="sponsor-click"
              data-goatcounter-title="Sponsor click"
            >
              Sponsorship Prospectus
            </a>
            <a
              href={`mailto:${contactEmail}?subject=Dutch%20Cloud%20Native%20Day%202026%20sponsorship`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-1 px-6 py-3 text-white transition-all"
              data-goatcounter-click="sponsor-click"
              data-goatcounter-title="Sponsor click"
            >
              Become a Sponsor
            </a>
          </div>
          <p className="text-lg text-gray-500">
            Support our local cloud native community and help make Dutch Cloud Native Day possible.
          </p>
          <p className="text-sm text-gray-600">
            Contact us at{' '}
            <a
              href={`mailto:${contactEmail}`}
              className=" hover:underline"
              style={{ color: '#21468B', fontWeight: 'bold' }}
              data-goatcounter-click="contact-click"
              data-goatcounter-title="Contact click"
            >
              {contactEmail}
            </a>{' '}
            to learn more about sponsorship opportunities
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
