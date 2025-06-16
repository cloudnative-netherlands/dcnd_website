import clsx from 'clsx';
import React from 'react';

import Exoscale from 'icons/exoscale_logo.png';
import HCS_Company from 'icons/HCS-Wordmark.png';
import Mirantis from 'icons/mirantis_logo.png';
import Isovalent from 'icons/isovalent_logo.jpeg';
import Rabobank from 'icons/Rabobank_logo.png';
import Devoteam from 'icons/devoteam_logo.png';
import Innovations from 'icons/eg_logo.png';
import IShare from 'icons/i-share_logo.png';
import SUSE from 'icons/SUSE.png';
import ATComputing from 'icons/AT_logo.png';
import TrueFullstaq from 'icons/True-fullstaq_logo.png';
import Booking from 'icons/Booking_logo.png';
import varonis from 'icons/varonis.png';
import scaleway from 'icons/scaleway.png';
import sysdig from 'icons/sysdig.png';
import itq from 'icons/ITQ_logo.webp';
import mogenius from 'icons/mogenius_logo.png';
import nirmata from 'icons/nirmata_logo.webp';
import qstarsIT from 'icons/QStars_logo.png';
import cyso from 'icons/Cyso-Logo.png';
import leaseweb from 'icons/leaseweb_logo.png';
import fikaworks from 'icons/fikaworks_logo.png';
import controlplane from 'icons/controlplane_logo.png';
import amsterdamdev from 'icons/amsterdamdev_logo.png';
import learnk8s from 'icons/learnk8s_logo.png';
import certdirectory from 'icons/cert_logo.png';

import './sponsor.css';

const CARD_STYLES = 'w-[200px] h-[100px]';

const SHOW_SPONSORS = true;

const tierConfig = {
  platinum: {
    title: 'Platinum',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-purple-50 text-purple-500',
  },
  gold: {
    title: 'Gold',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-yellow-50 text-yellow-500',
  },
  silver: {
    title: 'Silver',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-gray-50 text-gray-500',
  },
  bronze: {
    title: 'Bronze',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-orange-50 text-orange-500',
  },
  partner: {
    title: 'Community Partners',
    class: 'bg-white shadow-sm',
    badgeClass: 'bg-green-50 text-green-500',
  },
};

