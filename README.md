<link href="./mdstyle.css" rel="stylesheet"></link>

# Movie Finder

## Description
Movie Finder is a frontend application to find movies by their title.
The app lists all the related movies on the page.
The app provides a detail page for movies, containing the following:
- a short description (from the related wiki page if available)
- an imdb link (if available via imdb api)
- a wiki link (if available via wiki api)
- a link to the related movies

<p align="center">
<img src="./app.png" alt="App" style="width: 200px" />
</p>

## Working app
[Click the link to visit the related webpage](https://movie-finde.herokuapp.com/)

## Technologies
The app was built with Next.js

## Tests
To run the tests: `npm run test`

## Next steps
- The app handles only the first 20 results, a pagination has to be implemented in the future
- The tests cover the cruical parts of the app, however the whole app is not covered with tests
- The UI was built with custom CSS, a library could be used in the future


