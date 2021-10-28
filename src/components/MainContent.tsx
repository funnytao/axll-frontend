import * as React from 'react';
import { useState } from 'react';

import RequestModal from './RequestModal';

import classes from './styles/MainContent.scss';

const MainContent = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <article className={classes.wrapper}>
                <h1 className={classes.header}>A better way<br />to enjoy every day.</h1>
                <p>Be the first to know when we launch.</p>
                <button className={classes.button} onClick={() => setModalVisible(true)}>Request an invite</button>
                <RequestModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            </article>
            <div className={classes.bgImage} />
        </>
    );
}

export default MainContent;