import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDetailsById } from "../../../lib/omdb";  // Reuse the function to fetch episode details

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
  const { id, episodeId } = router.query;  // Extract 'id' and 'episodeId' from the URL params
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch episode details when the component mounts or the parameters change
  useEffect(() => {
    if (!episodeId || !id) return;  // Ensure that 'id' and 'episodeId' are available before making the API call

    const fetchEpisodeDetails = async () => {
      setLoading(true);
      const data = await fetchDetailsById(episodeId as string);  // Fetch episode details using 'episodeId'
      setEpisodeDetails(data);
      setLoading(false);
    };

    fetchEpisodeDetails();
  }, [episodeId, id]);  // Re-run the effect when either 'episodeId' or 'id' changes

  // Show loading state while fetching data
  if (loading) {
    return <p>Loading episode details...</p>;
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
