import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Films from './films-table/films';
import Editor from './editor';

const Main = () => (
        <Switch>
            <Route exact path='/' component={Films}/>
            <Route path='/editor' component={Editor}/>
        </Switch>
);

export default Main;