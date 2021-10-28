import * as React from 'react';

import classes from './styles/Modal.scss';

type overlayProps = {
    visible: boolean
}

const Overlay = ({ visible }: overlayProps) =>
    visible && (
        <div className={classes.overlay} />
    );

export default Overlay;