import { DetailState as DetailProps } from "../component/MovieDetail";
import { dataHandler } from "../data/dataHandler";
import { util } from "../utils/util";

interface imdbMovieList {
  results: { id: string; image: string; title: string }[];
}

interface Result {
  content: string;
  wikiLink: string;
  imdbLink: string;
  id: number;
}

export const movieService = {
  async getMovieDetailsData(
    movieTitle: string,
    score: number,
    imageSrc: string,
    tmdbMovieId: number,
    detailsContent: DetailProps
  ): Promise<DetailProps> {
    const mov = await this.getOptionalWikiPagesByMovieTitle(movieTitle);
    const result: Result = {
      content: "",
      wikiLink: "",
      imdbLink: "",
      id: tmdbMovieId,
    };
    const imdbLinkEndpoint: imdbMovieList = await dataHandler.getImdbMovies(
      movieTitle
    );
    const wikiTitle = mov.title !== undefined ? mov.title : movieTitle;
    const pageDetails = await dataHandler.getWikiPage(wikiTitle);
    const movieId: string = Object.keys(pageDetails.query.pages)[0];
    const hasWikiPage = movieId !== "-1";
    if (hasWikiPage) {
      if (pageDetails.query.pages[movieId].hasOwnProperty("extract")) {
        result.content = pageDetails.query.pages[movieId].extract;
      }
      result.wikiLink = `https://en.wikipedia.org/wiki/${wikiTitle}`;
    }
    const resultHasImdbLink = this.isImdbLinkSetViaImdb(
      imdbLinkEndpoint,
      result
    );
    if (!resultHasImdbLink && hasWikiPage) {
      await this.getFallBackImdbLink(wikiTitle, result, movieId);
    }
    return {
      ...detailsContent,
      info: { ...result },
      title: movieTitle,
      imgSrc: imageSrc,
      score: score,
    };
  },

  isImdbLinkSetViaImdb(
    imdbResult: imdbMovieList,
    detailResult: Result
  ): boolean {
    const hasImdbLink = imdbResult.results !== null;
    if (hasImdbLink) {
      detailResult.imdbLink = `https://www.imdb.com/title/${imdbResult.results[0].id}/`;
    }
    return hasImdbLink;
  },

  getMovieDetailsDefaultState(): DetailProps {
    const defaultDetailState: DetailProps = {
      info: { content: "", wikiLink: "", imdbLink: "", id: 0 },
      title: "",
      imgSrc: "",
      score: 0,
    };
    return Object.create(defaultDetailState);
  },

  async getOptionalWikiPagesByMovieTitle(
    movieTitle: string
  ): Promise<{ title: string }> {
    const optionalPages = await dataHandler.getWikiPagesByName(movieTitle);
    if (optionalPages.query.prefixsearch.length < 1) {
      return { title: movieTitle };
    }
    const movie = await this.findRightMovie(
      movieTitle,
      optionalPages.query.prefixsearch
    );
    return movie;
  },

  async findRightMovie(
    movieTitle: string,
    movies: { ns: number; title: string; pageid: number }[]
  ): Promise<{ ns: number; title: string; pageid: number }> {
    const escapedTitle = util.escapeTitle(movieTitle);
    for (const movie of movies) {
      const escapedListTitle = util
        .escapeTitle(movie.title)
        .replace(escapedTitle, "")
        .trim();
      if (
        escapedListTitle === "" ||
        escapedListTitle.toLocaleLowerCase() === "film"
      ) {
        const data = await dataHandler.getCategoriesForMovie(movie.pageid);
        const categories = data.query.pages[movie.pageid].categories;
        if (categories) {
          //TODO: extract to fnc
          const isFilm: { ns: number; title: string } | undefined =
            categories.find((category: { ns: number; title: string }) =>
              category.title.includes("film")
            );
          if (isFilm) {
            return movie;
          }
          // --- end
        } else {
          return movie;
        }
      }
    }
    return movies[0];
  },

  async getFallBackImdbLink(
    wikiTitle: string,
    result: Result,
    movieId: string
  ) {
    const pageLinks = await dataHandler.getWikiPageLinks(wikiTitle);
    const allLinks = pageLinks.query.pages[movieId].extlinks;
    if (pageLinks.query.pages[movieId].hasOwnProperty("extlinks")) {
      const myLinkObj = allLinks.find((current: Object) =>
        Object.values(current)[0].includes("imdb.com/title")
      );
      if (myLinkObj) {
        result.imdbLink = Object.values(myLinkObj)[0] as string;
      }
    }
  },
};
