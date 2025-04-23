document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3001/movies")
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".movie-grid");
        container.innerHTML = "";
  
        data.forEach(movie => {
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
              <p class="director">Directed by ${movie.director_name || "Unknown"}</p>
              <p class="rating">Rating: ${movie.rating || "N/A"}</p>
            </div>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(err => console.error("Error loading movies:", err));
  });
  