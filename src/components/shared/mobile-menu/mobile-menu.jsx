import { m, LazyMotion, domAnimation, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import MENUS from 'constants/menus';
import useScrollOverflow from 'hooks/use-scroll-overflow';

import Button from '../button';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 30,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 40,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileMenu = ({ isOpen, onButtonClick }) => {
  const controls = useAnimation();

  useScrollOverflow(controls, isOpen);

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="safe-paddings fixed inset-0 z-[-1] mt-[70px] hidden overflow-x-hidden overflow-y-hidden bg-white px-8 pb-5 pt-[72px] lg:flex lg:flex-col lg:justify-between"
        initial="from"
        animate={controls}
        variants={variants}
      >
        <div className="scrollbar-hidden my-auto flex h-full w-full overflow-x-hidden overflow-y-scroll">
          <ul className="mx-auto flex flex-col justify-center space-y-3 text-center text-xl font-semibold text-primary-1">
            {MENUS.mobile.map((item, index) => {
              const { text, to, id, children } = item;

              if (children) {
                return (
                  <li key={index}>
                    <div className="block py-4 text-primary-1">{text}</div>
                    <ul className="flex flex-col space-y-2 text-lg">
                      {children.map((child, ci) => (
                        <li key={ci}>
                          <Button
                            className="block py-2"
                            theme="link-primary"
                            to={child.to}
                            target={child.target}
                            rel={child.target === '_blank' ? 'noopener noreferrer' : undefined}
                            onClick={onButtonClick}
                          >
                            {child.text}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <Button
                    className="block py-4"
                    theme="link-primary"
                    to={to || `/#${id}`}
                    onClick={onButtonClick}
                  >
                    {text}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center text-sm text-gray-500">Tickets for 2026 — coming soon</p>
        </div>
      </m.nav>
    </LazyMotion>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
  onButtonClick: PropTypes.func.isRequired,
};

export default MobileMenu;
