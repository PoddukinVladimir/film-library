import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

// importing styles
import '../css/style.css';

// fetch polyfill for IE11
import 'whatwg-fetch';
// promise polyfill for IE8+
import 'promise-polyfill/src/polyfill';
import './polyfills';

import App from '../components/app';

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));