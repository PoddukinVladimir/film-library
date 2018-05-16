import React, {Component} from 'react';

import '../css/form.css';

class AddFilm extends Component {
    constructor() {
        super();
    }

    submitNewFilm = (event) => {
        event.preventDefault();

        let film = this.formFilmObjectUsingUserInput();

        fetch('http://localhost:3000/film', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(film)
        }).then((response) => {
            response.text().then((res) => {
                this.clearValues();
                alert(res);
            })
        });

    };

    clearValues() {
        document.getElementById('ftitle').value = '';
        document.getElementById('fyear').value = '';
        document.getElementById('fformat').value = '';
        document.getElementById('actors').value = '';
    }

    formFilmObjectUsingUserInput= () => {
        let film = {};
        film.title = document.getElementById('ftitle').value;
        film.year = document.getElementById('fyear').value;
        film.format = document.getElementById('fformat').value;
        film.actors = document.getElementById('actors').value.split(',');

        return film;
    };

    render() {
        return (
            <div className="add-film-form-container">
                <p className="add-film-title">Add new film</p>
                <form onSubmit={this.submitNewFilm} className="add-film-form">
                    <label htmlFor="ftitle">Title</label>
                    <input type="text" maxLength={50} id="ftitle" name="title" placeholder="Title.." required/>

                    <label htmlFor="fyear">Release year</label>
                    <input type="text" maxLength={4} id="fyear" name="year" placeholder="Year.." required/>

                    <label htmlFor="fformat">Format</label>
                    <input type="text" maxLength={10} id="fformat" name="format" placeholder="Format.." required/>

                    <label htmlFor="actors">Actors <span className="additional-info-title">(separate actors using ',')</span></label>
                    <textarea name="actors" id="actors" cols="30" rows="10" required/>

                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddFilm;