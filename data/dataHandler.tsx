export const dataHandler = {
  async getMoviesByName(movieTitle: string) {
    const data = await fetch("https://tmdb.sandbox.zoosh.ie/dev/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                query SearchMovies($name: String!) {
                    searchMovies(query: $name) {
                    id
                    name
                    overview
                    releaseDate
                    score
                    img: poster {
                        url: custom(size: "w185_and_h278_bestv2")
                    }
                    }
                }
            `,
        variables: {
          name: `${movieTitle}`,
        },
      }),
    });
    if (data.status === 200) {
      return data.json();
    }
    return null;
  },
};
