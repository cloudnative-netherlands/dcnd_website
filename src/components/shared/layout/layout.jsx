import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Footer from 'components/shared/footer';
import CookieConsent from 'components/shared/cookie-consent';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';

const Layout = ({ children, headerClassnames, homepage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <CookieConsent>
      <div className="flex min-h-screen flex-col">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          additionalClassName={headerClassnames}
          homepage={homepage}
          onBurgerClick={handleHeaderBurgerClick}
        />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileMenu isOpen={isMobileMenuOpen} onButtonClick={handleHeaderBurgerClick} />
      </div>
    </CookieConsent>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerClassnames: PropTypes.string,
  homepage: PropTypes.bool,
};

Layout.defaultProps = {
  headerClassnames: null,
  homepage: false,
};

export default Layout;
