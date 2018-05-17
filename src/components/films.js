import React, {Component} from 'react';

import Film from './film-row';
import Loader from './loader'

class Films extends Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
            films: [],
            updatedList: [],
            isLoaderVisible: false
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
                    this.setState({updatedList: this.state.films});
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
                this.setState({
                    updatedList: this.state.films
                });
                // alert(res);
            });
        });
    };

    addFilm = (film) => {
        this.setState({
            films: this.state.films.push(film)
        });
        this.setState({
            updatedList: this.state.films
        })
    };

    submitFile = (event) => {
        event.preventDefault();

        this.setState({isLoaderVisible: true});

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
            .then(data => data.text().then((newFilms) => {
                this.setState({films: this.state.films.concat(JSON.parse(newFilms))});
                this.setState({updatedList: this.state.films});

                this.setState({isLoaderVisible: false});
            }));
    };

    submitFileFormHTML = () => {
        return (
            <form className="form" onSubmit={this.submitFile}>
                <input id="file" type="file" name="file"/>
                <button type="submit">Send file</button>
            </form>
        )
    };

    filterFilmCollection = (event) => {
        event.preventDefault();
        let updatedList = this.state.films.filter((film) => {
            return film.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({updatedList: updatedList});
    };

    searchRowHTML = () => {
        return (
            <div className="row-container">
                <div className="row-container-row">
                    <input id="row-container-row-search" onChange={this.filterFilmCollection}
                           placeholder="Search..." type="text"/>
                    <div className="row-container-cell--content">
                        <a href="#">
                            <i title="Search by actor name" className="ion-android-contacts"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className="loader-container">
                {this.props.redactorMode ? this.submitFileFormHTML() : null}
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
                    {this.searchRowHTML()}
                    {this.state.updatedList.map((film, index) => {
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