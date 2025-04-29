document.addEventListener("DOMContentLoaded", () => {
    const displayActors = (actors) => {
        const container = document.querySelector(".actor-grid");
        container.innerHTML = "";
  
        if (!actors || actors.length === 0) {
            container.innerHTML = "<p>No actors found</p>";
            return;
        }
  
        actors.forEach(actor => {
            const imageName = `${actor.first_name.toLowerCase()}_${actor.last_name.toLowerCase()}.jpg`;
  
            const card = document.createElement("div");
            card.className = "actor-card";
  
            card.innerHTML = `
                <div class="actor-photo">
                  <img 
                    src="images/${imageName}" 
                    alt="${actor.first_name} ${actor.last_name}" 
                    onerror="this.onerror=null; this.src='images/default.jpg';"
                  >
                </div>
                <h3>${actor.first_name} ${actor.last_name}</h3>
                <p class="nationality">${actor.nationality}</p>
                <p class="birth-date">Born: ${actor.date_of_birth?.split("T")[0]}</p>
            `;
  
            container.appendChild(card);
        });
    };

    // Handle filter form submission
    const filterForm = document.querySelector('.filters form');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nationality = document.getElementById('nationality').value;
        const sort = document.getElementById('sort').value;
        let url = `http://localhost:3001/actors?`;
        if (nationality) url += `nationality=${encodeURIComponent(nationality)}&`;
        if (sort) url += `sort=${encodeURIComponent(sort)}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayActors(data))
            .catch(err => {
                console.error("Error loading actors:", err);
                document.querySelector(".actor-grid").innerHTML = `<p>Error loading actors: ${err.message}</p>`;
            });
    });

    // Initial load (all actors)
    fetch("http://localhost:3001/actors")
      .then(res => res.json())
      .then(data => displayActors(data))
      .catch(err => {
        console.error("Error loading actors:", err);
        document.querySelector(".actor-grid").innerHTML = `<p>Error loading actors: ${err.message}</p>`;
      });
});
  