import * as React from 'react';

import classes from './styles/Modal.scss';

type overlayProps = {
  visible: boolean
}

/**
 * Simple dark overlay on the entire screen when a modal is visible
 * @param {object} overlayProps visible will be used to toggle the overlay
 * @returns {React.ReactElement} Overlay
 */
const Overlay = ({ visible }: overlayProps) =>
  visible && (
    <div className={classes.overlay} />
  );

export default Overlay;