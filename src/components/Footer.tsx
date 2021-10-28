import * as React from 'react';

import classes from './styles/Footer.scss';

/**
 * Footer component showed in the app
 * @returns {React.ReactElement} Footer
 */
const Footer = () => (
  <footer className={classes.footer}>
    <span>Made with &#9829; in Melbourne.</span>
    <span>&copy; 2016 Broccoli &amp; Co. All rights reserved.</span>
  </footer>
)

export default Footer;