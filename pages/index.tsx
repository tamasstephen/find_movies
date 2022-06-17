import type { NextPage } from "next";
import { useState, SyntheticEvent } from "react";
import Input from "../component/Input";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { dataHandler } from "../data/dataHandler";
import { Movie } from "../model/Movie";
import MovieCard from "../component/MovieCard";
import Header from "../component/Header";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedMovies, setSearchedMovies]: [Movie[], Function] = useState([]);

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setSearchValue(input.value);
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const data = await dataHandler.getMoviesByName(searchValue);
    const movies: Movie[] = data.data.searchMovies;
    setSearchedMovies((): Movie[] => [...movies]);
  }

  async function showMovieDetails(
    movieTitle: string
  ): Promise<{ content: string; wikiLink: string; imdbLink: string }> {
    const result = { content: "", wikiLink: "", imdbLink: "" };
    const pageDetails = await dataHandler.getWikiPage(movieTitle);
    const movieId: string = Object.keys(pageDetails.query.pages)[0];
    if (movieId === "-1") {
      return result;
    }

    if (pageDetails.query.pages[movieId].hasOwnProperty("extract")) {
      result.content = pageDetails.query.pages[movieId].extract;
    }

    result.wikiLink = `https://en.wikipedia.org/wiki/${movieTitle}`;

    const pageLinks = await dataHandler.getWikiPageLinks(movieTitle);
    const allLinks = pageLinks.query.pages[movieId].extlinks;
    if (!pageLinks.query.pages[movieId].hasOwnProperty("extlinks")) {
      return result;
    }
    const myLinkObj = allLinks.find((current: Object) =>
      Object.values(current)[0].includes("imdb.com/title")
    );
    if (!myLinkObj) {
      return result;
    }

    result.imdbLink = Object.values(myLinkObj)[0] as string;

    return result;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header text="Find your favourite movie" />
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input
            value={searchValue}
            setValue={handleInputChange}
            label={"Find a movie..."}
            name="text"
          />
          <button type="submit">Find Movie</button>
        </form>
        <div>
          {searchedMovies.map((movie: Movie) => (
            <MovieCard
              title={movie.name}
              imgUrl={movie.img?.url}
              overview={movie.overview}
              score={movie.score}
              key={+movie.id}
              fn={showMovieDetails}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
