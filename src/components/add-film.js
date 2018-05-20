import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import '../css/form.css';

class AddFilm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            year: '',
            format: '',
            actors: ''
        }
    }

    submitNewFilm = (event) => {
        event.preventDefault();

        let film = this.formFilmObjectUsingUserInput();

        if (!this.isFilmInputValid(film)) return;

        fetch('http://localhost:3000/film', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(film)
        }).then((response) => {
            response.text().then((film) => {
                this.clearValues();
                PubSub.publish('filmAdded', JSON.parse(film));
            })
        })

    };

    isFilmInputValid = (film) => {
        // Check if year value casting doesn't result in a NaN
        if (Number(film.year) !== Number(film.year)) {
            alert('Release year value type is int');
            document.getElementById('fyear').focus();
            return false;
        }

        return true;
    };

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    clearValues() {
        this.setState({title: '', year: '', format: '', actors: ''});
    }

    formFilmObjectUsingUserInput = () => {
        let film = {};
        film.title = this.state.title;
        film.year = this.state.year;
        film.format = this.state.format;
        film.actors = this.state.actors.split(',');

        return film;
    };

    render() {
        return (
            <div className="add-film-form-container">
                <form onSubmit={this.submitNewFilm} className="add-film-form">
                    <p className="add-film-title">Add new film</p>
                    <div className="form-container">
                        <label htmlFor="ftitle">Title</label>
                        <input type="text" className="add-film-form-input"
                               onChange={this.onChangeHandler} maxLength={50}
                               id="ftitle" value={this.state.title} name="title"
                               placeholder="Title.." required/>

                        <label htmlFor="fyear">Release year</label>
                        <input type="text" className="add-film-form-input"
                               onChange={this.onChangeHandler} maxLength={4}
                               id="fyear" value={this.state.year} name="year" placeholder="Year.." required/>

                        <label htmlFor="fformat">Format</label>
                        <input type="text" className="add-film-form-input"
                               onChange={this.onChangeHandler} maxLength={10}
                               id="fformat" name="format" value={this.state.format}
                               placeholder="Format.." required/>

                        <label htmlFor="actors">Actors
                            <span className="additional-info-title"> (separate actors using ' , ' )</span></label>
                        <textarea name="actors" className="add-film-form-textarea"
                                  onChange={this.onChangeHandler} id="actors"
                                  value={this.state.actors} cols="30" rows="10" required/>

                        <button className="button-redactor button-redactor--green" type="submit">Add</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFilm;