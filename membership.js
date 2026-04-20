document.addEventListener('DOMContentLoaded', () => {

  const prices = {
    basic:    { monthly: 19,  yearly: 14  },
    standard: { monthly: 39,  yearly: 29  },
    premium:  { monthly: 89,  yearly: 52  },
    vip:      { monthly: 119, yearly: 99  },
  };

  const PROMO_CODES = {
    'STAMINA10':  { discount: '10% off your first 3 months', valid: true },
    'STUDENT20':  { discount: '20% off for students — applied!', valid: true },
    'LAUNCH25':   { discount: '25% off — founding member rate locked in!', valid: true },
    'SUMMER2025': { discount: 'Free month added to yearly billing!', valid: true },
  };

  let isYearly = false;

  const toggle = document.getElementById('billing-toggle');

  if (toggle) {
    toggle.addEventListener('change', function () {
      isYearly = this.checked;

      document.getElementById('lbl-monthly')?.classList.toggle('active', !isYearly);
      document.getElementById('lbl-yearly')?.classList.toggle('active', isYearly);

      updatePrices();
    });
  }

  function updatePrices() {
    document.querySelectorAll('.plan-price').forEach(el => {
      const card = el.closest('.plan-card');
      const plan = card?.dataset.plan;

      if (!plan || !prices[plan]) {
        console.warn('Invalid or missing plan:', plan);
        return;
      }

      const price = isYearly
        ? prices[plan].yearly
        : prices[plan].monthly;

      el.textContent = '$' + price;
    });

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

  /*  FAQ */

  const faqs = [
    { q: 'Can I cancel my membership at any time?', a: 'Yes. All plans are month-to-month — there are no long-term commitments. You can cancel anytime from your member dashboard and your access continues through the end of the billing period.' },
    { q: 'How does the 30-day money-back guarantee work?', a: 'If you\'re not completely satisfied within your first 30 days, contact our support team and we\'ll process a full refund — no questions asked.' },
    { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely. Upgrades take effect immediately (prorated). Downgrades take effect next billing period.' },
    { q: 'Is there a joining fee?', a: 'No joining fee, no hidden charges. The price you see is the price you pay.' },
  ];

  const faqList = document.getElementById('faq-list');

  if (faqList) {
    faqs.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'faq-item';
      div.innerHTML = `
        <button class="faq-question">
          ${item.q}
          <span class="faq-arrow">+</span>
        </button>
        <div class="faq-answer">
          <p>${item.a}</p>
        </div>
      `;

      const btn = div.querySelector('.faq-question');
      const ans = div.querySelector('.faq-answer');

      btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('open');

        document.querySelectorAll('.faq-question.open').forEach(b => {
          b.classList.remove('open');
          b.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
          btn.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });

      faqList.appendChild(div);
    });
  }

  /*  Promo */

  window.validatePromo = function () {
    const input = document.getElementById('promo-input');
    const msgEl = document.getElementById('promo-msg');

    if (!input || !msgEl) return;

    const raw = input.value.trim().toUpperCase();

    if (!raw) {
      msgEl.textContent = 'Please enter a promo code.';
      msgEl.className = 'promo-msg error';
      return;
    }

    const match = PROMO_CODES[raw];

    if (match) {
      msgEl.textContent =  match.discount;
      msgEl.className = 'promo-msg success';
    } else {
      msgEl.textContent = '✕ Invalid code.';
      msgEl.className = 'promo-msg error';
    }
  };

  document.getElementById('promo-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') validatePromo();
  });

  /* Modal */

  window.openModal = function () {
    const srcRows = document.querySelectorAll('#compare .compare-table tbody tr');
    const dest = document.getElementById('modal-table-body');

    if (!dest) return;

    dest.innerHTML = '';
    srcRows.forEach(row => dest.appendChild(row.cloneNode(true)));

    document.getElementById('modal-overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    document.getElementById('modal-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.closeModalOutside = function (e) {
    if (e.target === document.getElementById('modal-overlay')) {
      closeModal();
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /*  Scroll  */

  window.scrollToSignup = function () {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

 
  updatePrices();

});