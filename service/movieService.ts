import { Props as DetailProps } from "../component/MovieDetail";
import { dataHandler } from "../data/dataHandler";

export const movieService = {
  async getMovieDetailsData(
    movieTitle: string,
    score: number,
    imageSrc: string,
    tmdbMovieId: number,
    detailsContent: DetailProps
  ): Promise<DetailProps> {
    const result = { content: "", wikiLink: "", imdbLink: "", id: tmdbMovieId };
    const pageDetails = await dataHandler.getWikiPage(movieTitle);
    const movieId: string = Object.keys(pageDetails.query.pages)[0];
    if (movieId !== "-1") {
      if (pageDetails.query.pages[movieId].hasOwnProperty("extract")) {
        result.content = pageDetails.query.pages[movieId].extract;
      }
      result.wikiLink = `https://en.wikipedia.org/wiki/${movieTitle}`;
      const pageLinks = await dataHandler.getWikiPageLinks(movieTitle);
      const allLinks = pageLinks.query.pages[movieId].extlinks;
      if (pageLinks.query.pages[movieId].hasOwnProperty("extlinks")) {
        const myLinkObj = allLinks.find((current: Object) =>
          Object.values(current)[0].includes("imdb.com/title")
        );
        if (myLinkObj) {
          result.imdbLink = Object.values(myLinkObj)[0] as string;
        }
      }
    }
    return {
      ...detailsContent,
      info: { ...result },
      title: movieTitle,
      imgSrc: imageSrc,
      score: score,
    };
  },
};
