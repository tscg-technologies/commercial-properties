/**
 * COMMERCIAL PROPERTIES - CORE SCRIPT
 * Vanilla JavaScript implementation for interactive features,
 * mock property store, filtering, search, modal enquiry, and UX animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initBackToTop();
  initFaqAccordion();
  initEnquiryModal();
  initContactForms();
  initFavourites();
  
  // Page-specific initializers
  loadAutoImageManifest().then(() => {
    if (document.getElementById('propertiesGrid') || document.getElementById('homePropertiesGrid')) {
      initPropertyCatalog();
    }
    if (document.getElementById('propertyGalleryMain')) {
      initPropertyGallery();
    }
  });

  if (document.getElementById('heroSearchForm')) {
    initHeroSearch();
  }
});

/* ==========================================================================
   0. AUTOMATIC IMAGE MANIFEST LOADER
   Loads any images downloaded with Google Flow raw names
   ========================================================================== */
let IMAGE_MANIFEST = {};

async function loadAutoImageManifest() {
  try {
    const res = await fetch('assets/images/manifest.json');
    if (res.ok) {
      IMAGE_MANIFEST = await res.json();
      COMMERCIAL_PROPERTIES.forEach(p => {
        if (IMAGE_MANIFEST[p.id]) {
          p.imageUrl = IMAGE_MANIFEST[p.id];
        }
      });
    }
  } catch (e) {
    // Falls back gracefully to CSS placeholders when no manifest or running via file://
  }
}
/* ==========================================================================
   1. SAMPLE COMMERCIAL PROPERTY DATA (MOCK STORE)
   Generic Demo Listings for Offices, Retail, Industrial, Warehouses
   ========================================================================== */
