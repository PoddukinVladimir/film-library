let mysql = require('promise-mysql');

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

        // map over forEach since it returns
        let actions = films.map(populateFilmWithActors);

        // we now have a promises array and we want to wait for it
        return Promise.all(actions);
    }
}

module.exports = DataBase;