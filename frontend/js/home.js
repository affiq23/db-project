document.addEventListener("DOMContentLoaded", () => {
    const displayMovies = (movies) => {
        const container = document.getElementById("featured-movie-grid");
        container.innerHTML = "";

        if (!movies || movies.length === 0) {
            container.innerHTML = "<p>No movies found</p>";
            return;
        }

        movies.forEach(movie => {
            const imageName = movie.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_")
                .replace(/_+/g, "_")
                .replace(/^_|_$/g, "");

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

    // Fetch and display featured movies
    fetch("http://localhost:3001/movies")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => displayMovies(data))
      .catch(err => {
        console.error("Error loading featured movies:", err);
        document.getElementById("featured-movie-grid").innerHTML = `<p>Error loading movies: ${err.message}</p>`;
      });
}); 