const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

let fileName = '';

let parser = require('./parser.js');
let dataBase = require('./database');

let test = require('./json/test.json');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        fileName = file.originalname;
        callback(null, file.originalname);
    }
});

let upload = multer({storage: storage}).single('file');

app.use(cors());

app.get('/', (request, response) => {
    response.send("hello");
});

// getting all films from database
app.get('/films', (request, response) => {

    let films;
    let dataBaseInstance = new dataBase();
    let connection = dataBaseInstance.getConnection();

    connection
        .then((conn) => {
            connection = conn;
            return dataBaseInstance.executeQuery('SELECT id, title, year, format FROM film', connection);
        })
        .then((films) => {
            // populating array of films with actors for each film and getting promises
            let promises = dataBaseInstance.populateFilmsWithActors(films, dataBaseInstance, connection);

            promises.then(() => {
                    response.send(JSON.stringify(films));
                    connection.end();
                }
            );
        });
});

let jsonParser = bodyParser.json({type: 'application/json'});

// adding film to database
app.post('/film', jsonParser, (request, response) => {
    let film = request.body;

    // year value validation
    if (Number(film.year) !== Number(film.year)) {
        response.send('Year value type is int');
        throw 'Year value type is int';
    }

    let dataBaseInstance = new dataBase();

    // generating unique id for a new film
    let guid = new parser().getGuid();

    film.id = guid;

    let connection = dataBaseInstance.getConnection();

    connection.then((conn) => {
        connection = conn;

        let insert = `INSERT INTO film (id, title, year, format)`;
        let values = `VALUES ('${film.id}', '${film.title}', ${Number(film.year)}, '${film.format}')`;
        return dataBaseInstance.executeQuery(`${insert} ${values}`, connection);
    }).then(() => {
        let insertPromises = dataBaseInstance.insertActors(film, dataBaseInstance, connection);

        insertPromises.then(() => {
                response.send('Film has been inserted into database');
                connection.end();
            }
        );
    })

});

app.post('/upload/file', (request, response) => {
    upload(request, response, (err) => {
        if (err) {
            return response.end('Error uploading file');
        }

        let path = `./uploads/${fileName}`;

        fs.readFile(path, (err, f) => {
            let inputParser = new parser(f.toString());

            response.send(JSON.stringify(inputParser.getFilmsObj()));
        });
    });
});

app.delete('/', jsonParser, (request, response) => {
    let id = request.body.id;

    let dataBaseInstance = new dataBase();

    let connection = dataBaseInstance.getConnection();

    connection.then((conn) => {
        connection = conn;

        /* deleting all actors from actorfilm table since foreign key restriction
         won't allow deleting items from film table first
         */
        let deletePart = `DELETE FROM actorfilm`;
        let where = `WHERE filmId = '${id}'`;
        return dataBaseInstance.executeQuery(`${deletePart} ${where}`, connection);
    }).then(() => {
        /* now we can delete film from film table
         */
        let deletePart = `DELETE FROM film`;
        let where = `WHERE id = '${id}'`;
        return dataBaseInstance.executeQuery(`${deletePart} ${where}`, connection);
    }).then(() => {
        response.send('Film has been removed from database');
    })
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});