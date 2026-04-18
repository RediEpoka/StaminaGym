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
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Jack M.",
      transformation: "Gained 5kg of muscle and hit a 100kg Deadlift.",
      narrative: "John pushed me past my mental limits. His focus on form and strength gave me the confidence I never had in the gym."
    }
  },
  "Jane Smith": {
    certs: ["Yoga Alliance", "Physical Therapy Degree"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Laura P.",
      transformation: "Eliminated chronic lower back pain in 8 weeks.",
      narrative: "I came to Jane barely able to sit at my desk without pain. Her yoga program rebuilt my flexibility and posture from the ground up. Eight weeks later I was pain-free — something no physio had managed in two years."
    }
  },
  "Mike Johnson": {
    certs: ["ACE Certified Personal Trainer", "Cardio Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Daniel R.",
      transformation: "Went from couch to completing a 10K race in 3 months.",
      narrative: "I hadn't run since school. Mike built me up so gradually I never felt overwhelmed. By month three I crossed a 10K finish line — something I genuinely thought was impossible for someone like me."
    }
  },
    "Emma Wilson": {
    certs: ["Strength & Conditioning Coach", "Strength Training Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Sofia T.",
      transformation: "Increased total lifts by 60kg in 4 months.",
      narrative: "Emma completely changed how I approach the weights. Her programming is intelligent, progressive, and actually fun."
    }
  },
  "Sum Tin-wong": {
    certs: ["Expert Yoga Instructor", "Meditation Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Alex Rivera",
      transformation: "Lost 15kg and cured chronic back pain.",
      narrative: "Sum didn't just teach me yoga; he taught me how to breathe and move with purpose. When I started, I couldn't touch my toes. Now, I'm pain-free and stronger than ever!"
    }
  },
  "Seo Min-jun": {
    certs: ["Cardio Specialist", "Fat Loss Specialist"],
    stats: { communication: 4, knowledge: 4, motivation: 4, technique: 4, empathy: 4 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Chris L.",
      transformation: "Dropped 8kg of fat and improved resting heart rate by 14bpm.",
      narrative: "Seo's cardio sessions are tough but addictive. She tracks everything — heart rate zones, recovery time, weekly progress — and you can genuinely see yourself getting fitter week by week. Best decision I made this year."
    }
  },
  "Pedro": {
    certs: ["Lifestyle Coach", "Nutrition and Wellness Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Marco V.",
      transformation: "Lost 12kg in 5 months without giving up any food groups.",
      narrative: "I expected Pedro to hand me a boring meal plan. Instead he taught me how food actually works with my body. No banned foods — just sustainable habits. I've kept the weight off for over a year now."
    }
  },
  "Maria Fernanda Dolores": {
    certs: ["Zumba Instructor", "Nutrition Specialist"],
    stats: { communication: 4, knowledge: 4, motivation: 4, technique: 4, empathy: 4 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Isabelle N.",
      transformation: "Reversed pre-diabetic markers in 3 months through diet alone.",
      narrative: "My doctor told me I needed to change my diet urgently. Maria made that feel achievable rather than scary. She built a plan around food I actually enjoyed and within three months my blood sugar levels were back in the healthy range."

    }
  },
  "Pirro Meta": {
    certs: ["Weight Training Instructor", "High-Intensity Interval Training Specialist"],
    stats: { communication: 5, knowledge: 5, motivation: 5, technique: 5, empathy: 5 },
    social: { instagram: "#", twitter: "#" },
    clientStory: {
      clientName: "Ben K.",
      transformation: "Lost 10kg while adding visible muscle in 12 weeks.",
      narrative: "Pirro's HIIT and weight training combo is no joke — but it delivers. I was sceptical that I could lose fat and build muscle at the same time. Pirro proved me wrong and he did it in a way that never once felt boring."

    }
  }
};

const drawStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

