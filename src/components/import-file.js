import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import '../css/import-file.css';

class ImportFile extends Component {
    constructor() {
        super();
    }

    submitFile = (event) => {
        event.preventDefault();
        PubSub.publish('fileSubmitted');
    };

    render() {
        return (
            <form className="form" onSubmit={this.submitFile}>
                <input id="file" type="file" name="file"/>
                <div className="import-file-button">
                    <button className="button-editor button-editor--blue" type="submit">Import file</button>
                </div>
            </form>
        )
    }
}

export default ImportFile;