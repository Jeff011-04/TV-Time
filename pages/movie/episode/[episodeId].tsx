import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchEpisodeDetails } from "../../../lib/omdb"; // A custom function to fetch episode details based on episodeId
import Swal from "sweetalert2"; // For error handling

interface EpisodeDetails {
  Title: string;
  Released: string;
  Plot: string;
  imdbID: string;
  Poster: string;
  Director: string;
  Writer: string;
  Actors: string;
}

const EpisodeDetailsPage = () => {
  const router = useRouter();
  const { id, episodeId } = router.query; // Get the movie/show id and episode id from the URL

  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Added error state to handle errors gracefully

  // Fetch episode details when the component mounts or episodeId changes
  useEffect(() => {
    if (!episodeId || typeof episodeId !== 'string') {
      // Return early if episodeId is not valid
      setError("Invalid episode ID");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchEpisodeDetails(episodeId);  // Assuming this function fetches episode details
        if (!data) {
          setError("Episode not found.");
        } else {
          setEpisodeDetails(data);
        }
      } catch (error) {
        setError("Failed to fetch episode details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [episodeId]);

  if (loading) {
    return <p>Loading episode details...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there's an error
  }

  if (!episodeDetails) {
    return <p>Episode details not found.</p>;
  }

  return (
    <div className="episode-details-container">
      <h1 className="episode-title">
        {episodeDetails.Title} ({episodeDetails.Released})
      </h1>

      <div className="episode-details">
        <img
          src={episodeDetails.Poster !== "N/A" ? episodeDetails.Poster : "/placeholder.jpg"}
          alt={episodeDetails.Title}
          className="episode-poster"
        />

        <div className="episode-info">
          <p><strong>Released:</strong> {episodeDetails.Released}</p>
          <p><strong>Director:</strong> {episodeDetails.Director}</p>
          <p><strong>Writer:</strong> {episodeDetails.Writer}</p>
          <p><strong>Actors:</strong> {episodeDetails.Actors}</p>
          <p><strong>Plot:</strong> {episodeDetails.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailsPage;
