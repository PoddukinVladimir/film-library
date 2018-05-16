import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from './main';
import Header from './header';

class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default App;