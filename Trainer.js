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
