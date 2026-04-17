// STAR RATINGS
document.querySelectorAll(".stars").forEach(starDiv => {
const rating = starDiv.dataset.rating;
starDiv.innerHTML = "★".repeat(rating) + "☆".repeat(5 - rating);
});

// FILTER FUNCTION
const buttons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".trainer-card");

buttons.forEach(button => {
button.addEventListener("click", () => {
const filter = button.dataset.filter;

cards.forEach(card => {
  if (filter === "all" || card.dataset.category === filter) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
});

});
});

// TRAINER DATA
const trainerDetails = {
  "John Doe": {
    certs: ["NASM Personal Trainer", "CrossFit Level 1"],
    stats: { communication: 3, knowledge: 4, motivation: 5, technique: 4, empathy: 4 },
    clientStory: {
      clientName: "Sarah M.",
      transformation: "Gained 5kg of muscle and hit a 100kg Deadlift.",
      narrative: "John pushed me past my mental limits. His focus on form and strength gave me the confidence I never had in the gym."
    }
  },
  "Jane Smith": {
    certs: ["Yoga Alliance", "Physical Therapy Degree"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 }
  },
  "Mike Johnson": {
    certs: ["ACE Certified Personal Trainer", "Cardio Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 }
  },
    "Emma Wilson": {
    certs: ["Strength & Conditioning Coach", "Strength Training Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 }
  },
  "Sum Tin-wong": {
    certs: ["Expert Yoga Instructor", "Meditation Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    clientStory: {
      clientName: "Alex Rivera",
      transformation: "Lost 15kg and cured chronic back pain.",
      narrative: "Sum didn't just teach me yoga; he taught me how to breathe and move with purpose. When I started, I couldn't touch my toes. Now, I'm pain-free and stronger than ever!"
    }
  },
  "Seo Min-jun": {
    certs: ["Cardio Specialist", "Fat Loss Specialist"],
    stats: { communication: 4, knowledge: 4, motivation: 4, technique: 4, empathy: 4 }
  },
  "Pedro": {
    certs: ["Lifestyle Coach", "Nutrition and Wellness Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 }
  },
  "Maria Fernanda Dolores": {
    certs: ["Zumba Instructor", "Nutrition Specialist"],
    stats: { communication: 4, knowledge: 4, motivation: 4, technique: 4, empathy: 4 }
  },
  "Pirro Meta": {
    certs: ["Weight Training Instructor", "High-Intensity Interval Training Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 }
  }
};

const drawStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

document.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("view-btn")) {
    const isSpotlight = e.target.closest(".spotlight");
    const card = e.target.closest(".trainer-card");
    const spotlightText = e.target.closest(".spotlight-text");

    const nameElement = card ? card.querySelector("h3") : spotlightText.querySelector("h3");
    const name = nameElement.innerText;
    const data = trainerDetails[name];

    if (!data) {
      alert("Profile for " + name + " is coming soon!");
      return;
    }

    if (isSpotlight) {
      // --- SHOW STORY ---
      modalBody.innerHTML = `
        <h2 style="color:var(--color-accent)">Client Success Story</h2>
        <h4 style="margin-bottom: 5px;">Trainer: ${name}</h4>
        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: 15px 0;">
        
        <p style="font-style: italic; font-size: 1.1rem; color: #fff;">
          "${data.clientStory.narrative}"
        </p>
        
        <div style="background: rgba(19, 135, 193, 0.1); padding: 15px; border-radius: 10px; margin-top: 20px;">
          <strong style="color: var(--color-accent);">Client:</strong> ${data.clientStory.clientName}<br>
          <strong style="color: var(--color-accent);">Result:</strong> ${data.clientStory.transformation}
        </div>

        <button class="book-btn">Book a Session with ${name}</button>
      `;
    } else {
      // --- SHOW PROFILE ---
      modalBody.innerHTML = `
        <h2 style="color:var(--color-accent)">${name}</h2>
        <h4>Certifications</h4>
        <ul class="cert-list">
          ${data.certs.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <h4>Client Feedback Breakdown</h4>
        <div class="rating-breakdown">
          <div class="rating-item"><span>Communication</span> <span class="rating-stars">${drawStars(data.stats.communication)}</span></div>
          <div class="rating-item"><span>Knowledge</span> <span class="rating-stars">${drawStars(data.stats.knowledge)}</span></div>
          <div class="rating-item"><span>Motivation</span> <span class="rating-stars">${drawStars(data.stats.motivation)}</span></div>
          <div class="rating-item"><span>Technique</span> <span class="rating-stars">${drawStars(data.stats.technique)}</span></div>
          <div class="rating-item"><span>Empathy</span> <span class="rating-stars">${drawStars(data.stats.empathy)}</span></div>
        </div>
        <button class="book-btn">Book a Session</button>
      `;
    }

    modal.style.display = "block";
  }
});

// CLOSE LOGIC
if(closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };