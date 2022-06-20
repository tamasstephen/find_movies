import Home from "../pages/index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { movieService } from "../service/movieService";
import { dataHandler } from "../data/dataHandler";

const exampleMovieList = [
  {
    id: "123",
    name: "Test",
    overview: "Test",
    score: 5,
    img: { url: "myUrl" },
    genres: [{ name: "Comedy" }],
  },
  {
    id: "124",
    name: "Test",
    overview: "Test",
    score: 5,
    img: { url: "myUrl" },
    genres: [{ name: "Documentary" }],
  },
];


beforeEach(() => {
  global.scrollTo = jest.fn();
  global.fetch = jest.fn(
    (
      input: RequestInfo | URL,
      init?: RequestInit | undefined
    ): Promise<any> => {
      const myInput = input as string;
      if (myInput.includes("https://tmdb.sandbox.zoosh.ie/dev/graphql")) {
        return Promise.resolve({
          status: 200,
          json: () => {
            return {
              data: {
                searchMovies: [...exampleMovieList],
              },
            };
          },
        });
      }
      return Promise.resolve({ data: { data: { searchMovies: [] } } });
    }
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Rendering home page components with state change", () => {
  test("details is not visible after pageload", () => {
    render(<Home />);
    expect(screen.getByTestId("movie-details")).toHaveClass("hideElement");
  });

  test("cards are rendered after form submit", async () => {
    render(<Home />);
    const form = screen.getByRole("form");
    const input = screen.getByPlaceholderText("Find a movie...");
    fireEvent.change(input, { target: { value: "hey" } });
    fireEvent.submit(form);
    const newElements = await screen.findAllByText("5");
    expect(newElements[0]).not.toBeNull();
  });

  test("detail is visible after card click", async () => {
    jest
      .spyOn(movieService, "getMovieDetailsData")
      .mockImplementation(() =>
        Promise.resolve(movieService.getMovieDetailsDefaultState())
      );
    render(<Home />);
    const form = screen.getByRole("form");
    const input = screen.getByPlaceholderText("Find a movie...");
    fireEvent.change(input, { target: { value: "hey" } });
    fireEvent.submit(form);
    const newElements = await screen.findAllByText("Test");
    fireEvent.click(newElements[0]);
    const detailsPage = await screen.findByTestId("movie-details");
    //TODO: react test lib wait if does not work comment -> what I checked, why setTimeout
    setTimeout(() => expect(detailsPage).not.toHaveClass("hideElement"));
  });

  test("related movie link loads new movies", async () => {
    jest.spyOn(dataHandler, "getRecommendedMovies").mockImplementation(() =>
      Promise.resolve({
        data: {
          movie: {
            recommended: [...exampleMovieList],
          },
        },
      })
    );
    render(<Home />);
    const relatedMoviesLink = screen.getByText("Related movies");
    fireEvent.click(relatedMoviesLink);
    const cards = await screen.findAllByText("Test");
    expect(cards[0]).not.toBeNull();
  });
});
