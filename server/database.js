let mysql = require('promise-mysql');
let parser = require('./parser.js');

class DataBase {
    constructor() {

    }

    getConnection() {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'filmlibrary'
        });
        return connection;
    }

    executeQuery(query, connection) {
        return connection.query(query);
    }

    populateFilmsWithActors(films, db, connection) {

        let select = 'SELECT name, filmId';
        let from = 'FROM film, actorfilm';
        let where = 'WHERE film.id = actorfilm.filmId AND film.id =';

        let populateFilmWithActors = function (film) {
            return new Promise((resolve) => {
                film.actors = [];
                db.executeQuery(`${select} ${from} ${where}'${film.id}'`, connection)
                    .then((actors) => {
                        actors.forEach((actor) => {
                            film.actors.push(actor.name);
                        });
                        resolve();
                    });
            })
        };

        let actions = films.map(populateFilmWithActors);

        // we now have a promises array and we want to wait for it
        return Promise.all(actions);
    }

    insertActors(film, db, connection) {
        let enqueeActorsInsertion = function (actor) {
            return new Promise((resolve) => {
                    let insert = `INSERT INTO actorfilm (filmId, name)`;
                    let values = `VALUES ('${film.id}', '${actor}')`;
                    db.executeQuery(`${insert} ${values}`, connection).then(() => {
                        resolve();
                    })
            })
        };

        let actions = film.actors.map(enqueeActorsInsertion);

        return Promise.all(actions);
    }

    insertFilms(films, db, connection) {
        let enqueeFilmsInsertion = function (film) {
            film.id = new parser().getGuid();
            return new Promise((resolve) => {
                let insert = `INSERT INTO film (id, title, year, format)`;
                let values = `VALUES ('${film.id}', '${film.title}', ${Number(film.year)}, '${film.format}')`;
                db.executeQuery(`${insert} ${values}`, connection).then(() => {
                    db.insertActors(film, db, connection)
                        .then(() => {
                            resolve();
                        })
                    });
            })
        };

        let actions = films.map(enqueeFilmsInsertion);

        return Promise.all(actions);
    }
}

module.exports = DataBase;