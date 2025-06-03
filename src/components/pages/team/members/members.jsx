import clsx from 'clsx';
import React from 'react';

import Link from 'components/shared/link';
import liquid from 'icons/liquid.png';
import whiteduck from 'icons/whiteduck.png';

import WilliamPhoto from './images/william-rizzo.jpg';
import CatalinPhoto from './images/catalin_j.jpg';
import KarlaPhoto from './images/karla_f.jpg';
import MarcelPhoto from './images/marcel_k.jpg';
import PacoPhoto from './images/paco_b.jpeg';


const ITEMS = [
  {
    name: 'William Rizzo',
    position: 'Strategy Lead - Mirantis',
    photo: WilliamPhoto,
    url: 'https://www.linkedin.com/in/william-rizzo/',
  },
  {
    name: 'Catalin Jora',
    position: 'Cloud Native Consultant - FikaWorks',
    photo: CatalinPhoto,
    url: 'https://www.linkedin.com/in/jocatalin/',
  },
  {
    name: 'Karla Feijoo',
    position: 'Sr Marketing Manager EMEA - Isovalent at Cisco',
    photo: KarlaPhoto,
    url: 'https://www.linkedin.com/in/karla-valeria-feijoo-54934422/',
  },
  {
    name: 'Marcel Kerker',
    position: 'IT Consultant - HCS Company',
    photo: MarcelPhoto,
    url: 'https://www.linkedin.com/in/mkerker/',
  },
  {
    name: 'Paco Bernabé',
    position: 'Senior DevOps & Cloud Consultant - Independent',
    photo: PacoPhoto,
    url: 'https://www.linkedin.com/in/maxkoerbaecher/',
  },
];

const LOGOS = [
  ///  { icon: liquid, url: 'http://liquidreply.com/', iconClassName: 'w-[250px] h-auto' },
  ///  { icon: whiteduck, url: 'https://whiteduck.de/', iconClassName: 'w-[250px] h-auto' },
];

const Members = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container">
      <ul className="mt-20 grid grid-cols-4 gap-8 lg:gap-6 md:flex md:flex-wrap md:justify-evenly [@media(max-width:900px)]:mx-auto [@media(max-width:900px)]:max-w-[570px]">
        {ITEMS.map(({ name, position, photo, url }, index) => (
          <li className="flex w-[240px] flex-col lg:w-52 md:w-48 sm:max-w-[200px]" key={index}>
            <div className="h-64 w-full overflow-hidden rounded-2xl">
              <img className="h-full w-full object-cover" src={photo} loading="lazy" alt={name} />
            </div>

            <p
              className="mt-2.5 text-2xl font-bold leading-normal sm:text-left"
              style={{ color: '#004258' }}
            >
              {name}
            </p>

            <span className="mt-1.5 text-primary-1">{position}</span>

            <Link
              className="leading-norma mt-2.5 text-base font-semibold"
              style={{ color: '#004258' }}
              to={url}
              target="_blank"
            >
              LinkedIn
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <div
      className="mx-auto mt-36"
      style={{
        minHeight: '15vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '4rem',
      }}
    >
      {LOGOS.map(({ icon, url, iconClassName }, index) => (
        <li
          className="flex min-h-[80px] w-[260px] items-center justify-center sm:min-h-[120px]"
          key={index}
        >
          <Link className="flex h-full w-full items-center justify-center" to={url}>
            <img
              className={clsx(iconClassName, 'max-w-[30vh]')}
              src={icon}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
            />
          </Link>
        </li>
      ))}
    </div>
  </section>
);

export default Members;
