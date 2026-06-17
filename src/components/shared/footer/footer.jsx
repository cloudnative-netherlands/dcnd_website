import React from 'react';
import slugify from 'slugify';

import LINKS from 'constants/links.js';
import MENUS from 'constants/menus';
import GoogleMaps from 'icons/google-maps-icon.inline.svg';

import LinkedIn from 'icons/linkedin-logo.inline.svg';
///import Twitter from 'icons/twitter-logo.inline.svg';
///import Youtube from 'icons/youtube.inline.svg';
///import { FaDiscord } from 'react-icons/fa';
///import { FaBluesky } from 'react-icons/fa6';

import { StaticImage } from 'gatsby-plugin-image';

import Button from '../button';
import { useCookieConsent } from '../cookie-consent';
import Link from '../link';

import './footer.css';

const items = [
  { icon: GoogleMaps, iconClassName: 'w-4 h-9', url: LINKS.googlemaps.to },
  { icon: LinkedIn, iconClassName: 'w-5 h-9', url: LINKS.linkedin.to },
  ///{ icon: Twitter, iconClassName: 'w-5 h-9', url: LINKS.twitter.to },
  ///{ icon: Youtube, iconClassName: 'w-7 h-9', url: LINKS.youtube.to },
  ///{ icon: FaDiscord, iconClassName: 'w-7 h-9', url: 'https://discord.com/invite/Ht3upbGey9' },
  ///{
  ///  icon: FaBluesky,
  ///  iconClassName: 'w-5 h-9',
  ///  url: 'https://bsky.app/profile/cnsmunich.bsky.social',
  ///},
];

const Footer = () => {
  const { openCookiePreferences } = useCookieConsent();

  const handleAnchorClick = (e) => {
    const getAnchor = (str) => slugify(str).toLocaleLowerCase();

    const id = getAnchor(e.target.firstChild.data);
    const element = document.getElementById(id);

    if (element) {
      const indent = 50;
      const elementTop = element.getBoundingClientRect().top;
      const elementOffset = window.pageYOffset + elementTop - indent;

      window.scrollTo({
        top: elementOffset,
        behavior: 'smooth',
      });
    }
  };
  return (
    <footer className="safe-paddings border-t border-t-gray-10 bg-white">
      <div className="footer-container container">
        <Link className="z-50 ml-2" to="/">
          <StaticImage
            src="./images/logo.png"
            alt="logo"
            formats={['auto', 'webp']}
            className="navbar-logo"
          />
        </Link>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-nav-list">
            {MENUS.footer.map(({ text, to, target }, index) => (
              <li className="footer-nav-item" key={index}>
                <Button className="Link" to={to} target={target} onClick={handleAnchorClick}>
                  {text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-contact">
          <div className="flex h-full items-center justify-center">
            <Link
              className="Link ml-2 font-semibold transition-colors duration-200"
              theme="primary"
              to="mailto:info@dutchcloudnativeday.nl"
              data-goatcounter-click="contact-click"
              data-goatcounter-title="Contact click"
            >
              Contact us
            </Link>
          </div>

          <ul className="footer-social-list">
            {items.map(({ icon, iconClassName, url }, index) => {
              const Icon = icon;

              return (
                <li className="h-9 w-9" key={index}>
                  <Link
                    className="flex h-full w-full items-center justify-center"
                    to={url}
                    target="_blank"
                  >
                    <Icon className={iconClassName} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <button type="button" className="footer-cookie-link" onClick={openCookiePreferences}>
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
