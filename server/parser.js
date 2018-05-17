class Parser {

    constructor(input) {
        this.input = input;
    }

    getGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    cloneObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    getFilmsObj() {
        let films = [];
        let filmInfo = {};

        let lines = this.input.split('\n');

        for (let i = 0; i < lines.length; i++) {

            let line = lines[i].split(':');

            switch (line[0].trim()) {
                case 'Title':
                    filmInfo.title = line[1].trim();
                    break;
                case 'Release Year':
                    filmInfo.year = line[1].trim();
                    break;
                case 'Format':
                    filmInfo.format = line[1].trim();
                    break;
                case 'Stars':
                    let stars = line[1].split(',');
                    filmInfo.actors = [];

                    stars.forEach((star) => {
                        filmInfo.actors.push(star.trim());
                    });
                    break;
                default:
                    if (this.isEmpty(filmInfo)) {
                        break;
                    }
                    filmInfo.id = this.getGuid();

                    let info = this.cloneObj(filmInfo);
                    films.push(info);

                    filmInfo = {};
            }
        }
        return films;
    }
}

module.exports = Parser;