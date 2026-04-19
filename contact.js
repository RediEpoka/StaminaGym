document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }
});

const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 320);
});

const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function closeMobileMenu() {
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  mobileOverlay?.classList.toggle('open');
});
mobileOverlay?.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ==============================
   BACK TO TOP
============================== */
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==============================
   TOAST NOTIFICATION SYSTEM
============================== */
function showToast(message, type = 'info', duration = 4200) {
  const icons = {
    success: 'fa-circle-check',
    error:   'fa-circle-xmark',
    info:    'fa-circle-info'
  };
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);
}

window.showToast = showToast;

/* ==============================
   HIGHLIGHT TODAY'S OPENING HOURS
============================== */
(function highlightToday() {
  const dayIndex = new Date().getDay();
  const rows = document.querySelectorAll('.hours-table tbody tr');
  if (!rows.length) return;

  let targetRow = null;
  if (dayIndex >= 1 && dayIndex <= 5) targetRow = rows[0];
  else if (dayIndex === 6)             targetRow = rows[1];
  else                                 targetRow = rows[2];

  if (targetRow) {
    targetRow.classList.add('today');
    const dayCell = targetRow.querySelector('td');
    if (dayCell) {
      const badge = document.createElement('span');
      badge.className = 'today-badge';
      badge.textContent = 'Today';
      dayCell.appendChild(badge);
    }
  }
})();

/* ==============================
   AUTO-FORMAT PHONE NUMBER
============================== */
const phoneInput = document.getElementById('phone');
phoneInput?.addEventListener('input', function () {
  let val = this.value.replace(/[^\d+]/g, '');
  if (val.startsWith('+355') && val.length > 4) {
    const digits = val.slice(4);
    let formatted = '+355';
    if (digits.length > 0) formatted += ' ' + digits.slice(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 9);
    val = formatted;
  }
  this.value = val;
});

/* ==============================
   CHARACTER COUNTER (message field)
============================== */
const msgTextarea = document.getElementById('message');
const charCount   = document.getElementById('charCount');

msgTextarea?.addEventListener('input', function () {
  const len = this.value.length;
  if (charCount) {
    charCount.textContent = `${len} / 500`;
    charCount.classList.toggle('warn', len > 420);
  }
});

/* ==============================
   COPY TO CLIPBOARD (double-click)
============================== */
document.querySelectorAll('.info-card-body a').forEach(link => {
  link.addEventListener('dblclick', (e) => {
    // Don't copy on address link — it navigates to the map
    if (link.classList.contains('address-link')) return;
    e.preventDefault();
    const text = link.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied: ${text}`, 'info', 2500);
    }).catch(() => {
      showToast('Could not copy to clipboard.', 'error', 2500);
    });
  });
});

/* ==============================
   FORM VALIDATION
============================== */
const form = document.getElementById('contactForm');

function validateField(id) {
  const el  = document.getElementById(id);
  const err = document.getElementById(`${id}-error`);
  if (!el || !err) return true;

  const val = el.value.trim();
  let invalid = false;

  switch (id) {
    case 'fname':
    case 'lname':
      invalid = val.length === 0;
      break;
    case 'email':
      invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      break;
    case 'phone':
      invalid = val !== '' && !/^[\d\s+\-(). ]{7,20}$/.test(val);
      break;
    case 'subject':
      invalid = val === '';
      break;
    case 'message':
      invalid = val.length === 0;
      break;
    default:
      invalid = false;
  }

  el.classList.toggle('error', invalid);
  err.classList.toggle('show', invalid);
  return !invalid;
}

['fname', 'lname', 'email', 'phone', 'subject', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', () => validateField(id));
  el.addEventListener('input', () => {
    if (el.classList.contains('error')) validateField(id);
  });
});

/* ==============================
   FORM SUBMIT
============================== */
form?.addEventListener('submit', function (e) {
  e.preventDefault();

  const fields   = ['fname', 'lname', 'email', 'phone', 'subject', 'message'];
  const allValid = fields.map(validateField).every(Boolean);

  if (!allValid) {
    showToast('Please fix the highlighted fields before sending.', 'error');
    const firstError = form.querySelector('input.error, select.error, textarea.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const btn = document.getElementById('submitBtn');
  if (btn) {
    btn.classList.add('loading');
    btn.disabled = true;
  }

  setTimeout(() => {
    if (btn) {
      btn.classList.remove('loading');
      btn.disabled = false;
    }

    const submission = {
      name:      `${document.getElementById('fname').value.trim()} ${document.getElementById('lname').value.trim()}`,
      email:     document.getElementById('email').value.trim(),
      phone:     document.getElementById('phone').value.trim(),
      subject:   document.getElementById('subject').value,
      message:   document.getElementById('message').value.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('jefit_contact_submissions') || '[]');
      existing.push(submission);
      localStorage.setItem('jefit_contact_submissions', JSON.stringify(existing));
    } catch (err) {
      console.warn('localStorage write failed:', err);
    }

    form.reset();
    if (charCount) charCount.textContent = '0 / 500';

    showToast("Message sent! We'll get back to you within 24 hours.", 'success', 5500);
  }, 1900);
});