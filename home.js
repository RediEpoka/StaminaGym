const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const statsNumbers = document.querySelectorAll(".stats-number");
let statsStarted = false;

function startStatsCount() {
  if (statsStarted) return;
  statsStarted = true;

  statsNumbers.forEach(function (el) {
    const target = Number(el.getAttribute("data-target"));
    let current = 0;
    const step = Math.max(1, Math.floor(target / 100));

    const interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 20);
  });
}

window.addEventListener("load", startStatsCount);

const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm && newsletterEmail && newsletterMessage) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = newsletterEmail.value.trim();


    if (value === "" || !value.includes("@")) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      newsletterMessage.classList.remove("success");
      newsletterMessage.classList.add("error");
    } else {
      newsletterMessage.textContent = "Thank you for subscribing!";
      newsletterMessage.classList.remove("error");
      newsletterMessage.classList.add("success");
      newsletterEmail.value = "";
    }
  });
}

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}