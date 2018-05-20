import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import Film from './film-row';
import Loader from '../loader';
import SearchRow from './search-row';
import SortingPopup from './sorting-popup';

class Films extends Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
            films: [],
            updatedList: [],
            isLoaderVisible: false,
            searchPredicate: '',
            sortingOptionsShown: false,
            searchByActorsActive: false,
            sortingOrder: ''
        }
    }

    componentWillMount() {
        this.filmAddedSubscriber = PubSub.subscribe('filmAdded', this.addFilm);
        this.fileSubmittedSubscriber = PubSub.subscribe('fileSubmitted', this.submitFile);
        this.searchCriteriaChangedSubscriber = PubSub.subscribe('searchCriteriaChanged', this.toggleSearchByActors);
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
                    this.setState({updatedList: this.cloneObj(this.state.films)});
                }
            });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.filmAddedSubscriber);
        PubSub.unsubscribe(this.fileSubmittedSubscriber);
        PubSub.unsubscribe(this.searchCriteriaChangedSubscriber);

        // in case view changes before asynchronous fetch tasks are complete
        this.setState({isMounted: false});
    }

    toggleSearchByActors = () => {
        this.setState({searchByActorsActive: !this.state.searchByActorsActive});

        // in case search field is not empty
        this.filterFilmCollection();

        // in case sorting is enabled
        this.sortFilms(this.state.sortingOrder);
    };

    toggleSortingPanel = () => {
        this.setState({sortingOptionsShown: !this.state.sortingOptionsShown});
    };

    scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    cloneObj = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };


    addFilm = (event, film) => {
        this.state.films.push(film);

        // in case search field is not empty
        this.filterFilmCollection();

        // in case sorting is enabled
        this.sortFilms(this.state.sortingOrder);
    };

    deleteFilm = (id) => {
        const url = 'http://localhost:3000/films';

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

    submitFile = () => {
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

                this.setState({films: this.state.films.concat(JSON.parse(newFilms))});

                // in case search field is not empty
                this.filterFilmCollection();

                // in case sorting is enabled
                this.sortFilms(this.state.sortingOrder);

                this.setState({isLoaderVisible: false});
            }));
    };

    // is called whenever onChange event is triggered
    filterFilmCollection = (event) => {
        if (event) {
            event.preventDefault();
        }

        // if call wasn't initiated by onChange event, use state's value
        let searchPredicate = (event ? event.target.value : this.state.searchPredicate).toLowerCase();

        let updatedList = [];
        if (this.state.searchByActorsActive) {
            // in case actor's name is the search criteria
            updatedList = this.state.films.filter((film) => {
                return (film.actors.some((actor) => actor.toLowerCase().includes(searchPredicate)));
            });
        } else {
            // in case film title is the search criteria
            updatedList = this.state.films.filter((film) => {
                return film.title.toLowerCase().search(searchPredicate) !== -1;
            });
        }
        this.setState({updatedList: updatedList, searchPredicate: searchPredicate});
    };

    sortFilms = (sortingOrder) => {
        function sortAsc(a, b) {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;

            return 0;
        }

        function sortDesc(a, b) {
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;

            return 0;
        }

        if (sortingOrder === 'asc') {
            this.state.updatedList.sort(sortAsc);
            this.setState({updatedList: this.state.updatedList, sortingOrder: "asc"});
        } else if (sortingOrder === 'desc') {
            this.state.updatedList.sort(sortDesc);
            this.setState({updatedList: this.state.updatedList, sortingOrder: "desc"});
        } else {
            this.filterFilmCollection();
            this.setState({sortingOrder: ""});
        }
    };

    render() {
        return (
            <div className="loader-container">
                <div className="films-container">
                    <div className="row-container-row row-container-row--head">
                        <div className="row-container-cell row-container-cell--head">
                            <SortingPopup sortFilms={this.sortFilms}
                                          toggleSortingPanel={this.toggleSortingPanel}
                                          isShown={this.state.sortingOptionsShown}/>
                            <span className="head-title">Film Title</span>
                            {this.props.editorMode ?
                                <span className="head-title--right">Delete</span> :
                                <span className="head-title--right">Info</span>}
                        </div>
                    </div>
                    <SearchRow onChange={this.filterFilmCollection}
                               editorMode={this.props.editorMode}
                               searchByActorsActive={this.state.searchByActorsActive}/>
                    {this.state.updatedList.map((film, index) => {
                        return (
                            <Film editorMode={this.props.editorMode}
                                  key={index} film={film}
                                  deleteFilm={this.deleteFilm}/>)
                    })}
                </div>
                {this.state.isLoaderVisible ? <Loader/> : null}
            </div>
        );
    }
}

export default Films;