// MODAL OPEN LOGIC
document.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("view-btn")) {
    const isSpotlight = e.target.closest(".spotlight");
    const container = isSpotlight ? e.target.closest(".spotlight-text") : e.target.closest(".trainer-card");
    const name = container.querySelector("h3").innerText;
    const data = trainerDetails[name];

    if (!data) return;

    if (isSpotlight || e.target.innerText === "Read Story") {
      // SUCCESS STORY VIEW
      modalBody.innerHTML = `
        <h2 style="color:var(--color-accent)">Success Story</h2>
        <p style="font-style:italic; margin: 20px 0;">"${data.clientStory?.narrative || "Transformation coming soon!"}"</p>
        <div class="rating-breakdown">
            <strong>Client:</strong> ${data.clientStory?.clientName || "Anonymous"}<br>
            <strong>Result:</strong> ${data.clientStory?.transformation || "In progress"}
        </div>
        <button class="book-btn open-booking" data-trainer="${name}">Book a Session</button>
      `;
    } else {
      // PROFILE VIEW
      modalBody.innerHTML = `
        <h2 style="color:var(--color-accent)">${name}</h2>
        <div class="social-icons-modal">
          <a href="${data.social?.instagram}" class="ig" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="${data.social?.twitter}" class="tw" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
        <h4>Certifications</h4>
        <ul class="cert-list">${data.certs.map(c => `<li>${c}</li>`).join('')}</ul>
        <h4>Feedback</h4>
        <div class="rating-breakdown">
          <div class="rating-item"><span>Communication</span> <span class="rating-stars">${drawStars(data.stats.communication)}</span></div>
          <div class="rating-item"><span>Technique</span> <span class="rating-stars">${drawStars(data.stats.technique)}</span></div>
          <div class="rating-item"><span>Motivation</span> <span class="rating-stars">${drawStars(data.stats.motivation)}</span></div>
          <div class="rating-item"><span>Knowledge</span> <span class="rating-stars">${drawStars(data.stats.knowledge)}</span></div>
          <div class="rating-item"><span>Empathy</span> <span class="rating-stars">${drawStars(data.stats.empathy)}</span></div>
        </div>
        <h4>Client Transformation</h4>
        <div class="story-box">
          <p class="story-quote">${data.clientStory?.narrative || "Story coming soon."}</p>
          <div class="story-meta">
            <span class="story-chip">${data.clientStory?.clientName || ""}</span>
            <span class="story-chip">${data.clientStory?.transformation || ""}</span>
          </div>
        </div>
        <button class="book-btn open-booking" data-trainer="${name}">Book a Session</button>
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

// SELECT ELEMENTS
const bookingModal = document.getElementById("booking-modal");
const bookingForm = document.getElementById("booking-form");
const bookingSuccess = document.getElementById("booking-success");
const userNameInput = document.getElementById("user-name");
const displayUserName = document.getElementById("display-user-name");
const selectedTrainerText = document.getElementById("selected-trainer-name");
const closeBookingBtn = document.querySelector(".close-booking");

// 1. OPEN BOOKING MODAL
document.addEventListener("click", function(e) {
  // Now this ONLY triggers on the actual "Book a Session" button
  if (e.target && e.target.classList.contains("book-btn")) {
    
    let trainerName = "";
    const modalTitle = document.querySelector("#modal-body h2");
    
    if(modalTitle) {
        trainerName = modalTitle.innerText;
    }

    selectedTrainerText.innerText = "Trainer: " + trainerName;
    
    // Close the profile modal and open the booking modal
    modal.style.display = "none";
    bookingModal.style.display = "block";
  }
});

// 2. SUBMIT FORM
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    const userName = userNameInput.value;
    if (displayUserName) {
      displayUserName.innerText = userName;
    }

    // Hide the form and show the success block
    bookingForm.style.display = "none";
    bookingSuccess.style.display = "block";

    setTimeout(() => {
      bookingModal.style.display = "none";
      bookingForm.style.display = "block";
      bookingSuccess.style.display = "none";
      bookingForm.reset(); 
    }, 4000);
  });
}

// 3. CLOSE BOOKING MODAL
if(closeBookingBtn) {
    closeBookingBtn.onclick = () => {
        bookingModal.style.display = "none";
    };
}

window.addEventListener("click", (event) => {
  if (event.target == bookingModal) {
    bookingModal.style.display = "none";
  }
});

/*
// SELECT ELEMENTS
const bookingModal = document.getElementById("booking-modal");
const bookingForm = document.getElementById("booking-form");
const bookingSuccess = document.getElementById("booking-success");
const userNameInput = document.getElementById("user-name");
const displayUserName = document.getElementById("display-user-name");
const selectedTrainerText = document.getElementById("selected-trainer-name");
const closeBookingBtn = document.querySelector(".close-booking");

// 1. OPEN BOOKING MODAL
document.addEventListener("click", function(e) {
  // Now this ONLY triggers on the actual "Book a Session" button
  if (e.target && e.target.classList.contains("book-btn")) {
    
    let trainerName = "";
    const modalTitle = document.querySelector("#modal-body h2");
    
    if(modalTitle) {
        trainerName = modalTitle.innerText;
    }

    selectedTrainerText.innerText = "Trainer: " + trainerName;
    
    // Close the profile modal and open the booking modal
    modal.style.display = "none";
    bookingModal.style.display = "block";
  }
});

// 2. SUBMIT FORM
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    const userName = userNameInput.value;
    displayUserName.innerText = userName;

    // Hide the form and show the success block
    bookingForm.style.display = "none";
    bookingSuccess.style.display = "block";

    setTimeout(() => {
      bookingModal.style.display = "none";
      bookingForm.style.display = "block";
      bookingSuccess.style.display = "none";
      bookingForm.reset(); 
    }, 4000);
  });
}

// 3. CLOSE BOOKING MODAL
if(closeBookingBtn) {
    closeBookingBtn.onclick = () => {
        bookingModal.style.display = "none";
    };
}

window.addEventListener("click", (event) => {
  if (event.target == bookingModal) {
    bookingModal.style.display = "none";
  }
});*/