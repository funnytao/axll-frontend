import * as React from "react";

import classes from './styles/Header.scss';

/**
 * Header component showed in the app
 * @returns {React.ReactElement} Header
 */
const Header = () => (
  <nav className={classes.header}>
    BROCCOLI &amp; CO.
  </nav>
);

export default Header;