const COMMERCIAL_PROPERTIES = [
  {
    id: 'CP-101',
    title: 'Grade-A Corporate Tower Floor',
    category: 'office',
    categoryLabel: 'Office Space',
    purpose: 'rent',
    location: 'Central Business District, Demo Zone 01',
    area: 6500,
    areaFormatted: '6,500 sq.ft.',
    priceValue: 420000,
    priceFormatted: '₹4,20,000 / mo',
    priceNote: 'Sample lease value',
    featured: true,
    imageUrl: 'assets/images/office-01.jpg',
    description: 'Fully furnished corporate office floor featuring modern workstations, private executive cabins, conference suites, and panoramic city views.',
    specifications: {
      floor: '14th Floor (Out of 28)',
      furnishing: 'Fully Furnished (Plug & Play)',
      parking: '6 Reserved Stacks',
      possession: 'Immediate Demo',
      powerBackup: '100% DG Backup',
      ac: 'Centralized HVAC'
    },
    icon: '🏢',
    tag: 'Office Space Image'
  },
  {
    id: 'CP-102',
    title: 'High-Street Corner Retail Shop',
    category: 'retail',
    categoryLabel: 'Retail & Showrooms',
    purpose: 'rent',
    location: 'Metro Avenue Commercial Hub, Demo Zone 02',
    area: 2800,
    areaFormatted: '2,800 sq.ft.',
    priceValue: 280000,
    priceFormatted: '₹2,80,000 / mo',
    priceNote: 'Sample retail lease',
    featured: true,
    imageUrl: 'assets/images/Shoppers_walking_past_retail_sto._a1f7f7ee.jpg',
    description: 'Prominent corner retail space with double-height glass frontage, heavy daily footfall, and prime visibility in an established commercial arcade.',
    specifications: {
      floor: 'Ground Floor',
      furnishing: 'Warm Shell Ready',
      parking: 'Dedicated Customer Parking',
      possession: 'Ready to Occupy',
      powerBackup: 'Dedicated 40 KVA',
      frontage: '45 Feet Frontage'
    },
    icon: '🛍️',
    tag: 'Retail Property Image'
  },
  {
    id: 'CP-103',
    title: 'Modern Logistics & Distribution Hub',
    category: 'industrial',
    categoryLabel: 'Warehouses & Industrial',
    purpose: 'rent',
    location: 'Logistics Corridor Park, Demo Sector 08',
    area: 45000,
    areaFormatted: '45,000 sq.ft.',
    priceValue: 950000,
    priceFormatted: '₹9,50,000 / mo',
    priceNote: 'Sample warehouse rate',
    featured: true,
    imageUrl: 'assets/images/Logistics_warehouse_with_loading._6003171f.jpg',
    description: 'Engineered grade-A warehouse with 12m clear height, laser-screed FM2 flooring, dock levelers, fire sprinkler safety, and 24/7 truck movement access.',
    specifications: {
      ceilingHeight: '12 Meters Clear',
      loadingDocks: '6 Automated Bays',
      floorLoad: '5 Ton / sq.m.',
      fireProtection: 'NFPA Sprinklers',
      security: 'CCTV & Guarded Access',
      parking: 'Trailer Staging Area'
    },
    icon: '🏭',
    tag: 'Warehouse Image'
  },
  {
    id: 'CP-104',
    title: 'Commercial Multi-Story Plaza Building',
    category: 'commercial-building',
    categoryLabel: 'Commercial Buildings',
    purpose: 'buy',
    location: 'Ring Road Commercial Belt, Demo Zone 04',
    area: 28000,
    areaFormatted: '28,000 sq.ft.',
    priceValue: 350000000,
    priceFormatted: '₹35.0 Cr',
    priceNote: 'Sample purchase price',
    featured: true,
    imageUrl: 'assets/images/COMMERCIAL_PROPERTIES_b782fce8.jpg',
    description: 'Standalone 5-story institutional commercial building ideal for corporate headquarters, financial banking centers, or educational institutions.',
    specifications: {
      floors: 'G + 4 Floors + Basement',
      plotArea: '1,200 sq.yards',
      parking: '35 Car Slots',
      lifts: '2 High Speed Elevators',
      occupancy: 'Vacant Possession',
      buildingAge: 'New Demo Structure'
    },
    icon: '🏛️',
    tag: 'Commercial Building Image'
  },
  {
    id: 'CP-105',
    title: 'Boutique Tech Co-Working Space',
    category: 'office',
    categoryLabel: 'Office Space',
    purpose: 'rent',
    location: 'Cyber Gateway Boulevard, Demo Hub 05',
    area: 4200,
    areaFormatted: '4,200 sq.ft.',
    priceValue: 260000,
    priceFormatted: '₹2,60,000 / mo',
    priceNote: 'Sample lease value',
    featured: false,
    imageUrl: 'assets/images/office-02.jpg',
    description: 'Vibrant workspace with hot-desks, collaborative breakout lounges, high-speed fiber infrastructure, podcast room, and cafeteria access.',
    specifications: {
      capacity: '65 Workstations',
      meetingRooms: '3 Conference Rooms',
      powerBackup: 'N+1 Redundancy',
      internet: 'Dual Fiber Backbone',
      airConditioning: 'Smart Inverter VRV',
      cafeteria: 'In-house Pantry'
    },
    icon: '💻',
    tag: 'Office Space Image'
  },
  {
    id: 'CP-106',
    title: 'Automobile & Lifestyle Showroom',
    category: 'retail',
    categoryLabel: 'Retail & Showrooms',
    purpose: 'buy',
    location: 'Main Highway Expressway, Demo Sector 12',
    area: 11500,
    areaFormatted: '11,500 sq.ft.',
    priceValue: 145000000,
    priceFormatted: '₹14.5 Cr',
    priceNote: 'Sample sale value',
    featured: false,
    imageUrl: 'assets/images/Automobile_showroom_along_expres._092dab8f.jpg',
    description: 'Expansive glass-front showroom with customer display floors, service ramp entrance, customer hospitality lounge, and wide service apron.',
    specifications: {
      floorPlan: 'Ground + Mezzanine',
      frontage: '90 Feet Clear Road Facing',
      flooring: 'Heavy Duty Vitrified',
      ceilingHeight: '6.5 Meters',
      powerLoad: '60 KVA sanctioned',
      parking: '20 Surface Slots'
    },
    icon: '🚗',
    tag: 'Showroom Image'
  },
  {
    id: 'CP-107',
    title: 'Industrial Manufacturing Shed & Yard',
    category: 'industrial',
    categoryLabel: 'Warehouses & Industrial',
    purpose: 'buy',
    location: 'Heavy Industrial Estate, Demo Zone 07',
    area: 32000,
    areaFormatted: '32,000 sq.ft.',
    priceValue: 185000000,
    priceFormatted: '₹18.5 Cr',
    priceNote: 'Sample industrial price',
    featured: false,
    imageUrl: 'assets/images/Industrial_manufacturing_shed_wi._4c04c6f2.jpg',
    description: 'Heavy engineering industrial shed equipped with 10-ton EOT crane gantry provision, heavy power substation, and internal concrete driveways.',
    specifications: {
      craneCapacity: 'Provision for 10T EOT',
      powerLoad: '250 KVA Substation',
      shedHeight: '10.5 Meters Eaves',
      openYard: '8,000 sq.ft. Paved Yard',
      waterConnection: 'Industrial Supply',
      workerFacility: 'Admin & Locker Blocks'
    },
    icon: '⚙️',
    tag: 'Industrial Property Image'
  },
  {
    id: 'CP-108',
    title: 'Executive Business Center Suite',
    category: 'office',
    categoryLabel: 'Office Space',
    purpose: 'rent',
    location: 'Financial District North, Demo Zone 03',
    area: 1850,
    areaFormatted: '1,850 sq.ft.',
    priceValue: 145000,
    priceFormatted: '₹1,45,000 / mo',
    priceNote: 'Sample lease value',
    featured: false,
    imageUrl: 'assets/images/office-03.jpg',
    description: 'Compact executive office layout tailored for consulting firms, legal practices, or branch offices with reception and 4 manager chambers.',
    specifications: {
      layout: '4 Cabins + 12 Desks',
      security: 'Biometric Access',
      pantry: 'Wet Pantry & Restrooms',
      floor: '6th Floor East Wing',
      parking: '2 Covered Slots',
      maintenance: 'Included in Lease'
    },
    icon: '📊',
    tag: 'Office Space Image'
  }
];

