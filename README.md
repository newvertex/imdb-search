# imdb-search
[![NPM](https://nodei.co/npm/imdb-search.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/imdb-search/)  

A wrapper on omdb module to easy select correct wanted item with all info  
Use ES6 Promise for search and get a title info.

## Installation
with npm:
```bash
$ npm install --save imdb-search    

```
or with yarn:  
```bash
$ yarn add imdb-search
```
## Example
```js
const imdb = require('imdb-search');

// Search for a Movie, result is an array of movies
imdb.search('Doctor Strange')
  .then(result => {
    for (let movie of result) {
      console.log(`${movie.id}: ${movie.title} - ${movie.year}`);
    }
  })
  .catch(err => {
    console.log(err);
  });

// We can pass year and type as optional args to get right result
// Because of omdb dependency movies can have this types: `series, movie, episode`
imdb.search('Doctor Strange', 2016, 'movie')
    .then(result => {
      for (let movie of result) {
        console.log(`${movie.id}: ${movie.title} - ${movie.year}`);
      }
    })
    .catch(err => {
      console.log(err);
    });

// We can select item number in returned result
imdb.search('Doctor Strange', 2016, 'movie')
  .then(result => {
    return imdb.get(0); // Select first movie on the list
  })
  .then(movie => {
    console.log(`${movie.title} - ${movie.year}`);
  })
  .catch(err => {
    console.log(err);
  });


// Get a movie with imdb id
imdb.get('tt1211837')
  .then((movie) => {
    console.log(`${movie.title} - ${movie.year}`);
  })
  .catch((err) => {
    console.log(err);
  });
```
## Methods

### `search(name[, year, type])`
Use this method to search on imdb with name, you can pass year and type as optional arguments.  
Search method return an array of movies.  

**Note:** Each item of search array have one field named`id`(internal id), use this id to get more info.

### `get(id)`
Use this method to get a movie from the list of movies on the last search  

**Note:** `id` value can be an internal id or imdb specific id.
