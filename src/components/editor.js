import React, {Component} from 'react';

import Films from './films-table/films';
import AddFilm from './add-film';
import ImportFile from './import-file';

class Editor extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="form-container">
                <AddFilm/>
                <Films editorMode={true}/>
                <ImportFile/>
            </div>
        )
    }
}

export default Editor;