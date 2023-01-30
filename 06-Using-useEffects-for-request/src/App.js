import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //sending HTTP request from inside react-app 
  const fetchMovieHandler = useCallback( async () => {

    setIsLoading(true);
    setError(null);

    try {
      // starts the process of fetching a resource from the network and return promise
      // the 2nd argument allow us to pass js object where we can configure various options (i.e. extra headers, extra body, chanhe the http request)
      // and by default GET request will be send
      const response = await fetch('https://swapi.dev/api/films/');
     
     //this is from data coming from api which tells response was successful or not
     if(!response.ok) {
      throw new Error('Something went wrong!!');
      // after this line we jump to catch block
    }
     
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
      } catch(error) {
        setError(error.message);
      }
      setIsLoading(false); 
  }, []);

  // here since we know fetchMovieHnadler is a function which will always gets re=created when App js re-run
  // useCallback will ensure it doesn't happen
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);


  let content = <p>Found no movies.</p>;
  if(movies.length > 0) {
    content = <MoviesList movies={movies}/>;
  }
  if(error) {
    content = <p>{error}</p>
  }
  if(isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* optimized with lines 53-62 */}
        {/* {!isLoading && <MoviesList movies={movies}/>}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
