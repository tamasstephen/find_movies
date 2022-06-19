import Home from "../pages/index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { movieService } from "../service/movieService";

global.scrollTo = jest.fn();
global.fetch = jest.fn(
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<any> => {
    const myInput = input as string;
    if (myInput.includes("https://tmdb.sandbox.zoosh.ie/dev/graphql")) {
      return Promise.resolve({
        status: 200,
        json: () => {
          return {
            data: {
              searchMovies: [
                {
                  id: "123",
                  name: "Test",
                  overview: "Test",
                  score: 5,
                  img: { url: "myUrl" },
                },
                {
                  id: "124",
                  name: "Test",
                  overview: "Test",
                  score: 5,
                  img: { url: "myUrl" },
                },
              ],
            },
          };
        },
      });
    }
    return Promise.resolve({ data: { data: { searchMovies: [] } } });
  }
);

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
    expect(newElements).not.toBeNull();
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
    setTimeout(() => expect(detailsPage).not.toHaveClass("hideElement"));
  });
});
