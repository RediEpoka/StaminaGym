const scheduleClassesData = [
  {
    id: 1,
    name: "Power Lift",
    category: "strength",
    difficulty: "intermediate",
    duration: 60,
    trainer: "John Doe",
    day: "Monday",
    time: "08:00",
    capacity: 24,
    booked: 17,
    popularity: 92,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    description: "A full-body strength class focused on building muscle, improving form, and increasing total-body power.",
    bio: "John Doe is a strength specialist with 5 years of experience helping members improve performance and confidence.",
    equipment: "Barbells, dumbbells, benches",
    bring: "Water bottle, towel, training shoes"
  },
  {
    id: 2,
    name: "Morning Flow Yoga",
    category: "yoga",
    difficulty: "beginner",
    duration: 45,
    trainer: "Jane Smith",
    day: "Monday",
    time: "10:00",
    capacity: 20,
    booked: 11,
    popularity: 81,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    description: "A calming yoga class designed to improve flexibility, posture, breathing, and mental focus.",
    bio: "Jane Smith brings 8 years of yoga teaching experience with a focus on balance, flexibility, and mindful movement.",
    equipment: "Yoga mats, blocks",
    bring: "Comfortable clothes, water bottle"
  },
  {
    id: 3,
    name: "HIIT Blast",
    category: "hiit",
    difficulty: "advanced",
    duration: 30,
    trainer: "Mike Johnson",
    day: "Tuesday",
    time: "18:00",
    capacity: 18,
    booked: 15,
    popularity: 97,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
    description: "A high-intensity interval session that combines speed, cardio, and bodyweight exercises for maximum burn.",
    bio: "Mike Johnson is known for energetic cardio and HIIT sessions that push endurance and stamina.",
    equipment: "Kettlebells, battle ropes, mats",
    bring: "Water bottle, towel, running shoes"
  },
  {
    id: 4,
    name: "Boxing Basics",
    category: "boxing",
    difficulty: "beginner",
    duration: 50,
    trainer: "Emma Wilson",
    day: "Wednesday",
    time: "17:00",
    capacity: 16,
    booked: 9,
    popularity: 74,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80",
    description: "Learn boxing fundamentals including stance, punches, footwork, and conditioning drills.",
    bio: "Emma Wilson combines strength training with combat conditioning to create fun and disciplined classes.",
    equipment: "Gloves, pads, jump ropes",
    bring: "Hand wraps, water bottle"
  },
  {
    id: 5,
    name: "Cardio Burn",
    category: "cardio",
    difficulty: "intermediate",
    duration: 40,
    trainer: "Seo Min-jun",
    day: "Thursday",
    time: "07:30",
    capacity: 22,
    booked: 19,
    popularity: 88,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    description: "An energizing cardio class using fast-paced drills to improve stamina, agility, and endurance.",
    bio: "Seo Min-jun leads dynamic cardio sessions focused on movement quality, heart health, and performance.",
    equipment: "Step platforms, light dumbbells, mats",
    bring: "Water bottle, gym shoes"
  },
  {
    id: 6,
    name: "CrossFit Challenge",
    category: "crossfit",
    difficulty: "advanced",
    duration: 55,
    trainer: "Pirro Meta",
    day: "Friday",
    time: "19:00",
    capacity: 20,
    booked: 16,
    popularity: 95,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    description: "A challenging CrossFit class mixing strength, explosive movement, and intense conditioning circuits.",
    bio: "Pirro Meta focuses on strength-based athletic training and functional movement performance.",
    equipment: "Barbells, kettlebells, pull-up bars",
    bring: "Training shoes, towel, water bottle"
  },
  {
    id: 7,
    name: "Core Builder",
    category: "strength",
    difficulty: "beginner",
    duration: 35,
    trainer: "John Doe",
    day: "Saturday",
    time: "11:00",
    capacity: 18,
    booked: 8,
    popularity: 69,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    description: "A beginner-friendly class focused on strengthening the abs, lower back, and core stability.",
    bio: "John Doe helps members build a stronger foundation with safe and effective strength techniques.",
    equipment: "Mats, medicine balls, resistance bands",
    bring: "Water bottle, small towel"
  },
  {
    id: 8,
    name: "Yoga Restore",
    category: "yoga",
    difficulty: "intermediate",
    duration: 50,
    trainer: "Sum Tin-wong",
    day: "Thursday",
    time: "18:30",
    capacity: 20,
    booked: 13,
    popularity: 77,
    image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=900&q=80",
    description: "A recovery-focused yoga class with stretching, mobility work, and mindful breathing techniques.",
    bio: "Sum Tin-wong helps members improve flexibility, relaxation, and control through guided yoga practice.",
    equipment: "Yoga mats, straps, blocks",
    bring: "Water bottle, comfortable clothing"
  },
  {
    id: 9,
    name: "Nutrition Essentials",
    category: "nutrition",
    difficulty: "beginner",
    duration: 30,
    trainer: "Pedro",
    day: "Wednesday",
    time: "14:00",
    capacity: 15,
    booked: 7,
    popularity: 65,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    description: "A guided wellness session covering healthy eating habits, balanced meal planning, and fitness nutrition basics.",
    bio: "Pedro supports gym members with practical nutrition advice that complements their training goals.",
    equipment: "Notebook, presentation screen",
    bring: "Water bottle, notebook"
  }
];

