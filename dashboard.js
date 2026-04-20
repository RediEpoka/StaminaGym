// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
let authScreen, dashboardScreen, loginError, signupError;

window.addEventListener('DOMContentLoaded', () => {
  authScreen      = document.getElementById('auth-screen');
  dashboardScreen = document.getElementById('dashboard-screen');
  loginError      = document.getElementById('login-error');
  signupError     = document.getElementById('signup-error');

  const user = getUser();
  if (user) showDashboard(user);

  renderBookings();
});

// ═══════════════════════════════════════
// TAB SWITCH
// ═══════════════════════════════════════
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('form-login').style.display  = isLogin ? 'flex' : 'none';
  document.getElementById('form-signup').style.display = isLogin ? 'none' : 'flex';
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-signup').classList.toggle('active', !isLogin);
  loginError.style.display  = 'none';
  signupError.style.display = 'none';
}

// ═══════════════════════════════════════
// SIGN UP
// ═══════════════════════════════════════
function handleSignup(e) {
  e.preventDefault();
  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const plan     = document.getElementById('signup-plan').value;
  const goal     = document.getElementById('signup-goal').value;
  const phone    = document.getElementById('signup-phone').value.trim();
  const location = document.getElementById('signup-location').value.trim();

  // ── VALIDATION ──
  if (name.length < 2) {
    showError(signupError, '❌ Please enter your full name.');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    showError(signupError, '❌ Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    showError(signupError, '❌ Password must be at least 6 characters.');
    return;
  }

  if (!/[A-Z]/.test(password)) {
    showError(signupError, '❌ Password must contain at least one uppercase letter.');
    return;
  }

  if (!/[0-9]/.test(password)) {
    showError(signupError, '❌ Password must contain at least one number.');
    return;
  }

  if (!plan) {
    showError(signupError, '❌ Please select a membership plan.');
    return;
  }

  if (!goal) {
    showError(signupError, '❌ Please select a fitness goal.');
    return;
  }

  if (phone.length < 6) {
    showError(signupError, '❌ Please enter a valid phone number.');
    return;
  }

  if (location.length < 2) {
    showError(signupError, '❌ Please enter your city or location.');
    return;
  }

  // ── DUPLICATE CHECK ──
 const existing = getUser();
if (existing && existing.email === email) {
  showError(signupError, '❌ This email is already registered. Please sign in.');
  return;
}
  // ── SAVE ──
  const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  localStorage.setItem('sg_user', JSON.stringify({
    name, email, password, plan, goal,
    phone, location, memberSince: today
  }));

  // ── SUCCESS → go to login ──
  switchTab('login');
  loginError.style.display = 'block';
  loginError.style.color   = '#4ade80';
  loginError.textContent   = '✅ Account created! Sign in now.';
  document.getElementById('login-email').value = email;
}



// ═══════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════
function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const user     = getUser();

  if (!user || user.email !== email || user.password !== password) {
    loginError.style.color = '#f97373';
    showError(loginError, '❌ Invalid email or password.');
    return;
  }

  showDashboard(user);
}

// ═══════════════════════════════════════
// SHOW DASHBOARD
// ═══════════════════════════════════════
function showDashboard(user) {
  authScreen.style.display      = 'none';
  dashboardScreen.style.display = 'flex';

  // Header
  document.getElementById('dashboard-username').textContent = user.name;

  // Profile
  document.getElementById('profile-name').textContent     = user.name;
  document.getElementById('profile-email').textContent    = user.email;
  document.getElementById('profile-email-2').textContent  = user.email;
  document.getElementById('profile-goal').textContent     = user.goal     || 'Not set';
  document.getElementById('profile-plan').textContent     = user.plan     || 'Basic';
  document.getElementById('profile-since').textContent    = user.memberSince || 'N/A';
  document.getElementById('profile-badge').textContent    = user.plan     || 'Member';
  document.getElementById('profile-phone').textContent    = user.phone    || 'Not set';
  document.getElementById('profile-location').textContent = user.location || 'Not set';

  // Initials
  document.getElementById('profile-initials').textContent = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase();

  // Membership
  document.getElementById('membership-plan').textContent  = user.plan     || 'Basic';
  document.getElementById('membership-since').textContent = user.memberSince || 'N/A';
}

// ═══════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════
function handleLogout() {
  authScreen.style.display      = 'flex';
  dashboardScreen.style.display = 'none';
}

// ═══════════════════════════════════════
// SECTION SWITCHER
// ═══════════════════════════════════════
function showSection(name, btn) {
  document.querySelectorAll('.dash-main > div').forEach(s => s.style.display = 'none');
  document.getElementById('section-' + name).style.display = 'block';
  document.querySelectorAll('.dash-nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ═══════════════════════════════════════
// BOOKINGS
// ═══════════════════════════════════════
const defaultBookings = [
  { id: 1, name: 'Strength Training', day: 'Monday',    time: '08:00', trainer: 'Mark' },
  { id: 2, name: 'HIIT Burn',         day: 'Wednesday', time: '17:00', trainer: 'Sara' },
  { id: 3, name: 'Yoga & Stretch',    day: 'Friday',    time: '10:00', trainer: 'Lena' },
];

function getBookings() {
  const saved = localStorage.getItem('sg_bookings');
  return saved ? JSON.parse(saved) : defaultBookings;
}

function saveBookings(bookings) {
  localStorage.setItem('sg_bookings', JSON.stringify(bookings));
}

function renderBookings() {
  const list     = document.getElementById('bookings-list');
  const bookings = getBookings();

  if (!list) return;

  if (bookings.length === 0) {
    list.innerHTML = '<p style="color:var(--color-text-muted);font-size:var(--text-sm);">No bookings yet.</p>';
    return;
  }

  list.innerHTML = bookings.map(b => `
    <div class="booking-card" id="booking-${b.id}">
      <div class="booking-info">
        <h4>${b.name}</h4>
        <p>${b.day} at ${b.time} &nbsp;·&nbsp; Trainer: ${b.trainer}</p>
      </div>
      <button class="btn-cancel" onclick="cancelBooking(${b.id})">Cancel</button>
    </div>
  `).join('');
}

function cancelBooking(id) {
  let bookings = getBookings().filter(b => b.id !== id);
  saveBookings(bookings);
  renderBookings();
}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
function getUser() {
  return JSON.parse(localStorage.getItem('sg_user'));
}

function showError(el, msg) {
  el.textContent    = msg;
  el.style.display  = 'block';
}