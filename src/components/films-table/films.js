import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import Film from './film-row';
import Loader from '../loader';
import SearchRow from './search-row';

class Films extends Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
            films: [],
            updatedList: [],
            isLoaderVisible: false,
            searchPredicate: ''
        }
    }

    componentWillMount() {
        this.token = PubSub.subscribe('filmAdded', this.addFilm);
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
        PubSub.unsubscribe(this.token);
        // in case view changes before asynchronous fetch tasks are complete
        this.setState({isMounted: true});
    }

    addFilm = (event, film) => {
        this.state.films.push(film);

        let updatedList = this.state.films;

        // in case search field is not empty
        if (this.state.searchPredicate) {
            updatedList = this.filterCollectionAfterChanges();
        }

        this.setState({films: this.state.films});
        this.setState({updatedList: updatedList});
    };

    // filters collection if search field was not empty when collection changed
    filterCollectionAfterChanges() {
        return this.state.films.filter((film) => {
            return film.title.toLowerCase().search(this.state.searchPredicate.toLowerCase()) !== -1;
        });
    }

    deleteFilm = (id) => {
        const url = 'http://localhost:3000/';

        fetch(url, {
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
                    updatedList: this.state.updatedList.filter((film) => {
                        return film.id !== id;
                    })
                });
            });
        });
    };

    scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    submitFile = (event) => {
        event.preventDefault();

        // show loader
        this.setState({isLoaderVisible: true});

        this.scrollToBottom();

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
                // TODO
                console.log(JSON.parse(newFilms));

                this.setState({films: this.state.films.concat(JSON.parse(newFilms))});


                let updatedList = this.state.films;

                // in case search field is not empty
                if (this.state.searchPredicate) {
                    updatedList = this.filterCollectionAfterChanges();
                }

                this.setState({updatedList: updatedList});

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
        this.setState({updatedList: updatedList, searchPredicate: event.target.value});
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
                    <SearchRow onChange={this.filterFilmCollection}/>
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