/* ==========================================================================
   2. HEADER & NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking outside or clicking any nav link
  const links = drawer.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.remove('is-active');
    });
  });
}

/* ==========================================================================
   3. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btt = document.getElementById('backToTop');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.add('is-visible');
    } else {
      btt.classList.remove('is-visible');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   4. ACCORDION (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open accordions in the same list
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   5. PROPERTY CATALOG RENDERING, FILTERING & SORTING
   ========================================================================== */
function createPropertyCardHtml(prop) {
  const favs = getFavourites();
  const isFav = favs.includes(prop.id);
  const badgeClass = prop.purpose === 'rent' ? 'badge-rent' : 'badge-buy';
  const badgeText = prop.purpose === 'rent' ? 'For Lease / Rent' : 'For Sale';

  const imageHtml = prop.imageUrl ? `
    <div class="property-image-placeholder has-image">
      <img src="${prop.imageUrl}" alt="${prop.title}" class="property-image" loading="lazy" onerror="this.parentElement.classList.remove('has-image'); this.remove();">
    </div>
  ` : `
    <div class="property-image-placeholder">
      <div class="placeholder-icon">${prop.icon}</div>
      <span>${prop.tag}</span>
    </div>
  `;

  return `
    <article class="property-card" data-id="${prop.id}">
      <div class="card-image-wrap">
        <div class="card-badges">
          <span class="badge ${badgeClass}">${badgeText}</span>
          <span class="badge badge-demo">Demo</span>
        </div>
        <button class="card-fav-btn ${isFav ? 'favorited' : ''}" 
                onclick="toggleFavourite('${prop.id}', event)" 
                title="Save as favourite" 
                aria-label="Toggle favourite">
          ${isFav ? '★' : '☆'}
        </button>
        <!-- Replace this placeholder with the property image -->
        ${imageHtml}
      </div>
      <div class="card-content">
        <div class="card-category-tag">${prop.categoryLabel}</div>
        <h3 class="card-title">
          <a href="property-details.html?id=${prop.id}">${prop.title}</a>
        </h3>
        <p class="card-location">📍 ${prop.location}</p>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1rem; line-height: 1.5;">
          ${prop.description.substring(0, 95)}...
        </p>
        <div class="card-specs-row">
          <div class="spec-item">
            <span class="spec-label">Area</span>
            <span class="spec-val">${prop.areaFormatted}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Type</span>
            <span class="spec-val">${prop.categoryLabel.split(' ')[0]}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Status</span>
            <span class="spec-val">Available Demo</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-price-wrap">
            <span class="card-price-label">Price (${prop.priceNote})</span>
            <span class="card-price-val">${prop.priceFormatted}</span>
          </div>
          <div class="card-actions">
            <a href="property-details.html?id=${prop.id}" class="btn btn-outline btn-sm">Details</a>
            <button type="button" class="btn btn-primary btn-sm" onclick="openEnquiryModal('${prop.title}')">Enquire</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function initPropertyCatalog() {
  const grid = document.getElementById('propertiesGrid');
  const homeGrid = document.getElementById('homePropertiesGrid');
  const countEl = document.getElementById('propertyCount');

  // If on home page, render featured only
  if (homeGrid) {
    const featured = COMMERCIAL_PROPERTIES.filter(p => p.featured);
    homeGrid.innerHTML = featured.map(createPropertyCardHtml).join('');
    return;
  }

  if (!grid) return;

  // Filter input elements
  const categoryFilter = document.getElementById('filterCategory');
  const purposeFilter = document.getElementById('filterPurpose');
  const locationFilter = document.getElementById('filterLocation');
  const sortFilter = document.getElementById('filterSort');
  const minPriceFilter = document.getElementById('filterMinPrice');
  const maxPriceFilter = document.getElementById('filterMaxPrice');
  const minAreaFilter = document.getElementById('filterMinArea');
  const maxAreaFilter = document.getElementById('filterMaxArea');
  const resetBtn = document.getElementById('filterResetBtn');

  // Check URL parameters for pre-selected filters (e.g. from Hero Search)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('category') && categoryFilter) {
    categoryFilter.value = urlParams.get('category');
  }
  if (urlParams.get('purpose') && purposeFilter) {
    purposeFilter.value = urlParams.get('purpose');
  }
  if (urlParams.get('location') && locationFilter) {
    locationFilter.value = urlParams.get('location');
  }

  function applyFilters() {
    let filtered = [...COMMERCIAL_PROPERTIES];

    const category = categoryFilter ? categoryFilter.value : 'all';
    const purpose = purposeFilter ? purposeFilter.value : 'all';
    const loc = locationFilter ? locationFilter.value.trim().toLowerCase() : '';
    const minP = minPriceFilter && minPriceFilter.value ? parseFloat(minPriceFilter.value) : 0;
    const maxP = maxPriceFilter && maxPriceFilter.value ? parseFloat(maxPriceFilter.value) : Infinity;
    const minA = minAreaFilter && minAreaFilter.value ? parseFloat(minAreaFilter.value) : 0;
    const maxA = maxAreaFilter && maxAreaFilter.value ? parseFloat(maxAreaFilter.value) : Infinity;
    const sortBy = sortFilter ? sortFilter.value : 'default';

    filtered = filtered.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (purpose !== 'all' && p.purpose !== purpose) return false;
      if (loc && !p.location.toLowerCase().includes(loc) && !p.title.toLowerCase().includes(loc)) return false;
      if (p.priceValue < minP || p.priceValue > maxP) return false;
      if (p.area < minA || p.area > maxA) return false;
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'area-asc') {
      filtered.sort((a, b) => a.area - b.area);
    } else if (sortBy === 'area-desc') {
      filtered.sort((a, b) => b.area - a.area);
    }

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${COMMERCIAL_PROPERTIES.length} demo listings`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--color-border);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 0.5rem;">No Demo Properties Matched Your Criteria</h3>
          <p style="color: var(--color-muted); max-width: 480px; margin: 0 auto 1.5rem auto;">
            Try adjusting your budget range, area filters, or select "All Categories" to view available sample spaces.
          </p>
          <button type="button" class="btn btn-navy btn-sm" id="emptyStateResetBtn">Clear All Filters</button>
        </div>
      `;
      const emptyBtn = document.getElementById('emptyStateResetBtn');
      if (emptyBtn) emptyBtn.addEventListener('click', resetFilters);
    } else {
      grid.innerHTML = filtered.map(createPropertyCardHtml).join('');
    }
  }

  function resetFilters() {
    if (categoryFilter) categoryFilter.value = 'all';
    if (purposeFilter) purposeFilter.value = 'all';
    if (locationFilter) locationFilter.value = '';
    if (minPriceFilter) minPriceFilter.value = '';
    if (maxPriceFilter) maxPriceFilter.value = '';
    if (minAreaFilter) minAreaFilter.value = '';
    if (maxAreaFilter) maxAreaFilter.value = '';
    if (sortFilter) sortFilter.value = 'default';
    applyFilters();
  }

  // Attach event listeners
  [categoryFilter, purposeFilter, sortFilter].forEach(el => {
    if (el) el.addEventListener('change', applyFilters);
  });

  [locationFilter, minPriceFilter, maxPriceFilter, minAreaFilter, maxAreaFilter].forEach(el => {
    if (el) el.addEventListener('input', applyFilters);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  applyFilters();
}

/* ==========================================================================
   6. HERO SEARCH BAR (INDEX.HTML)
   ========================================================================== */
function initHeroSearch() {
  const form = document.getElementById('heroSearchForm');
  if (!form) return;

  const tabButtons = form.querySelectorAll('.search-tab-btn');
  let selectedPurpose = 'rent';

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPurpose = btn.getAttribute('data-purpose');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('heroCategory')?.value || 'all';
    const location = document.getElementById('heroLocation')?.value || '';
    const minBudget = document.getElementById('heroMinBudget')?.value || '';
    const maxBudget = document.getElementById('heroMaxBudget')?.value || '';

    const params = new URLSearchParams({
      category: category,
      purpose: selectedPurpose,
      location: location,
      minPrice: minBudget,
      maxPrice: maxBudget
    });

    window.location.href = `properties.html?${params.toString()}`;
  });
}

/* ==========================================================================
   7. PROPERTY GALLERY SYSTEM (PROPERTY DETAILS PAGE)
   ========================================================================== */
function initPropertyGallery() {
  const mainImage = document.getElementById('propertyGalleryMain');
  const thumbs = document.querySelectorAll('.gallery-thumb-placeholder');
  const mainLabel = document.getElementById('galleryMainLabel');

  if (!mainImage || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const label = thumb.getAttribute('data-label') || 'Property View';
      const icon = thumb.getAttribute('data-icon') || '🏢';
      
      if (mainLabel) mainLabel.textContent = label;
      const mainIconEl = document.getElementById('galleryMainIcon');
      if (mainIconEl) mainIconEl.textContent = icon;
    });
  });
}

/* ==========================================================================
   8. FAVOURITES MANAGEMENT (LOCAL STORAGE / VANILLA STATE)
   ========================================================================== */
function getFavourites() {
  try {
    const raw = localStorage.getItem('cp_favourites');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function toggleFavourite(propertyId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  let favs = getFavourites();
  const index = favs.indexOf(propertyId);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(propertyId);
  }
  try {
    localStorage.setItem('cp_favourites', JSON.stringify(favs));
  } catch (e) {}

  // Update button state on screen
  const buttons = document.querySelectorAll(`.property-card[data-id="${propertyId}"] .card-fav-btn`);
  buttons.forEach(btn => {
    const isNowFav = favs.includes(propertyId);
    btn.classList.toggle('favorited', isNowFav);
    btn.innerHTML = isNowFav ? '★' : '☆';
  });
}

function initFavourites() {
  // Sync state if any cards already exist
  const favs = getFavourites();
  favs.forEach(id => {
    const card = document.querySelector(`.property-card[data-id="${id}"] .card-fav-btn`);
    if (card) {
      card.classList.add('favorited');
      card.innerHTML = '★';
    }
  });
}

/* ==========================================================================
   9. ENQUIRY MODAL (GLOBAL POPUP)
   ========================================================================== */
function initEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const form = document.getElementById('modalEnquiryForm');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeEnquiryModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeEnquiryModal();
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeEnquiryModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateModalForm(form)) {
        const successNotice = document.getElementById('modalSuccessAlert');
        if (successNotice) {
          successNotice.style.display = 'block';
          form.reset();
          setTimeout(() => {
            successNotice.style.display = 'none';
            closeEnquiryModal();
          }, 3500);
        }
      }
    });
  }
}

function openEnquiryModal(propertyTitle = '') {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;

  const propInput = document.getElementById('modalPropertyInterest');
  if (propInput && propertyTitle) {
    propInput.value = propertyTitle;
  }

  const successNotice = document.getElementById('modalSuccessAlert');
  if (successNotice) successNotice.style.display = 'none';

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

function validateModalForm(form) {
  let isValid = true;
  const name = form.querySelector('[name="fullName"]');
  const email = form.querySelector('[name="email"]');
  const phone = form.querySelector('[name="phone"]');

  if (name && !name.value.trim()) {
    showInputError(name, 'Please enter your full name');
    isValid = false;
  } else if (name) {
    clearInputError(name);
  }

  if (email && !validateEmail(email.value.trim())) {
    showInputError(email, 'Please enter a valid email address');
    isValid = false;
  } else if (email) {
    clearInputError(email);
  }

  if (phone && !validatePhone(phone.value.trim())) {
    showInputError(phone, 'Please enter a valid 10-digit phone number');
    isValid = false;
  } else if (phone) {
    clearInputError(phone);
  }

  return isValid;
}

/* ==========================================================================
   10. CONTACT & INLINE ENQUIRY FORMS VALIDATION
   ========================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = form.querySelector('[name="fullName"]');
      const emailInput = form.querySelector('[name="email"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const messageInput = form.querySelector('[name="message"]');

      if (nameInput && !nameInput.value.trim()) {
        showInputError(nameInput, 'Full name is required');
        isValid = false;
      } else if (nameInput) clearInputError(nameInput);

      if (emailInput && !validateEmail(emailInput.value.trim())) {
        showInputError(emailInput, 'Enter a valid email address');
        isValid = false;
      } else if (emailInput) clearInputError(emailInput);

      if (phoneInput && !validatePhone(phoneInput.value.trim())) {
        showInputError(phoneInput, 'Enter a valid contact number');
        isValid = false;
      } else if (phoneInput) clearInputError(phoneInput);

      if (messageInput && !messageInput.value.trim()) {
        showInputError(messageInput, 'Please specify your commercial requirements');
        isValid = false;
      } else if (messageInput) clearInputError(messageInput);

      if (isValid) {
        const successBox = form.querySelector('.form-alert');
        if (successBox) {
          successBox.style.display = 'block';
          form.reset();
          setTimeout(() => {
            successBox.style.display = 'none';
          }, 4500);
        }
      }
    });
  });
}

function showInputError(input, message) {
  input.style.borderColor = 'var(--color-error)';
  let feedback = input.parentElement.querySelector('.form-feedback');
  if (feedback) {
    feedback.textContent = message;
    feedback.classList.add('is-error');
  }
}

function clearInputError(input) {
  input.style.borderColor = 'var(--color-border)';
  let feedback = input.parentElement.querySelector('.form-feedback');
  if (feedback) {
    feedback.textContent = '';
    feedback.classList.remove('is-error');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length >= 7 && clean.length <= 14;
}

// Global modal triggers exposure
window.openEnquiryModal = openEnquiryModal;
window.closeEnquiryModal = closeEnquiryModal;
window.toggleFavourite = toggleFavourite;
