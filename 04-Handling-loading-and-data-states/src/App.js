import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //sending HTTP request from inside react-app 
  async function fetchMovieHandler() {

    setIsLoading(true);

    // starts the process of fetching a resource from the network and return promise
    // the 2nd argument allow us to pass js object where we can configure various options (i.e. extra headers, extra body, chanhe the http request)
    // and by default GET request will be send
    const response = await fetch('https://swapi.dev/api/films/');
      // response objc has a build-in method which automatically translate JSON to js object and it returns a promise
    const data = await response.json();
    
      //this data is transformed data fro URL which will have a structure
      // we used did some transformation because the file naming and the props.naming is diffrent
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
      // we got data and loading is over
      setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies}/>}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
