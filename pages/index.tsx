import type { NextPage } from "next";
import { useState, SyntheticEvent } from "react";
import Input from "../component/Input";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { dataHandler } from "../data/dataHandler";
import { Movie } from "../model/Movie";
import MovieCard from "../component/MovieCard";
import MovieDetail, {
  DetailState as DetailProps,
} from "../component/MovieDetail";
import Header from "../component/Header";
import Spinner from "../component/Spinner";
import { movieService } from "../service/movieService";
import Form from "../component/Form";

const Home: NextPage = () => {
  const [spinnerVisibility, setSpinnerVisibility] = useState("hideElement");
  const [searchValue, setSearchValue] = useState("");
  const [bodyScroll, setBodyHeight] = useState("");
  const [searchedMovies, setSearchedMovies]: [Movie[], Function] = useState([]);
  const [detailVisibility, setDetailVisibility] = useState("hideElement");
  const [detailsContent, setDetailsContent]: [DetailProps, Function] = useState(
    movieService.getMovieDetailsDefaultState()
  );

  function closeDetails() {
    setDetailsContent(movieService.getMovieDetailsDefaultState());
    allowBodyScroll();
    setDetailVisibility(() => {
      return "hideElement";
    });
  }

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setSearchValue(input.value);
  }

  async function handleSubmit(event: SyntheticEvent) {
    preventBodyScroll();
    showSpinner();
    event.preventDefault();
    if (searchValue.length > 1) {
      const data = await dataHandler.getMoviesByName(searchValue);
      const movies: Movie[] = data.data.searchMovies;
      setSearchedMovies((): Movie[] => [...movies]);
    }
    hideSpinner();
    allowBodyScroll();
  }

  async function getRecommendedMovies(movieId: string) {
    showSpinner();
    try {
      closeDetails();
      const data = await dataHandler.getRecommendedMovies(parseInt(movieId));
      const movies: Movie[] = data.data.movie.recommended;
      setSearchedMovies((): Movie[] => [...movies]);
    } catch (err) {
      console.log(err);
    }
    allowBodyScroll();
    hideSpinner();
  }

  function preventBodyScroll() {
    setBodyHeight(styles.noScroll);
  }

  function allowBodyScroll() {
    setBodyHeight("");
  }

  function showSpinner() {
    window.scrollTo(0, 0);
    setSpinnerVisibility("");
  }

  function hideSpinner() {
    setSpinnerVisibility("hideElement");
  }

  async function showMovieDetails(
    movieTitle: string,
    score: number,
    imageSrc: string,
    tmdbMovieId: number
  ) {
    showSpinner();
    preventBodyScroll();
    const newContent = await movieService.getMovieDetailsData(
      movieTitle,
      score,
      imageSrc,
      tmdbMovieId,
      detailsContent
    );
    setDetailsContent(newContent);
    setDetailVisibility("");
    hideSpinner();
  }

  return (
    <div className={`${bodyScroll}`}>
      <Head>
        <title>MovieFinder</title>
        <meta name="description" content="Find your favourite movie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MovieDetail
        info={detailsContent.info}
        title={detailsContent.title}
        imgSrc={detailsContent.imgSrc}
        score={detailsContent.score}
        closeDetails={closeDetails}
        visibility={detailVisibility}
        getRecommendedMovies={getRecommendedMovies}
      />
      <Spinner spinnerVisibility={spinnerVisibility} />
      <main className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.container}>
            <Header
              firstLine="Find your "
              secondLine="favourite"
              colourText=" movies"
            />
            <Form handleSubmit={handleSubmit}>
              <Input
                value={searchValue}
                setValue={handleInputChange}
                label={"Find a movie..."}
                name="text"
              />
              <button type="submit">Find Movie</button>
            </Form>
          </div>
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.cardContainer}>
            {searchedMovies.map((movie: Movie) => (
              <MovieCard
                title={movie.name}
                imgUrl={movie.img?.url}
                overview={movie.overview}
                score={movie.score}
                key={+movie.id}
                movieId={+movie.id}
                genres={movie.genres}
                fn={showMovieDetails}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
