const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("search-results");
const similarMovies = document.getElementById("similar-movies");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("search-query").value;

  // Clears the old string
  searchResults.innerHTML = "";
  similarMovies.innerHTML = "";

  try {
    const searchResponse = await fetch(`/api/search-movies?query=${query}`);
    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      // Loops through the results
      searchData.results.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        listItem.addEventListener("click", () => fetchSimilarMovies(movie.id));
        searchResults.appendChild(listItem);
      });
    } else {
      searchResults.textContent = "No movies found.";
    }
  } catch (err) {
    // Error when something goes wrong
    console.error("Error fetching search results:", err);
  }
});

async function fetchSimilarMovies(movieId) {
  try {
    const similarResponse = await fetch(
      `/api/similar-movies?movieId=${movieId}`
    );
    const similarData = await similarResponse.json();

    similarMovies.innerHTML = ""; // Clears the similar movies
    if (similarData.results && similarData.results.length > 0) {
      // Loops through similar movies
      similarData.results.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        similarMovies.appendChild(listItem);
      });
    } else {
      similarMovies.textContent = "No similar movies found.";
    }
  } catch (err) {
    // Error when something goes wrong
    console.error("Error fetching similar movies:", err);
  }
}