const sponsorsList = [
  {
    name: 'Exoscale',
    icon: Exoscale,
    url: 'https://www.exoscale.com',
    tier: 'platinum',
    logoWidth: 170,
    logoHeight: 120,
  },
  {
    name: 'HCS_Company',
    icon: HCS_Company,
    url: 'https://www.hcs-company.com',
    tier: 'platinum',
    logoWidth: 190,
    logoHeight: 120,
  },
  {
    name: 'Mirantis',
    icon: Mirantis,
    url: 'https://www.mirantis.com',
    tier: 'platinum',
    logoWidth: 100,
    logoHeight: 80,
  },
  {
    name: 'Isovalent',
    icon: Isovalent,
    url: 'https://www.isovalent.com',
    tier: 'gold',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Rabobank',
    icon: Rabobank,
    url: 'https://www.rabobank.nl/particulieren',
    tier: 'gold',
    logoWidth: 120,
    logoHeight: 90,
  },
  {
    name: 'SUSE', 
    icon: SUSE,
    url: 'https://www.suse.com/',
    tier: 'gold',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Devoteam',
    icon: Devoteam,
    url: 'https://www.devoteam.com/',
    tier: 'gold',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'EG-Innovations',
    icon: Innovations,
    url: 'https://www.eginnovations.com/',
    tier: 'gold',
    logoWidth: 200,
    logoHeight: 150,
  },
  {
    name: 'I-Share',
    icon: IShare,
    url: 'https://www.i-share.nl/',
    tier: 'gold',
    logoWidth: 100,
    logoHeight: 70,
  },
  {
    name: 'AT-Computing',
    icon: ATComputing,
    url: 'https://www.atcomputing.nl',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'TrueFullstaq',
    icon: TrueFullstaq,
    url: 'https://www.truefullstaq.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Booking',
    icon: Booking,
    url: 'https://www.booking.com',
    tier: 'silver',
    logoWidth: 200,
    logoHeight: 120,
  },
  {
    name: 'itq',
    icon: itq,
    url: 'https://itq.eu/nl',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'mogenius',
    icon: mogenius,
    url: 'https://mogenius.com',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'nirmata',
    icon: nirmata,
    url: 'https://nirmata.com',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'qstarsIT',
    icon: qstarsIT,
    url: 'https://www.qstars.nl',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'cyso',
    icon: cyso,
    url: 'https://cyso.cloud/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'leaseweb',
    icon: leaseweb,
    url: 'https://www.leaseweb.com/nl',
    tier: 'silver',
    logoWidth: 200,
    logoHeight: 120,
  },
  {
    name: 'Sysdig',
    icon: sysdig,
    url: 'https://www.sysdig.com/',
    tier: 'silver',
    logoWidth: 100,
    logoHeight: 60,
  },
  {
    name: 'Varonis',
    icon: varonis,
    url: 'https://www.varonis.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'Scaleway',
    icon: scaleway,
    url: 'https://www.scaleway.com/',
    tier: 'silver',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'fikaworks',
    icon: fikaworks,
    url: 'https://fika.works',
    tier: 'bronze',
    logoWidth: 130,
    logoHeight: 90,
  },
  {
    name: 'controlplane',
    icon: controlplane,
    url: 'https://control-plane.io',
    tier: 'bronze',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'learnk8s',
    icon: learnk8s,
    url: 'https://kube.careers/',
    tier: 'partner',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'amsterdamdev',
    icon: amsterdamdev,
    url: 'https://amsterdam.dev',
    tier: 'partner',
    logoWidth: 150,
    logoHeight: 100,
  },
  {
    name: 'certdirectory',
    icon: certdirectory,
    url: 'https://certdirectory.io',
    tier: 'partner',
    logoWidth: 150,
    logoHeight: 100,
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
          <p className="mb-8 text-lg text-gray-500">
            Support our local cloud native community by sponsoring CNS Munich
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              className="button"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                window.location.href = `mailto:${contactEmail}`;
              }}
            >
              Contact Us
            </button>
            <p className="text-sm text-gray-600">
              Contact us at{' '}
              <a
                href={`mailto:${contactEmail}`}
                className=" hover:underline"
                style={{ color: '#004258', fontWeight: 'bold' }}
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="section-title">Our sponsors</h2>
      <div className="mb-16 text-center">
        <p className="mb-8 text-lg text-gray-500">
          Support our local cloud native community by sponsoring Dutch Cloud Native Day
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="https://drive.google.com/file/d/1hbDPRG4_WNLUFIM2aHEOmD-jvno1356p/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-1 px-6 py-3 text-white transition-all"
          >
            Sponsor Prospectus
          </a>
          <p className="mb-8 text-lg text-gray-500" style={{ textAlign: 'center' }}>
            Thank you to our amazing sponsors who make this event possible
          </p>
        </div>
      </div>

      {Object.entries(tierConfig).map(([tier, config]) => {
        const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier} className="mb-12">
            <div className="mb-16 text-center" />
            <div className="mb-6 flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
              <span
                className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}
              >
                {tierSponsors.length}
              </span>
            </div>

            <div className={config.containerClass}>
              <div className="flex flex-wrap justify-center gap-4">
                {tierSponsors.map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'flex items-center justify-center rounded-lg transition-all duration-200',
                      'hover:scale-[1.02] hover:shadow-md',
                      CARD_STYLES,
                      config.class
                    )}
                  >
                    <div className="relative flex h-full w-full items-center justify-center">
                      <img
                        src={sponsor.icon}
                        alt={sponsor.name}
                        loading="lazy"
                        className="object-contain"
                        style={{
                          maxWidth: sponsor.logoWidth ? sponsor.logoWidth : DEFAULT_LOGO_WIDTH,
                          maxHeight: sponsor.logoHeight ? sponsor.logoHeight : DEFAULT_LOGO_HEIGHT,
                        }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sponsors;
