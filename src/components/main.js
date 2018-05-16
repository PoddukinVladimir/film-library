import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Films from './films';
import Loader from './loader';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Films}/>
            <Route path='/films' component={Loader}/>
        </Switch>
    </main>
);

export default Main