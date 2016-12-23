# imdb-search
A wrapper on omdb module to easy select correct wanted item with all info

## Example
```js
const imdb = require('imdb-search');

// Search for a Movie, result is an array of movies
imdb.search('Doctor Strange')
  .then(result => {
    for (let movie in result) {
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
      for (let movie in result) {
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
    console.log(`${movie.id}: ${movie.title} - ${movie.year}`);
  })
  .catch(err => {
    console.log(err);
  });

```
