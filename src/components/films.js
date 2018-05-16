import React, {Component} from 'react';

import Film from './film-row';
import Loader from './loader'

class Films extends Component {
    constructor() {
        super();
        this.state = {
            films: [],
            isLoaderVisible: false
        }
    }

    componentDidMount() {
        this.setState({isLoaderVisible: true});

        const url = 'http://localhost:3000/films';
        fetch(url)
            .then(response => {
                return response.text();
            })
            .then((data) => {
                this.setState({films: JSON.parse(data), isLoaderVisible: false});
            });
    }

    submitFile = (event) => {
        event.preventDefault();

        let file = document.getElementById('file').files[0];

        let formData = new FormData();

        formData.append('file', file);

        fetch('http://localhost:3000/upload/file', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
            .then(data => data.text().then((text) => {
                console.log(JSON.parse(text));
            }));
    };

    render() {
        return (
            <div className="form-container">
                <form className="form" onSubmit={this.submitFile}>
                <input id="file" type="file" name="file"/>
                <button type="submit">Send file</button>
                </form>
                <div className="films-container">
                    <div className="row-container">
                        <div className="row-container-row row-container-row--head">
                            <div className="row-container-cell film-name-cell column-heading">Title</div>
                            <div className="row-container-cell film-info-cell column-heading">Info</div>
                        </div>
                    </div>
                    {this.state.films.map((film, index) => {
                        return (
                            <Film key={index} film={film}/>
                        )
                    })}
                </div>
                {this.state.isLoaderVisible ? <Loader/> : null}
            </div>
        );
    }
}

export default Films;