const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// API key for accessing the movie database
const API_KEY = "13e2f3619e1cbd349cb57c02a17a7100";

// Set up the public folder to serve HTML, CSS, and JS files
app.use(express.static(path.join(__dirname, "public")));

// To search for movies based on a query
app.get("/api/search-movies", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    // If no query is provided, send an error message
    return res.status(400).json({ error: "Please provide a search query." });
  }

  // Build the API URL to search for movies
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

  try {
    // Use fetch to get data from the movie database and convert the response to JSON
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error:", err); // Logs errors to the console
    res.status(500).json({ error: "Something went wrong." }); // This sends an error message to the client
  }
});

// This is to get similar movies for a specific movie
app.get("/api/similar-movies", async (req, res) => {
  const movieId = req.query.movieId; // Gets the movie ID from the URL

  if (!movieId) {
    // If the movie ID is not provided, it send an error message
    return res.status(400).json({ error: "Movie ID is missing." });
  }

  // Uses API URL to find similar movies
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${API_KEY}`;

  try {
    // Uses fetch to get similar movies data and  converts the response to JSON
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Sends the data back to the user
  } catch (err) {
    console.error("Error:", err); // Log any errors to the console
    res.status(500).json({ error: "Something went wrong." }); // Send an error message to the user
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
