import * as React from "react";
import { hot } from 'react-hot-loader';

import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

import classes from './App.scss';

const App = () => {
    return (
        <article className={classes.app}>
            <Header />
            <MainContent />
            <Footer />
        </article>
    );
};

export default hot(module)(App);