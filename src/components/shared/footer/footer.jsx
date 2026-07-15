import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import slugify from 'slugify';

import LINKS from 'constants/links.js';
import MENUS from 'constants/menus';
import GoogleMaps from 'icons/google-maps-icon.inline.svg';
import LinkedIn from 'icons/linkedin-logo.inline.svg';

import Button from '../button';
import { useCookieConsent } from '../cookie-consent';
import Link from '../link';

import './footer.css';

const items = [
  { icon: GoogleMaps, iconClassName: 'w-4 h-9', url: LINKS.googlemaps.to },
  { icon: LinkedIn, iconClassName: 'w-5 h-9', url: LINKS.linkedin.to },
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
          {[
            ['Conference', MENUS.footer.conference],
            ['Community', MENUS.footer.community],
            ['Legal', MENUS.footer.legal],
          ].map(([title, links]) => (
            <div className="footer-nav-column" key={title}>
              <h2 className="footer-nav-heading">{title}</h2>
              <ul className="footer-nav-list">
                {links.map(({ text, to, target, external, children }, index) => (
                  <li className="footer-nav-item" key={index}>
                    <Button
                      className="Link"
                      to={to || children?.[0]?.to}
                      target={target || children?.[0]?.target}
                      external={external || children?.[0]?.external}
                      onClick={handleAnchorClick}
                    >
                      {text}
                    </Button>
                  </li>
                ))}
                {title === 'Legal' && (
                  <li className="footer-nav-item">
                    <button
                      type="button"
                      className="footer-cookie-link"
                      onClick={openCookiePreferences}
                    >
                      Privacy and cookie settings
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
