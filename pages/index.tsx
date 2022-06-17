import type { NextPage } from "next";
import { useState, SyntheticEvent } from "react";
import Input from "../component/Input";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { dataHandler } from "../data/dataHandler";
import { Movie } from "../model/Movie";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setSearchValue(input.value);
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const data = await dataHandler.getMoviesByName(searchValue);
    const movies: Movie[] = data.data.searchMovies;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Input
            value={searchValue}
            setValue={handleInputChange}
            label={"Find a movie..."}
            name="text"
          />
          <button type="submit">Find Movie</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
