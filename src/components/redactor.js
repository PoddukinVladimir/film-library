import React, {Component} from 'react';

import Films from './films';
import AddFilm from './add-film';

class Redactor extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="form-container">
                <AddFilm/>
                <Films redactorMode={true}/>
            </div>
        )
    }
}

export default Redactor;