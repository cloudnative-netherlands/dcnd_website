import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import slugify from 'slugify';
import MENUS from 'constants/menus';
import Burger from '../burger';
import Link from '../link';
import { StaticImage } from 'gatsby-plugin-image';
import { FaDiscord } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

import './header.css';

const Header = ({ isMobileMenuOpen, onBurgerClick, additionalClassName }) => {
  const getAnchor = (str) => slugify(str).toLocaleLowerCase();

  const handleAnchorClick = (e) => {
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
    <header
      className={clsx('safe-paddings transition-200 z-10 transition-colors', additionalClassName)}
    >
      <div
        className="flex items-center justify-between pb-2 pt-5"
        style={{
          position: 'relative',
          margin: '0 auto',
          maxWidth: '80rem',
          padding: '1rem 1rem',
        }}
      >
        <Link className="z-50 ml-2" to="/">
          <StaticImage
            src="./images/logo.png"
            alt="logo"
            formats={['auto', 'webp']}
            className="navbar-logo"
            onClick={() => {
              window.location.href = `/`;
            }}
          />
        </Link>

        <nav>
          <ul className=" flex space-x-8 text-white lg:space-x-6 md:hidden">
            {MENUS.header.map((item, index) => {
              const { text, to, homeTo, external, target, children } = item;

              if (children) {
                return (
                  <li
                    key={index}
                    className="group relative text-[15px] font-semibold"
                    style={{ color: '#21468B', cursor: 'pointer' }}
                  >
                    <span className="text-primary hover:text-primary-dark inline-flex items-center gap-1 transition-colors duration-200">
                      {text}
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="invisible absolute left-0 top-full z-50 w-auto pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                      <ul className="rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                        {children.map((child, ci) => (
                          <li key={ci}>
                            <Link
                              to={child.to}
                              external={child.external}
                              target={child.target}
                              rel={child.target === '_blank' ? 'noopener noreferrer' : undefined}
                              className="text-primary hover:text-primary-dark block whitespace-nowrap px-3 py-1.5 text-[15px] font-semibold transition-colors duration-200 hover:bg-gray-50"
                            >
                              {child.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li
                  className="text-[15px] font-semibold"
                  key={index}
                  style={{ color: '#21468B', cursor: 'pointer' }}
                >
                  <Link
                    to={to || `/#${homeTo}`}
                    external={external}
                    target={target}
                    className="text-primary hover:text-primary-dark cursor-pointer transition-colors duration-200"
                    onClick={handleAnchorClick}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            type="button"
            className="button"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              window.location.href = `https://www.linkedin.com/company/cloudnativenl`;
            }}
          >
            Join our Community
            <FaLinkedinIn style={{ marginLeft: '1rem', color: '#fff' }} />
          </button>
        </div>

        <Burger
          className={clsx('z-50 hidden md:block', isMobileMenuOpen && 'text-black dark:text-black')}
          isToggled={isMobileMenuOpen}
          onClick={onBurgerClick}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  onBurgerClick: PropTypes.func.isRequired,
  additionalClassName: PropTypes.string,
  homepage: PropTypes.bool,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
  additionalClassName: null,
  homepage: false,
};

export default Header;
