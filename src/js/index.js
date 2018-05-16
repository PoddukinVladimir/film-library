import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

// importing styles
import '../css/style.css';

// importing assets
import addIcon from '../assets/add-icon.png';
import removeIcon from '../assets/remove-icon.png';

// importing js
import App from '../components/app';
import getMessage from './connection.test';

getMessage();

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));
// render(<Hello />, document.getElementById('app'));