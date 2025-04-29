document.addEventListener("DOMContentLoaded", () => {
    // Define displayMovies at the top so it's available everywhere
    const displayMovies = (movies) => {
        const container = document.querySelector(".movie-grid");
        container.innerHTML = "";

        movies.forEach(movie => {
            // Normalize movie title for image filenames: lowercase and underscores
            const imageName = movie.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_")   // replace spaces and punctuation with "_"
                .replace(/_+/g, "_")          // collapse multiple underscores
                .replace(/^_|_$/g, "");       // trim leading/trailing underscores

            const card = document.createElement("div");
            card.className = "movie-card";

            card.innerHTML = `
                <div class="movie-poster">
                  <img 
                    src="images/${imageName}.jpg" 
                    alt="${movie.title} Poster"
                    onerror="this.onerror=null; this.src='images/default.jpg';"
                  >
                </div>
                <div class="movie-info">
                  <h3>${movie.title}</h3>
                  <p class="year">${movie.release_date?.split("-")[0] || "Unknown"}</p>
                  <p class="genre">${movie.genre || "Unknown"}</p>
                  <p class="director">Directed by ${movie.director_first_name ? movie.director_first_name + ' ' + movie.director_last_name : "Unknown"}</p>
                  <p class="rating">Rating: ${movie.rating || "N/A"}</p>
                </div>
            `;

            container.appendChild(card);
        });
    };

    // Initial load
    fetch("http://localhost:3001/movies")
    .then(res => res.json())
    .then(data => displayMovies(data))
    .catch(err => console.error("Error loading movies:", err));

    // Handle search form submission
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('searchInput').value;

        fetch(`http://localhost:3001/movies/search?q=${encodeURIComponent(searchTerm)}`)
          .then(res => res.json())
          .then(data => displayMovies(data))
          .catch(err => console.error("Error searching movies:", err));
    });
    
    // Handles update form submission
    const updateForm = document.getElementById('updateForm');
    if (updateForm) {
      updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const movieId = document.getElementById('updateMovieIdInput').value;
        const newTitle = document.getElementById('updateTitleInput').value;
  
        fetch(`http://localhost:3001/movies/update?id=${encodeURIComponent(movieId)}&title=${encodeURIComponent(newTitle)}`)
          .then(res => res.json())
          .then(data => {
            console.log('Update successful:', data);
            alert('Movie Updated Successfully!');
          })
          .catch(err => {
            console.error('Error updating movie:', err);
            alert('Failed to update movie');
          });
      });
    }
});
  
