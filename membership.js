/* ── 1. Pricing Data ──────────────────────────── */
const prices = {
  basic:    { monthly: 19,  yearly: 14  },
  standard: { monthly: 39,  yearly: 29  },
  premium:  { monthly: 89,  yearly: 52  },
  vip:      { monthly: 119, yearly: 99  },
};

/* ── 2. Hardcoded promo codes for demo ────────── */
const PROMO_CODES = {
  'STAMINA10':  { discount: '10% off your first 3 months', valid: true },
  'STUDENT20':  { discount: '20% off for students — applied!', valid: true },
  'LAUNCH25':   { discount: '25% off — founding member rate locked in!', valid: true },
  'SUMMER2025': { discount: 'Free month added to yearly billing!', valid: true },
};

/* ── 3. Monthly/Yearly Toggle ─────────────────── */
let isYearly = false;

document.getElementById('billing-toggle').addEventListener('change', function () {
  isYearly = this.checked;
  /* Update active label style */
  document.getElementById('lbl-monthly').classList.toggle('active', !isYearly);
  document.getElementById('lbl-yearly').classList.toggle('active', isYearly);
  updatePrices();
});

/* Animate price numbers with ease-in-out quad (count up/down) */
function animatePrice(el, from, to) {
  const duration = 300;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function updatePrices() {
  document.querySelectorAll('.plan-price').forEach(el => {
    const plan = el.closest('.plan-card').dataset.plan;
    const from = parseInt(el.textContent);
    const to   = isYearly ? prices[plan].yearly : prices[plan].monthly;
    animatePrice(el, from, to);
  });

  /* Update yearly-savings note below each price */
  Object.keys(prices).forEach(plan => {
    const noteEl = document.getElementById('note-' + plan);
    if (!noteEl) return;
    if (isYearly) {
      const saved = (prices[plan].monthly - prices[plan].yearly) * 12;
      noteEl.textContent = `Billed yearly — save $${saved}/yr`;
    } else {
      noteEl.textContent = '';
    }
  });
}

/* ── 4. FAQ Accordion ─────────────────────────── */
const faqs = [
  { q: 'Can I cancel my membership at any time?', a: 'Yes. All plans are month-to-month — there are no long-term commitments. You can cancel anytime from your member dashboard and your access continues through the end of the billing period.' },
  { q: 'How does the 30-day money-back guarantee work?', a: 'If you\'re not completely satisfied within your first 30 days, contact our support team and we\'ll process a full refund — no questions asked. The guarantee applies to your first membership period only.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely. Upgrades take effect immediately (prorated for the remainder of your billing cycle). Downgrades take effect at the start of your next billing period.' },
  { q: 'Is there a joining fee?', a: 'No joining fee, no admin fee, no hidden charges. The price you see is the price you pay — full stop.' },
  { q: 'How do I qualify for the student discount?', a: 'Present a valid student ID or enrollment letter at the front desk or upload it during online sign-up. Use promo code STUDENT20 at checkout. The discount applies for up to 12 months and is renewable.' },
  { q: 'Are group classes included in all plans?', a: 'Group classes are available from the Standard plan and above. Basic members can purchase drop-in class credits at a discounted rate.' },
  { q: 'Can I bring a guest?', a: 'VIP members receive 3 guest passes per month. Other members can purchase day passes for guests at the front desk at a discounted member rate.' },
  { q: 'Is there a family or corporate discount?', a: 'Yes! Corporate wellness partnerships and family bundle pricing are available — contact us directly for a custom quote tailored to your team or family size.' },
];

/* Inject FAQ items into the DOM on load */
const faqList = document.getElementById('faq-list');
faqs.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'faq-item';
  div.innerHTML = `
    <button class="faq-question" aria-expanded="false" onclick="toggleFaq(this)">
      ${item.q}
      <span class="faq-arrow">+</span>
    </button>
    <div class="faq-answer" id="faq-ans-${i}">
      <p>${item.a}</p>
    </div>`;
  faqList.appendChild(div);
});

/* Expand/collapse with max-height animation; only one open at a time */
function toggleFaq(btn) {
  const ans    = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  /* Close all others first */
  document.querySelectorAll('.faq-question.open').forEach(b => {
    b.classList.remove('open');
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling.style.maxHeight = null;
  });

  if (!isOpen) {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    ans.style.maxHeight = ans.scrollHeight + 'px';
  }
}

/* ── 5. Promo Code Validation ─────────────────── */
function validatePromo() {
  const raw   = document.getElementById('promo-input').value.trim().toUpperCase();
  const msgEl = document.getElementById('promo-msg');

  if (!raw) {
    msgEl.textContent = 'Please enter a promo code.';
    msgEl.className   = 'promo-msg error';
    return;
  }

  const match = PROMO_CODES[raw];
  if (match) {
    msgEl.textContent = '🎉 ' + match.discount;
    msgEl.className   = 'promo-msg success';
  } else {
    msgEl.textContent = '✕ Invalid code. Try STAMINA10, STUDENT20, or LAUNCH25.';
    msgEl.className   = 'promo-msg error';
  }
}

/* Allow Enter key to trigger promo validation */
document.getElementById('promo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') validatePromo();
});

/* ── 6. Compare Modal ─────────────────────────── */
function openModal() {
  /* Clone comparison table rows into modal to keep both in sync */
  const srcRows = document.querySelectorAll('#compare .compare-table tbody tr');
  const dest    = document.getElementById('modal-table-body');
  dest.innerHTML = '';
  srcRows.forEach(row => dest.appendChild(row.cloneNode(true)));

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* Close when clicking the dark backdrop (not the modal box itself) */
function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

/* Keyboard shortcut: Escape closes modal */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── 7. Smooth scroll to signup ───────────────── */
function scrollToSignup() {
  document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
}