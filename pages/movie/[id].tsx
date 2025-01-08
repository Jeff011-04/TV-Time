import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDetailsById, fetchSeasonEpisodes } from "../../lib/omdb"; // Import your functions
import Swal from "sweetalert2"; // Assuming you're using SweetAlert2 for error handling
import Link from "next/link"; // Link to navigate to episode details

interface Episode {
  Title: string;
  Released: string;
  Plot: string;
  imdbID: string;
  Poster: string; // Add Poster for each episode image
}

interface MovieDetails {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  totalSeasons: string;
}

const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the movie/show id from the URL
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1); // Default to season 1
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch movie/show details when the component mounts or id changes
  useEffect(() => {
    if (!id) return; // Make sure the id is available before making the API call

    const fetchDetails = async () => {
      setLoading(true);
      const data = await fetchDetailsById(id as string);
      if (!data) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Movie/Show not found.",
        });
        return;
      }
      setMovieDetails(data);
      setLoading(false);

      if (data?.totalSeasons) {
        fetchEpisodes(id as string, 1); // Fetch episodes for season 1 by default
      }
    };

    fetchDetails();
  }, [id]);

  // Fetch episodes for a specific season
  const fetchEpisodes = async (id: string, season: number) => {
    setLoading(true);
    const episodeData = await fetchSeasonEpisodes(id, season);
    setEpisodes(episodeData);
    setLoading(false);
  };

  // Handle season change
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
    fetchEpisodes(id as string, season); // Fetch episodes for the selected season
  };

  if (loading) {
    return <p>Loading movie/show details...</p>;
  }

  if (!movieDetails) {
    return <p>Movie/TV Show details not found.</p>;
  }

  return (
    <div className="movie-details-container">
      <h1 className="movie-title">
        {movieDetails.Title} ({movieDetails.Year})
      </h1>

      <div className="movie-details">
        <img
          src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.jpg"}
          alt={movieDetails.Title}
          className="movie-poster"
        />

        <div className="movie-info">
          <p><strong>Genre:</strong> {movieDetails.Genre}</p>
          <p><strong>Director:</strong> {movieDetails.Director}</p>
          <p><strong>Actors:</strong> {movieDetails.Actors}</p>
          <p><strong>Plot:</strong> {movieDetails.Plot}</p>
          <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
        </div>
      </div>

      {/* Season Selector */}
      <div className="season-selector">
        <h2>Select Season</h2>
        <div className="seasons">
          {Array.from({ length: parseInt(movieDetails.totalSeasons) }, (_, index) => index + 1).map(season => (
            <button
              key={season}
              onClick={() => handleSeasonChange(season)}
              className={season === selectedSeason ? 'active' : ''}
            >
              Season {season}
            </button>
          ))}
        </div>
      </div>

      {/* Episodes List */}
      <div className="episodes-list">
        <h2>Episodes - Season {selectedSeason}</h2>
        {episodes.length === 0 ? (
          <p>Loading episodes...</p>
        ) : (
          episodes.map((episode) => (
            <div key={episode.imdbID} className="episode-card">
              <img
                src={episode.Poster !== "N/A" ? episode.Poster : "/placeholder.jpg"}
                alt={episode.Title}
                className="episode-poster"
              />
              <div className="episode-info">
                <h3>{episode.Title}</h3>
                <p>{episode.Released}</p>
                <p>{episode.Plot}</p>
                <Link href={`/movie/${id}/episode/${episode.imdbID}`}>
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
