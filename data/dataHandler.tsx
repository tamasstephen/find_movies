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

  async getWikiPage(movieTitle: string) {
    return await this.apiGet(
      `prop=extracts&exchars=1000&explaintext&titles=${movieTitle}`
    );
  },

  async getWikiPageLinks(movieTitle: string) {
    return await this.apiGet(`&prop=extlinks&ellimit=max&titles=${movieTitle}`);
  },

  async apiGet(endpoint: string) {
    const data = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&${endpoint}`
    );
    if (data.status === 200) {
      const result = await data.json();
      return result;
    }
    return null;
  },
};
