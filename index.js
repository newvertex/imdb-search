const omdb = require('omdb');

class Imdb {
  constructor() {
    this.movies = [];
    this.lastMovie = null;
  }

  search(name = '', year = '', type = '') {
    this.movies = [];

    let pattern = {
      terms: name,
      year: year,
      type: type
    };

    return new Promise((resolve, reject) => {
      omdb.search(pattern, (err, movies) => {
          if (err) {
            reject(err);
          }

          if (typeof movies === 'undefined' || !movies.length) {
            reject('Movie not found!');
          } else {
            for (let i = 0; i < movies.length; i += 1) {
              movies[i].id = i;
              this.movies.push(movies[i]);
            }

            resolve(this.movies);
          }
        });
    })
  }

  getImdb(id) {
    let imdb = this.movies.filter(movie => movie.id === id);

    if (imdb.length) {
      return imdb[0].imdb;
    }

    return 0;
  }

  get(id) {
    let imdb = '';

    if (typeof id === 'string' && id.startsWith('tt')) {
        imdb = id;
    } else {
      imdb = this.getImdb(parseInt(id));
    }

    let options = { fullPlot: true, tomatoes: true };

    return new Promise((resolve, reject) => {
      omdb.get({ imdb: imdb }, options, (err, movie) => {
          if (err) {
            reject(err);
          }

          if (typeof movie === 'undefined' || !movie) {
            reject('Movie not found!');
          } else {

            this.lastMovie = movie;

            resolve(movie);
          }
        });
    });
  }

}

module.exports = new Imdb();
