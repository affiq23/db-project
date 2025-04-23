document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3001/actors")
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".actor-grid");
        container.innerHTML = "";
  
        data.forEach(actor => {
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
      })
      .catch(err => {
        console.error("Error loading actors:", err);
      });
  });
  