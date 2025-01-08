import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDetailsById } from "../../../lib/omdb"; // Reuse the function to fetch episode details

// Type definitions for episode details
interface EpisodeDetails {
  Title: string;
  Released: string;
  Plot: string;
  imdbID: string;
  imdbRating: string;
}

const EpisodeDetailsPage = () => {
  const router = useRouter();
  const { id, episodeId } = router.query; // Extract 'id' (movie/show) and 'episodeId' (episode) from URL params
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state to handle errors

  // Fetch episode details when the component mounts or the parameters change
  useEffect(() => {
    // Only proceed if the router is ready and we have both the 'id' and 'episodeId'
    if (!router.isReady || !episodeId || !id) {
      setLoading(false); // Stop loading if the parameters are not ready
      return;
    }

    const fetchEpisodeDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchDetailsById(episodeId as string); // Ensure 'episodeId' is treated as a string
        if (data && data.Title) {
          setEpisodeDetails(data); // Set episode details if valid
          setError(null); // Reset error if data is fetched successfully
        } else {
          setError("Episode details not found.");
        }
      } catch (err) {
        setError("Failed to fetch episode details.");
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    // Fetch episode details if the required parameters are available
    fetchEpisodeDetails();
  }, [episodeId, id, router.isReady]); // Re-run the effect when either 'episodeId' or 'id' or router readiness changes

  // Show loading state while fetching data
  if (loading) {
    return <p>Loading episode details...</p>;
  }

  // Show error message if fetching episode fails
  if (error) {
    return <p>{error}</p>;
  }

  // Handle case where episode details are not found
  if (!episodeDetails) {
    return <p>Episode not found.</p>;
  }

  return (
    <div className="episode-details">
      <h1>{episodeDetails.Title}</h1>
      <p><strong>Released:</strong> {episodeDetails.Released}</p>
      <p><strong>IMDb Rating:</strong> {episodeDetails.imdbRating}</p>
      <p><strong>Plot:</strong> {episodeDetails.Plot}</p>
    </div>
  );
};

export default EpisodeDetailsPage;
