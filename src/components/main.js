import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Films from './films-table/films';
import Redactor from './editor';

const Main = () => (
        <Switch>
            <Route exact path='/' component={Films}/>
            <Route path='/editor' component={Redactor}/>
        </Switch>
);

export default Main;