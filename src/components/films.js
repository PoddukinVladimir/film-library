import React, {Component} from 'react';

import Film from './film-row';
import Loader from './loader'

class Films extends Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
            films: [],
            isLoaderVisible: false,
        }
    }

    componentDidMount() {
        this.setState({isMounted: true});
        this.setState({isLoaderVisible: true});

        const url = 'http://localhost:3000/films';
        fetch(url)
            .then(response => {
                return response.text();
            })
            .then((data) => {
                if (this.state.isMounted) {
                    this.setState({films: JSON.parse(data), isLoaderVisible: false});
                }
            });
    }

    componentWillUnmount() {
        // in case view changes before asynchronous fetch tasks are complete
        this.setState({isMounted: true});
    }

    deleteFilm = (id) => {
        const url = 'http://localhost:3000/';

        fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then((response) => {
            response.text().then((res) => {
                // removing film from view so the changes apply without retrieving from database
                this.setState({
                    films: this.state.films.filter((film) => {
                        return film.id !== id;
                    })
                });
                alert(res);
            });
        });
    };

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

    submitFileForm = () => {
        return (
            <form className="form" onSubmit={this.submitFile}>
                <input id="file" type="file" name="file"/>
                <button type="submit">Send file</button>
            </form>
        )
    }

    render() {
        return (
            <div className="loader-container">
                {this.props.redactorMode ? this.submitFileForm() : null}
                <div className="films-container">
                    <div className="row-container">
                        <div className="row-container-row row-container-row--head">
                            <div className="row-container-cell row-container-cell--content film-name-cell">
                                <span>Title</span>
                            </div>
                            <div className="row-container-cell film-info-cell">
                                {this.props.redactorMode ? <span>Delete</span> : <span>Info</span>}
                            </div>
                        </div>
                    </div>
                    {this.state.films.map((film, index) => {
                        return (
                            <Film redactorMode={this.props.redactorMode}
                                  key={index} film={film}
                                  deleteFilm={this.deleteFilm}/>
                        )
                    })}
                </div>
                {this.state.isLoaderVisible ? <Loader/> : null}
            </div>
        );
    }
}

export default Films;