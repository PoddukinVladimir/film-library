import React, {Component} from 'react';

import Films from './films-table/films';
import AddFilm from './add-film';
import ImportFile from './import-file';

class Redactor extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="form-container">
                <AddFilm/>
                <Films redactorMode={true}/>
                <ImportFile/>
            </div>
        )
    }
}

export default Redactor;