const classGrid = document.getElementById("classGrid");
const scheduleTableBody = document.getElementById("scheduleTableBody");
const categoryTabs = document.querySelectorAll(".tab-btn");
const searchInput = document.getElementById("searchInput");
const dayFilter = document.getElementById("dayFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const trainerFilter = document.getElementById("trainerFilter");
const sortFilter = document.getElementById("sortFilter");
const resultsCount = document.getElementById("resultsCount");

const classModal = document.getElementById("classModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOverlay = document.getElementById("modalOverlay");

let activeCategory = "all";

function getBookedClasses() {
  return JSON.parse(localStorage.getItem("bookedClasses")) || [];
}

function saveBookedClasses(bookedIds) {
  localStorage.setItem("bookedClasses", JSON.stringify(bookedIds));
}

function populateTrainerFilter() {
  const trainers = [...new Set(scheduleClassesData.map(item => item.trainer))];

  trainers.forEach(trainer => {
    const option = document.createElement("option");
    option.value = trainer;
    option.textContent = trainer;
    trainerFilter.appendChild(option);
  });
}

function difficultyOrder(level) {
  if (level === "beginner") return 1;
  if (level === "intermediate") return 2;
  return 3;
}

function filterClasses() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedDay = dayFilter.value;
  const selectedDifficulty = difficultyFilter.value;
  const selectedTrainer = trainerFilter.value;
  const selectedSort = sortFilter.value;

  let filtered = scheduleClassesData.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchValue);
    const matchesDay = selectedDay === "all" || item.day === selectedDay;
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    const matchesTrainer = selectedTrainer === "all" || item.trainer === selectedTrainer;

    return matchesCategory && matchesSearch && matchesDay && matchesDifficulty && matchesTrainer;
  });

  if (selectedSort === "time") {
    filtered.sort((a, b) => a.time.localeCompare(b.time));
  } else if (selectedSort === "difficulty") {
    filtered.sort((a, b) => difficultyOrder(a.difficulty) - difficultyOrder(b.difficulty));
  } else if (selectedSort === "popularity") {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  renderClasses(filtered);
  renderSchedule(filtered);
}

