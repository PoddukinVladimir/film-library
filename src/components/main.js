import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Films from './films';
import Redactor from './redactor';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Films}/>
            <Route path='/redactor' component={Redactor}/>
        </Switch>
    </main>
);

export default Main