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

  async getRecommendedMovies(movieId: number) {
    console.log(movieId);
    const data = await fetch("https://tmdb.sandbox.zoosh.ie/dev/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                query getMovie($id: ID!) {
                    movie(id: $id) {
                    id
                    name
                    recommended{
                      id
                      name
                      overview
                      score
                      releaseDate
                      img: poster {
                        url: custom(size: "w185_and_h278_bestv2")
                    }
                    }
                  } 
                  }
            `,
        variables: {
          id: `${movieId}`,
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
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exchars=1000&explaintext&titles=${movieTitle}`
    );
  },

  async getWikiPageLinks(movieTitle: string) {
    return await this.apiGet(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&&prop=extlinks&ellimit=max&titles=${movieTitle}`
    );
  },

  async getWikiPagesByName(movieTitle: string) {
    return this.apiGet(
      `https://en.wikipedia.org/w/api.php?action=query&list=prefixsearch&pssearch=${movieTitle}&pslimit=max&origin=*&format=json`
    );
  },

  async getCategoriesForMovie(pageId: number) {
    return this.apiGet(
      `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=categories&pslimit=max&origin=*&format=json`
    );
  },

  async getImdbMovies(movieTitle: string){
    return this.apiGet(`https://imdb-api.com/en/API/Search/k_nd1wwcwz/${movieTitle}`);
  },

  async apiGet(endpoint: string) {
    const data = await fetch(endpoint);
    if (data.status === 200) {
      const result = await data.json();
      return result;
    }
    return null;
  },
};
