// lib/omdb.js
import axios from "axios";

// Your OMDb API key
const apiKey = 'e48b38b2';  // Replace with your actual OMDb API key

// Base URL for OMDb API
const baseUrl = 'https://www.omdbapi.com/';

// Function to search movies or TV shows by title
export const fetchMoviesAndShows = async (query) => {
  try {
    const res = await axios.get(baseUrl, {
      params: {
        apiKey: apiKey,
        s: query,  // Search for movies and TV shows
      },
    });
    return res.data.Search; // Returns array of search results
  } catch (error) {
    console.error("Error fetching data from OMDb API: ", error);
    return [];
  }
};

// Function to fetch details of a single movie or TV show by IMDb ID
export const fetchDetailsById = async (id) => {
  try {
    const res = await axios.get(baseUrl, {
      params: {
        apiKey: apiKey,
        i: id,  // IMDb ID
      },
    });
    return res.data;  // Return detailed data for the specific movie/show
  } catch (error) {
    console.error("Error fetching details from OMDb API: ", error);
    return null;
  }
};


// Function to fetch popular movies (OMDb doesn't have a "popular" endpoint, so you can fetch top-rated movies)
export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(baseUrl, {
      params: {
        apiKey: apiKey,
        s: "popular", // Use a fixed search term like "popular"
      },
    });
    return res.data.Search || []; // Returns array of popular results
  } catch (error) {
    console.error("Error fetching popular movies: ", error);
    return [];
  }
};

// Fetch episodes of a specific season from OMDb API
export const fetchSeasonEpisodes = async (id, seasonNumber) => {
  try {
    const res = await axios.get(baseUrl, {
      params: {
        apiKey: apiKey,
        i: id,  // IMDb ID
        Season: seasonNumber,  // Season number
      },
    });

    if (res.data.Response === "True") {
      return res.data.Episodes || []; // Return episodes of the season
    } else {
      console.error(`No episodes found for season ${seasonNumber}`);
      return []; // Return empty if no episodes are found
    }
  } catch (error) {
    console.error("Error fetching season episodes: ", error);
    return []; // Return empty array in case of an error
  }
};