function renderClasses(data) {
  const bookedClasses = getBookedClasses();
  classGrid.innerHTML = "";

  resultsCount.textContent = `${data.length} class${data.length === 1 ? "" : "es"} found`;

  if (!data.length) {
    classGrid.innerHTML = `
      <div class="empty-state">
        <h3>No classes match your filters</h3>
        <p>Try changing the category, search term, or filters.</p>
      </div>
    `;
    return;
  }

  data.forEach(item => {
    const percentage = Math.round((item.booked / item.capacity) * 100);
    const isBooked = bookedClasses.includes(item.id);

    const card = document.createElement("article");
    card.className = "class-card";

    card.innerHTML = `
      <img class="class-image" src="${item.image}" alt="${item.name}">
      <div class="class-content">
        <div class="class-top">
          <div>
            <span class="class-category">${item.category}</span>
            <h3 class="class-name">${item.name}</h3>
          </div>
          <span class="difficulty-badge ${item.difficulty}">${item.difficulty}</span>
        </div>

        <div class="class-meta">
          <div class="meta-item">
            <span class="meta-label">Duration</span>
            <span class="meta-value">${item.duration} min</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Trainer</span>
            <span class="meta-value">${item.trainer}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Day</span>
            <span class="meta-value">${item.day}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Time</span>
            <span class="meta-value">${item.time}</span>
          </div>
        </div>

        <div class="capacity-row">
          <div class="capacity-top">
            <span>Capacity</span>
            <span>${item.booked}/${item.capacity} spots filled</span>
          </div>
          <div class="progress">
            <div class="progress-fill" style="width: ${percentage}%"></div>
          </div>
        </div>

        <div class="class-actions">
          <button class="btn btn-secondary details-btn" data-id="${item.id}">View Details</button>
          ${
            isBooked
              ? `<span class="booked-state">Booked</span>`
              : `<button class="btn btn-primary book-btn" data-id="${item.id}">Book This Class</button>`
          }
        </div>
      </div>
    `;

    classGrid.appendChild(card);
  });

  document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => openModal(Number(button.dataset.id)));
  });

  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", () => bookClass(Number(button.dataset.id)));
  });
}

function renderSchedule(data) {
  scheduleTableBody.innerHTML = "";

  if (!data.length) {
    scheduleTableBody.innerHTML = `
      <tr>
        <td colspan="6">No classes available for the selected filters.</td>
      </tr>
    `;
    return;
  }

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.day}</td>
      <td>${item.time}</td>
      <td>${item.name}</td>
      <td><span class="schedule-pill">${item.category}</span></td>
      <td>${item.trainer}</td>
      <td><span class="difficulty-badge ${item.difficulty}">${item.difficulty}</span></td>
    `;

    scheduleTableBody.appendChild(row);
  });
}

function openModal(id) {
  const item = scheduleClassesData.find(cls => cls.id === id);
  const bookedClasses = getBookedClasses();
  const isBooked = bookedClasses.includes(item.id);

  modalBody.innerHTML = `
    <div class="modal-content-grid">
      <div>
        <img class="modal-image" src="${item.image}" alt="${item.name}">
      </div>

      <div class="modal-copy">
        <span class="class-category">${item.category}</span>
        <h3 id="modalTitle">${item.name}</h3>
        <p>${item.description}</p>

        <ul class="modal-list">
          <li><strong>Trainer:</strong> ${item.trainer}</li>
          <li><strong>Trainer Bio:</strong> ${item.bio}</li>
          <li><strong>Difficulty:</strong> ${item.difficulty}</li>
          <li><strong>Duration:</strong> ${item.duration} minutes</li>
          <li><strong>Day & Time:</strong> ${item.day}, ${item.time}</li>
          <li><strong>Equipment Needed:</strong> ${item.equipment}</li>
          <li><strong>What to Bring:</strong> ${item.bring}</li>
        </ul>

        ${
          isBooked
            ? `<span class="booked-state">Already Booked</span>`
            : `<button class="btn btn-primary" id="modalBookBtn" data-id="${item.id}">Book This Class</button>`
        }
      </div>
    </div>
  `;

  classModal.classList.remove("hidden");
  classModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const modalBookBtn = document.getElementById("modalBookBtn");
  if (modalBookBtn) {
    modalBookBtn.addEventListener("click", () => {
      bookClass(Number(modalBookBtn.dataset.id));
      openModal(Number(modalBookBtn.dataset.id));
    });
  }
}

function closeModal() {
  classModal.classList.add("hidden");
  classModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function bookClass(id) {
  const bookedClasses = getBookedClasses();

  if (!bookedClasses.includes(id)) {
    bookedClasses.push(id);
    saveBookedClasses(bookedClasses);
    alert("Class booked successfully!");
    filterClasses();
  } else {
    alert("You already booked this class.");
  }
}

categoryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.category;
    filterClasses();
  });
});

searchInput.addEventListener("input", filterClasses);
dayFilter.addEventListener("change", filterClasses);
difficultyFilter.addEventListener("change", filterClasses);
trainerFilter.addEventListener("change", filterClasses);
sortFilter.addEventListener("change", filterClasses);

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !classModal.classList.contains("hidden")) {
    closeModal();
  }
});

populateTrainerFilter();
filterClasses();