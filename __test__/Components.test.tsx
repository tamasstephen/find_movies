import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../component/Header";
import Form from "../component/Form";
import Input from "../component/Input";
import MovieCard from "../component/MovieCard";
import MovieDetail from "../component/MovieDetail";

test("header should be visible", () => {
  render(<Header firstLine="Test" secondLine="test" colourText="third" />);
  const myNode = document.querySelector("h1");

  expect(myNode).toBeVisible();
});

test("form should fire handleSubmit fnc", () => {
  const dummySubmit = jest.fn();
  const dummyInputChangeHandler = jest.fn();
  const { getByRole } = render(
    <Form handleSubmit={dummySubmit}>
      <Input
        value={"testValue"}
        setValue={dummyInputChangeHandler}
        label={"Find a movie..."}
        name="text"
      />
      <button type="submit">Find Movie</button>
    </Form>
  );

  fireEvent.submit(getByRole("form"));

  expect(dummySubmit).toHaveBeenCalledTimes(1);
});

test("input should fire state changer fnc", () => {
  const argText = "Find a movie...";
  const dummyInputChangeHandler = jest.fn();

  const { getByPlaceholderText } = render(
    <Input
      value={"testValue"}
      setValue={dummyInputChangeHandler}
      label={argText}
      name="text"
    />
  );

  const input = getByPlaceholderText(argText);

  fireEvent.change(input, { target: { value: "hey" } });

  expect(dummyInputChangeHandler).toBeCalled();
});

test("moviecard title fires the detail open fnc", () => {
  const showDetails = jest.fn();
  const testTitle = "Test";
  const { getByText } = render(
    <MovieCard
      title={testTitle}
      imgUrl={"test"}
      overview={"test"}
      score={10}
      key={1}
      movieId={1}
      fn={showDetails}
    />
  );
  const myLink = getByText(testTitle);

  fireEvent.click(myLink);

  expect(showDetails).toBeCalled();
});

test("movie details screen should call close fnc", () => {
  const closeDetails = jest.fn();
  const getRecommendedMovies = jest.fn();
  const testValue = "placeholder";
  const testObj = { content: "", wikiLink: "", imdbLink: "", id: 0 };
  const { getByText } = render(
    <MovieDetail
      info={testObj}
      title={testValue}
      imgSrc={testValue}
      score={0}
      closeDetails={closeDetails}
      visibility={testValue}
      getRecommendedMovies={getRecommendedMovies}
    />
  );

  const close = getByText("Close");

  fireEvent.click(close);

  expect(closeDetails).toBeCalled();
});

test("movie Details imdb link should be visible", () => {
  const closeDetails = jest.fn();
  const getRecommendedMovies = jest.fn();
  const testValue = "placeholder";
  const testObj = {
    content: "myContent",
    wikiLink: "",
    imdbLink: "hey",
    id: 0,
  };
  const { getByText } = render(
    <MovieDetail
      info={testObj}
      title={testValue}
      imgSrc={testValue}
      score={0}
      closeDetails={closeDetails}
      visibility={testValue}
      getRecommendedMovies={getRecommendedMovies}
    />
  );

  const imdb = getByText("Imdb");

  expect(imdb).toBeVisible();
});

test("movie Details wiki link should be visible", () => {
  const closeDetails = jest.fn();
  const getRecommendedMovies = jest.fn();
  const testValue = "placeholder";
  const testObj = {
    content: "myContent",
    wikiLink: "hey",
    imdbLink: "",
    id: 0,
  };
  const { getByText } = render(
    <MovieDetail
      info={testObj}
      title={testValue}
      imgSrc={testValue}
      score={0}
      closeDetails={closeDetails}
      visibility={testValue}
      getRecommendedMovies={getRecommendedMovies}
    />
  );

  const wiki = getByText("Wikipedia");

  expect(wiki).toBeVisible();
});

test("movie Details should trigger recommended movie fetch", () => {
  const closeDetails = jest.fn();
  const getRecommendedMovies = jest.fn();
  const testValue = "placeholder";
  const testObj = { content: "myContent", wikiLink: "", imdbLink: "ho", id: 0 };
  const { getByText } = render(
    <MovieDetail
      info={testObj}
      title={testValue}
      imgSrc={testValue}
      score={0}
      closeDetails={closeDetails}
      visibility={testValue}
      getRecommendedMovies={getRecommendedMovies}
    />
  );

  const myLink = getByText("Related movies");

  fireEvent.click(myLink);

  expect(getRecommendedMovies).toBeCalled();
});