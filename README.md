# Movie Finder

## Description
Frontend application to find movies by the movie title.
The app lists all the related movies on the page.
Clicking the movie title the following appear on the screen:
- short description (from the related wiki page if available)
- imdb link (if available via imdb api)
- wiki link (if available via wiki api)
- a link to query the related movies

## Working app
[Click the link to visit the related webpage](https://movie-finde.herokuapp.com/)

## Technologies
The app was built  with Next.js

## Tests
To run the tests: `npm run test`

## Next steps
- The app handles only the first 20 results, a pagination has to be implemented in the future
- The tests cover the cruical parts of the app, however the whole app is not covered with tests
- The UI was built with custom CSS, a library could be used in the future


