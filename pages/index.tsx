import { useState, useEffect } from "react";
import { fetchMoviesAndShows, fetchPopularMovies } from "../lib/omdb";
import Link from "next/link";  // Import Link component from Next.js

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [moviesAndShows, setMoviesAndShows] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchPopularMovies();
      setPopularMovies(data || []);
    };
    getPopularMovies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 2) {
        const data = await fetchMoviesAndShows(query);
        setMoviesAndShows(data || []);
      } else {
        setMoviesAndShows([]);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h1 className="title">Trending Movies and TV Shows</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie or TV show"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Popular Movies Section */}
      <div className="section">
        <h2 className="section-title">Popular Movies</h2>
        <div className="show-list">
          {popularMovies.length === 0 ? (
            <p>Loading popular movies...</p>
          ) : (
            popularMovies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                  alt={movie.Title}
                  className="movie-poster"
                />
                <h3 className="movie-title">
                  <Link href={`/movie/${movie.imdbID}`}>
                    {movie.Title}
                  </Link>
                </h3>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Search Results Section */}
      <div className="section">
        <h2 className="section-title">Search Results</h2>
        <div className="show-list">
          {moviesAndShows.length === 0 ? (
            <p>No results found. Try searching for something else.</p>
          ) : (
            moviesAndShows.map((item) => (
              <div key={item.imdbID} className="movie-card">
                <img
                  src={item.Poster !== "N/A" ? item.Poster : "/placeholder.jpg"}
                  alt={item.Title}
                  className="movie-poster"
                />
                <h3 className="movie-title">
                  <Link href={`/movie/${item.imdbID}`}>
                    {item.Title}
                  </Link>
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
