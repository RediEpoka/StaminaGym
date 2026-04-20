const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.addEventListener("load", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 0, once: true, offset: 0 });
  }
});

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
  });
}

(function () {
  const dayIndex = new Date().getDay();
  const rows = document.querySelectorAll(".hours-table tbody tr");
  if (!rows.length) return;

  let targetRow = null;
  if (dayIndex >= 1 && dayIndex <= 5) targetRow = rows[0];
  else if (dayIndex === 6) targetRow = rows[1];
  else targetRow = rows[2];

  if (targetRow) {
    targetRow.classList.add("today");
    const dayCell = targetRow.querySelector("td");
    if (dayCell) {
      const badge = document.createElement("span");
      badge.className = "today-badge";
      badge.textContent = "Today";
      dayCell.appendChild(badge);
    }
  }
})();

const msgTextarea = document.getElementById("message");
const charCount = document.getElementById("charCount");

if (msgTextarea && charCount) {
  msgTextarea.addEventListener("input", function () {
    const len = this.value.length;
    charCount.textContent = len + " / 500";
    charCount.classList.toggle("warn", len > 420);
  });
}

function showToast(message, type, duration) {
  type = type || "info";
  duration = duration || 4000;

  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, duration);
}

const form = document.getElementById("contactForm");

function validateField(id) {
  const el = document.getElementById(id);
  const err = document.getElementById(id + "-error");
  if (!el || !err) return true;

  const val = el.value.trim();
  let invalid = false;

  switch (id) {
    case "fname":
    case "lname":
      invalid = val.length === 0;
      break;
    case "email":
      invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      break;
    case "phone":
      invalid = val !== "" && !/^[\d\s+\-(). ]{7,20}$/.test(val);
      break;
    case "subject":
      invalid = val === "";
      break;
    case "message":
      invalid = val.length === 0;
      break;
    default:
      invalid = false;
  }

  el.classList.toggle("error", invalid);
  err.classList.toggle("show", invalid);
  return !invalid;
}

["fname", "lname", "email", "phone", "subject", "message"].forEach(function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("blur", function () { validateField(id); });
  el.addEventListener("input", function () {
    if (el.classList.contains("error")) validateField(id);
  });
});

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = ["fname", "lname", "email", "phone", "subject", "message"];
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      showToast("Please fix the highlighted fields before sending.", "error");
      const firstError = form.querySelector("input.error, select.error, textarea.error");
      if (firstError) firstError.scrollIntoView();
      return;
    }

    const btn = document.getElementById("submitBtn");
    if (btn) {
      btn.classList.add("loading");
      btn.disabled = true;
    }

    setTimeout(function () {
      if (btn) {
        btn.classList.remove("loading");
        btn.disabled = false;
      }

      const submission = {
        name: document.getElementById("fname").value.trim() + " " + document.getElementById("lname").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value.trim(),
        timestamp: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem("stamina_contact_submissions") || "[]");
        existing.push(submission);
        localStorage.setItem("stamina_contact_submissions", JSON.stringify(existing));
      } catch (err) {
        console.warn("localStorage write failed:", err);
      }

      form.reset();
      if (charCount) charCount.textContent = "0 / 500";
      showToast("Message sent! We'll get back to you within 24 hours.", "success", 5000);
    }, 0);
  });
}