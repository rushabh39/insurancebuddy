/**
 * InsuranceBuddy - Core JavaScript Logic
 * White & Blue Insurance Portal targeting USA & UK Audience
 */

document.addEventListener('DOMContentLoaded', () => {
  initRegionToggle();
  initInsuranceCalculator();
  initCategoryFilters();
  initSearch();
  initMobileNav();
  initForms();
  initQuoteModal();
});

// Current Active Region state: 'US' or 'UK'
let currentRegion = localStorage.getItem('ib_region') || 'US';

// Currency & Region Configuration
const REGION_DATA = {
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: '$',
    healthTerm: 'Deductible / Copay',
    healthSys: 'Private Healthcare & ACA / Medicare',
    lifeTerm: 'Term Life & 401(k) / Estate Plan',
    homeTerm: 'Homeowners (HO-3/HO-5) & Hazard',
    rates: {
      health: { standard: 320, premium: 580, family: 1150 },
      life: { standard: 45, premium: 85, estate: 190 },
      home: { standard: 110, premium: 195, comprehensive: 310 },
      auto: { standard: 135, premium: 240, full: 350 }
    }
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£',
    healthTerm: 'Policy Excess',
    healthSys: 'NHS & Private Medical Insurance (PMI)',
    lifeTerm: 'Level Term & Trust / IHT Protection',
    homeTerm: 'Buildings & Contents Cover',
    rates: {
      health: { standard: 65, premium: 140, family: 260 },
      life: { standard: 22, premium: 48, estate: 110 },
      home: { standard: 35, premium: 65, comprehensive: 115 },
      auto: { standard: 68, premium: 120, full: 185 }
    }
  }
};

/* ==========================================================================
   Region Switcher (US / UK)
   ========================================================================== */
function initRegionToggle() {
  const toggleBtns = document.querySelectorAll('.region-toggle-btn');
  if (!toggleBtns.length) return;

  function setRegion(region) {
    currentRegion = region;
    localStorage.setItem('ib_region', region);

    toggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.region === region);
    });

    // Update dynamic text and currencies on the page
    updateRegionElements();
    updateCalculatorEstimate();
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const reg = btn.dataset.region;
      setRegion(reg);
      showToast(`Switched view to ${reg === 'US' ? 'United States (USD $)' : 'United Kingdom (GBP £)'}`);
    });
  });

  // Init with stored region
  setRegion(currentRegion);
}

function updateRegionElements() {
  const data = REGION_DATA[currentRegion];
  document.querySelectorAll('[data-currency-symbol]').forEach(el => {
    el.textContent = data.currency;
  });

  document.querySelectorAll('[data-region-name]').forEach(el => {
    el.textContent = data.name;
  });

  document.querySelectorAll('[data-region-flag]').forEach(el => {
    el.textContent = data.flag;
  });

  // Show / hide country specific hints
  document.querySelectorAll('.region-sensitive-text').forEach(el => {
    if (el.dataset.forRegion) {
      el.style.display = (el.dataset.forRegion === currentRegion || el.dataset.forRegion === 'BOTH') ? '' : 'none';
    }
  });
}

/* ==========================================================================
   Interactive Insurance Estimate Calculator
   ========================================================================== */
function initInsuranceCalculator() {
  const typeSelect = document.getElementById('calc-insurance-type');
  const coverageSelect = document.getElementById('calc-coverage-tier');
  const ageInput = document.getElementById('calc-age-input');

  if (!typeSelect || !coverageSelect) return;

  [typeSelect, coverageSelect, ageInput].forEach(elem => {
    if (elem) elem.addEventListener('change', updateCalculatorEstimate);
    if (elem) elem.addEventListener('input', updateCalculatorEstimate);
  });

  updateCalculatorEstimate();
}

function updateCalculatorEstimate() {
  const typeSelect = document.getElementById('calc-insurance-type');
  const coverageSelect = document.getElementById('calc-coverage-tier');
  const ageInput = document.getElementById('calc-age-input');
  const priceDisplay = document.getElementById('calc-display-price');
  const intervalDisplay = document.getElementById('calc-display-interval');
  const noteDisplay = document.getElementById('calc-display-note');

  if (!typeSelect || !coverageSelect || !priceDisplay) return;

  const data = REGION_DATA[currentRegion];
  const type = typeSelect.value || 'health';
  const tier = coverageSelect.value || 'standard';
  const age = ageInput ? parseInt(ageInput.value, 10) || 35 : 35;

  let baseRate = data.rates[type][tier] || 100;
  
  // Age factor
  if (age > 45) {
    baseRate = Math.round(baseRate * (1 + (age - 45) * 0.025));
  } else if (age < 30) {
    baseRate = Math.round(baseRate * 0.88);
  }

  priceDisplay.textContent = `${data.currency}${baseRate}`;
  if (intervalDisplay) intervalDisplay.textContent = '/month avg';

  if (noteDisplay) {
    if (type === 'health') {
      noteDisplay.textContent = currentRegion === 'US' 
        ? 'Includes typical ACA Silver/Gold Benchmark with in-network co-insurance.' 
        : 'Private Medical Insurance (PMI) covering diagnostics, fast-track surgery, & top specialists.';
    } else if (type === 'life') {
      noteDisplay.textContent = currentRegion === 'US'
        ? 'Based on 20-year level term policy for healthy non-smoker ($500k coverage).'
        : 'Based on 20-year level term life policy with terminal illness benefit (£350k sum assured).';
    } else if (type === 'home') {
      noteDisplay.textContent = currentRegion === 'US'
        ? 'Standard HO-3 coverage for dwelling, liability, and personal property.'
        : 'Combined Buildings & Contents policy with accidental damage cover.';
    } else {
      noteDisplay.textContent = currentRegion === 'US'
        ? 'Comprehensive and collision coverage with $500 deductible.'
        : 'Fully comprehensive policy with protected no-claims bonus and windscreen cover.';
    }
  }
}

/* ==========================================================================
   Category Filter & Search
   ========================================================================== */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('.blog-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      cards.forEach(card => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const cards = document.querySelectorAll('.blog-card');

  if (!searchInput || !cards.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';
      const category = card.dataset.category?.toLowerCase() || '';

      if (title.includes(query) || excerpt.includes(query) || category.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = navLinks.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', expanded);
    toggleBtn.innerHTML = expanded ? '&#10005;' : '&#9776;';
  });
}

/* ==========================================================================
   Newsletter & Contact Forms
   ========================================================================== */
function initForms() {
  // Newsletter Forms
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`🎉 Success! You're subscribed to InsuranceBuddy's ${currentRegion} edition.`);
        input.value = '';
      }
    });
  });

  // Contact Form
  const contactForm = document.getElementById('insurance-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Valued User';
      showToast(`Thank you, ${name}! An InsuranceBuddy licensed advisor will reach out shortly.`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   Modal Quote Assistant
   ========================================================================== */
function initQuoteModal() {
  const modal = document.getElementById('quote-modal-overlay');
  const openBtns = document.querySelectorAll('.open-quote-modal');
  const closeBtn = document.querySelector('.modal-close');
  const form = document.getElementById('modal-quote-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.remove('active');
      showToast("🚀 Quote request sent! We're matching you with top US & UK carriers.");
      form.reset();
    });
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>ℹ️</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
