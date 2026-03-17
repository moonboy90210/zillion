/* ===================================================
   ZILLI ONLINE — Main Application JS
   =================================================== */

// =====================
// PRODUCT DATA
// =====================
const products = [
  // HEADWEAR
  { id: 1, name: 'Signature Wool Cap', category: 'Headwear', price: 89, badge: 'new', src: 'img/collection/woolcap.png' , icon: 'fa-hat-cowboy', desc: 'Premium merino wool, structured brim', sizes: ['S/M', 'M/L', 'XL'], colors: ['Black', 'Crimson', 'Grey'] },
  { id: 2, name: 'Zilli Logo Snapback', category: 'Headwear', price: 65, badge: 'hot', src: 'img/collection/snapback.png' , icon: 'fa-hat-cowboy', desc: 'Embroidered logo, adjustable strap', sizes: ['One Size'], colors: ['Black', 'White'] },
  { id: 3, name: 'Trucker Hat', category: 'Headwear', price: 75, badge: 'new', src: 'img/collection/trucker.png' , icon: 'fa-hat-cowboy', desc: 'Reversible satin finish, unisex fit', sizes: ['S', 'M', 'L'], colors: ['Black', 'Silver', 'Red'] },
  { id: 4, name: 'Beanie Luxe', category: 'Headwear', price: 55, badge: '', src: 'img/collection/beanie.png' , icon: 'fa-hat-cowboy', desc: 'Cashmere blend, ribbed knit', sizes: ['One Size'], colors: ['Black', 'Charcoal', 'Cream'] },
  // SHIRTS
  { id: 5, name: 'Midnight Oversized Tee', category: 'Shirts', price: 110, originalPrice: 140, badge: 'sale', icon: 'fa-shirt', desc: 'Heavyweight 320gsm cotton', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White', 'Crimson'] },
  { id: 6, name: 'Zilli Longline Shirt', category: 'Shirts', price: 145, badge: 'new', icon: 'fa-shirt', desc: 'Extended hem, slim fit, premium twill', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'White'] },
  { id: 7, name: 'Graphic Heritage Tee', category: 'Shirts', price: 95, badge: '', icon: 'fa-shirt', desc: 'Vintage wash, screen-printed graphic', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Grey'] },
  { id: 8, name: 'Cut-Off Linen Shirt', category: 'Shirts', price: 160, badge: 'new', src: 'img/collection/tt.png' , icon: 'fa-shirt', desc: 'Portuguese linen, relaxed fit', sizes: ['S', 'M', 'L', 'XL'], colors: ['Ivory', 'Black', 'Sage'] },
  // TRACKSUITS
  { id: 9, name: 'Noir Velour Tracksuit', category: 'Tracksuits', price: 320, badge: 'new', icon: 'fa-person-running', desc: 'Full velour set — jacket + trousers', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Navy', 'Burgundy'] },
  { id: 10, name: 'Tech-Fleece Set', category: 'Tracksuits', price: 280, originalPrice: 350, badge: 'sale', icon: 'fa-person-running', desc: 'Moisture-wicking fleece, tapered fit', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Charcoal'] },
  { id: 11, name: 'Satin Bomber Set', category: 'Tracksuits', price: 360, badge: 'hot', icon: 'fa-person-running', desc: 'Satin varsity jacket + jogger combo', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black/Red', 'Navy/Gold'] },
  { id: 12, name: 'Embossed Jogger Set', category: 'Tracksuits', price: 245, badge: '', icon: 'fa-person-running', desc: 'Embossed logo, ribbed cuffs', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Grey'] },
  // ACCESSORIES
  { id: 13, name: 'Leather Crossbody Bag', category: 'Accessories', price: 220, badge: 'new', icon: 'fa-bag-shopping', desc: 'Full-grain leather, gold hardware', sizes: ['One Size'], colors: ['Black', 'Tan'] },
  { id: 14, name: 'Zilli Chain Necklace', category: 'Accessories', price: 135, badge: '', icon: 'fa-circle', desc: 'Sterling silver, 18" Cuban link', sizes: ['One Size'], colors: ['Silver', 'Gold'] },
  { id: 15, name: 'Classic Leather Belt', category: 'Accessories', price: 95, badge: '', icon: 'fa-circle', desc: 'Italian full-grain leather, brushed buckle', sizes: ['30"', '32"', '34"', '36"', '38"'], colors: ['Black', 'Brown'] },
  { id: 16, name: 'Signature Sunglasses', category: 'Accessories', price: 175, badge: 'hot', icon: 'fa-glasses', desc: 'Acetate frames, UV400 lenses', sizes: ['One Size'], colors: ['Black', 'Tortoise', 'Clear'] },
];

// =====================
// CART STATE
// =====================
let cart = JSON.parse(localStorage.getItem('zilli-cart') || '[]');
let currentFilter = 'All';
let currentSort = 'default';
let currentView = 'grid';
let shippingCost = 0;

// =====================
// PAGE NAVIGATION
// =====================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById(`nav-${page}`);
  if (navEl) navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'cart') renderCart();
  if (page === 'collections') renderCollections();
  if (page === 'checkout') renderCheckoutSummary();
  if (page === 'home') renderBestPicks();
  initReveal();
}

function scrollToAbout() {
  document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
}

function showCollectionFilter(cat) {
  showPage('collections');
  setTimeout(() => {
    const tab = [...document.querySelectorAll('.filter-tab')].find(t => t.textContent.trim() === cat || t.textContent.trim().includes(cat));
    if (tab) tab.click();
  }, 100);
}

// =====================
// NAVBAR SCROLL
// =====================
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.classList.toggle('scrolled', window.scrollY > 50);
});

// =====================
// MOBILE MENU
// =====================
function toggleMobile() {
  const menu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// =====================
// PRODUCT CARD BUILDER
// =====================
function buildProductCard(p, index = 0) {
  const delay = (index % 8) * 0.06;
  const badgeHtml = p.badge ? `<div class="product-card-badge badge-${p.badge}">${p.badge.toUpperCase()}</div>` : '';
  const originalHtml = p.originalPrice ? `<span class="price-original">$${p.originalPrice}</span><span class="price-discount">${Math.round((1 - p.price / p.originalPrice) * 100)}% OFF</span>` : '';

  return `
    <div class="product-card reveal" style="transition-delay: ${delay}s;" onclick="void(0)">
      <div class="product-card-img">
        <img class="placeholder" src="${p.src}" alt="${p.name}">
          <i class="fa-solid ${p.icon}"></i>
          ${p.name} 
        </img>
        ${badgeHtml}
        <button class="product-card-wishlist" onclick="event.stopPropagation(); toggleWishlist(this, ${p.id})" title="Wishlist">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-cat">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">
          <span class="price-current">$${p.price}</span>
          ${originalHtml}
        </div>
        <div class="product-card-actions">
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${p.id})">
            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
          </button>
          <button class="btn-quick-view" onclick="event.stopPropagation(); quickView(${p.id})" title="Quick View">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// =====================
// BEST PICKS (HOME)
// =====================
function renderBestPicks() {
  const picks = products.filter(p => p.badge === 'new' || p.badge === 'hot').slice(0, 4);
  const grid = document.getElementById('best-picks-grid');
  if (grid) {
    grid.innerHTML = picks.map((p, i) => buildProductCard(p, i)).join('');
    initReveal();
  }
}

// =====================
// COLLECTIONS
// =====================
function renderCollections() {
  let filtered = currentFilter === 'All' ? [...products] : products.filter(p => p.category === currentFilter);

  if (currentSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (currentSort === 'new') filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));

  const grid = document.getElementById('collection-grid');
  const title = document.getElementById('collection-title');
  const count = document.getElementById('collection-count');
  if (!grid) return;

  grid.innerHTML = filtered.map((p, i) => buildProductCard(p, i)).join('');
  if (title) title.textContent = currentFilter === 'All' ? 'All Products' : currentFilter;
  if (count) count.textContent = `Showing ${filtered.length} item${filtered.length !== 1 ? 's' : ''}`;

  if (currentView === 'list') grid.classList.add('list-view');
  else grid.classList.remove('list-view');

  initReveal();
}

function filterCollection(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => { if (t.textContent.trim() === cat || (cat === 'All' && t.textContent.trim() === 'All')) t.classList.add('active'); });
  }
  renderCollections();
}

function sortCollection(val) {
  currentSort = val;
  renderCollections();
}

function setView(view, btn) {
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCollections();
}

// =====================
// CART
// =====================
function saveCart() {
  localStorage.setItem('zilli-cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((a, i) => a + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  const mob = document.getElementById('mobile-cart-count');
  if (badge) badge.textContent = total;
  if (mob) mob.textContent = total;
}

function addToCart(productId, qty = 1, selectedSize = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const size = selectedSize || product.sizes[0];
  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, category: product.category, icon: product.icon, size, qty });
  }
  saveCart();
  showToast(`<strong>${product.name}</strong> added to bag`, 'fa-bag-shopping');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateQty(index, delta) {
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveCart();
  renderCart();
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const container = document.getElementById('cart-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Your Bag is Empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <button class="btn-primary" onclick="showPage('collections')">
          <i class="fa-solid fa-arrow-right"></i> Start Shopping
        </button>
      </div>
    `;
    return;
  }

  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax + shippingCost;

  const itemsHtml = cart.map((item, i) => `
    <div class="cart-item" style="animation-delay: ${i * 0.07}s">
      <div class="cart-item-info">
        <div class="cart-item-img"><i class="fa-solid ${item.icon}"></i></div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.category} · Size: ${item.size}</div>
        </div>
      </div>
      <div class="cart-item-price">$${item.price}</div>
      <div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="updateQty(${i}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${i}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
      <button class="cart-remove" onclick="removeFromCart(${i})" title="Remove"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="cart-items-header">
          <span class="cart-header-label">Product</span>
          <span class="cart-header-label">Price</span>
          <span class="cart-header-label">Quantity</span>
          <span class="cart-header-label">Total</span>
          <span></span>
        </div>
        ${itemsHtml}
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-outline" onclick="showPage('collections')">← Continue Shopping</button>
          <button class="btn-ghost" onclick="clearCart()" style="margin-left: auto;">Clear Bag</button>
        </div>
      </div>
      <div>
        <div class="cart-summary">
          <div class="cart-summary-title">Order Summary</div>
          <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}</span></div>
          <div class="summary-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
          <div class="summary-row total"><span>Total</span><span class="val">$${total.toFixed(2)}</span></div>
          <div class="promo-input">
            <input type="text" placeholder="Promo code" id="promo-input">
            <button onclick="applyPromo()">Apply</button>
          </div>
          <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="showPage('checkout')">
            <i class="fa-solid fa-lock"></i> Proceed to Checkout
          </button>
          <div class="checkout-notes">
            <div class="checkout-note"><i class="fa-solid fa-truck"></i> Free shipping on orders over $150</div>
            <div class="checkout-note"><i class="fa-solid fa-shield-halved"></i> Secure, encrypted checkout</div>
            <div class="checkout-note"><i class="fa-solid fa-rotate-left"></i> 30-day easy returns</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function applyPromo() {	
  const input = document.getElementById('promo-input');
  const code = input?.value.trim().toUpperCase();
  if (code === 'ZILLI10') {
    showToast('Promo code applied! 10% off your order.', 'fa-tag');
  } else {
    showToast('Invalid promo code. Try ZILLI10!', 'fa-circle-xmark', true);
  }
}

// =====================
// CHECKOUT
// =====================
let currentStep = 1;

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-order-items');
  if (!container) return;

  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax + shippingCost;

  container.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-img">
        <i class="fa-solid ${item.icon}"></i>
        <span class="order-item-qty-badge">${item.qty}</span>
      </div>
      <div>
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-meta">Size: ${item.size}</div>
      </div>
      <div class="order-item-price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  const coSubtotal = document.getElementById('co-subtotal');
  const coShip = document.getElementById('co-shipping');
  const coTax = document.getElementById('co-tax');
  const coTotal = document.getElementById('co-total');
  if (coSubtotal) coSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (coShip) coShip.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
  if (coTax) coTax.textContent = `$${tax.toFixed(2)}`;
  if (coTotal) coTotal.textContent = `$${total.toFixed(2)}`;
}

function goToStep(step) {
  currentStep = step;
  for (let i = 1; i <= 3; i++) {
    const section = document.getElementById(`checkout-step-${i}`);
    const tab = document.getElementById(`step-tab-${i}`);
    if (section) section.classList.toggle('active', i === step);
    if (tab) {
      tab.classList.remove('active', 'done');
      if (i === step) tab.classList.add('active');
      else if (i < step) tab.classList.add('done');
    }
  }
  renderCheckoutSummary();
}

function updateShipping(method) {
  const costs = { standard: 0, express: 12, overnight: 28 };
  shippingCost = costs[method] || 0;
  renderCheckoutSummary();
}

function toggleCardDetails(show) {
  const details = document.getElementById('card-details');
  if (details) details.classList.toggle('visible', show);
}

function placeOrder() {
  if (cart.length === 0) {
    showToast('Your bag is empty!', 'fa-circle-xmark', true);
    return;
  }
  cart = [];
  saveCart();
  showOrderConfirmation();
}

function showOrderConfirmation() {
  const checkout = document.getElementById('page-checkout');
  checkout.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; text-align: center;">
      <div style="max-width: 500px;">
        <div style="width: 80px; height: 80px; background: rgba(200,16,46,0.1); border: 1px solid var(--crimson); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; color: var(--crimson);">
          <i class="fa-solid fa-check"></i>
        </div>
        <div style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em; color: var(--crimson); text-transform: uppercase; margin-bottom: 1rem;">Order Confirmed</div>
        <h1 style="font-family: var(--font-display); font-size: 3rem; font-weight: 700; margin-bottom: 1rem;">Thank You!</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.8; margin-bottom: 0.5rem;">Your order has been placed successfully. You'll receive a confirmation email shortly.</p>
        <p style="color: var(--silver-dim); font-size: 0.8rem; margin-bottom: 2.5rem;">Order #ZL-${Math.floor(100000 + Math.random() * 900000)}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" onclick="showPage('home')"><i class="fa-solid fa-house"></i> Back to Home</button>
          <button class="btn-outline" onclick="showPage('collections')">Continue Shopping</button>
        </div>
      </div>
    </div>
  `;
}

// =====================
// WISHLIST
// =====================
function toggleWishlist(btn, productId) {
  btn.classList.toggle('active');
  const product = products.find(p => p.id === productId);
  if (btn.classList.contains('active')) {
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast(`${product.name} saved to wishlist`, 'fa-heart');
  } else {
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }
}

// =====================
// QUICK VIEW
// =====================
function quickView(productId) {
  const p = products.find(pr => pr.id === productId);
  if (!p) return;
  const existing = document.getElementById('quick-view-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'quick-view-modal'; 
  modal.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    z-index: 9000; display: flex; align-items: center; justify-content: center; padding: 2rem;
    animation: fadeIn 0.3s ease;
  `;
  modal.innerHTML = `
    <style>@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
    <div style="background: var(--black-card); border: 1px solid var(--border-red); max-width: 700px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; position: relative; max-height: 90vh;">
      <button onclick="document.getElementById('quick-view-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--silver-dim); font-size: 1.2rem; cursor: pointer; z-index: 1; transition: color 0.2s;" onmouseover="this.style.color='var(--crimson)'" onmouseout="this.style.color='var(--silver-dim)'">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="background: linear-gradient(135deg, var(--black-mid), var(--black-card)); display: flex; align-items: center; justify-content: center; padding: 3rem; min-height: 300px;">
       <img src="${p.src}" alt="${p.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
      <div style="padding: 2rem; overflow-y: auto;">
        <div style="font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--crimson); margin-bottom: 0.6rem;">${p.category}</div>
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">${p.name}</h2>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.6;">${p.desc}</p>
        <div style="font-size: 1.4rem; font-weight: 700; color: var(--white); margin-bottom: 1.5rem;">$${p.price}${p.originalPrice ? `<span style="font-size: 0.9rem; color: var(--silver-dim); text-decoration: line-through; margin-left: 0.5rem;">$${p.originalPrice}</span>` : ''}</div>
        <div style="margin-bottom: 1.2rem;">
          <div style="font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--silver-dim); margin-bottom: 0.6rem;">Size</div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;" id="qv-sizes">
            ${p.sizes.map((s, i) => `<button onclick="selectQvSize(this)" style="padding: 0.4rem 0.8rem; border: 1px solid ${i === 0 ? 'var(--crimson)' : 'var(--border)'}; background: ${i === 0 ? 'rgba(200,16,46,0.1)' : 'none'}; color: ${i === 0 ? 'var(--crimson)' : 'var(--silver-dim)'}; font-family: var(--font-body); font-size: 0.7rem; cursor: pointer; transition: all 0.2s;" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <div style="font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--silver-dim); margin-bottom: 0.6rem;">Color</div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            ${p.colors.map((c, i) => `<button onclick="selectQvColor(this)" style="padding: 0.4rem 0.8rem; border: 1px solid ${i === 0 ? 'var(--crimson)' : 'var(--border)'}; background: ${i === 0 ? 'rgba(200,16,46,0.1)' : 'none'}; color: ${i === 0 ? 'var(--crimson)' : 'var(--silver-dim)'}; font-family: var(--font-body); font-size: 0.7rem; cursor: pointer; transition: all 0.2s;">${c}</button>`).join('')}
          </div>
        </div>
        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="addToCart(${p.id}); document.getElementById('quick-view-modal').remove();">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function selectQvSize(btn) {
  btn.closest('#qv-sizes')?.querySelectorAll('button').forEach(b => {
    b.style.borderColor = 'var(--border)';
    b.style.background = 'none';
    b.style.color = 'var(--silver-dim)';
  });
  btn.style.borderColor = 'var(--crimson)';
  btn.style.background = 'rgba(200,16,46,0.1)';
  btn.style.color = 'var(--crimson)';
}

function selectQvColor(btn) {
  btn.closest('div')?.querySelectorAll('button').forEach(b => {
    b.style.borderColor = 'var(--border)';
    b.style.background = 'none';
    b.style.color = 'var(--silver-dim)';
  });
  btn.style.borderColor = 'var(--crimson)';
  btn.style.background = 'rgba(200,16,46,0.1)';
  btn.style.color = 'var(--crimson)';
}

// =====================
// TOAST
// =====================
function showToast(message, icon = 'fa-circle-check', isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderLeftColor = '#888';
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// =====================
// CONTACT FORMS
// =====================
function handleQuickContact(e) {
  e.preventDefault();
    const fname = document.getElementById('qc-fname')?.value;
  const email = document.getElementById('qc-email')?.value;
  const subject = document.getElementById('qc-subject')?.value;
  const message = document.getElementById('qc-message')?.value;

  if (!fname || !email || !subject || !message) {
    showToast('Please fill in all required fields.', 'fa-circle-xmark', true);
    return;
}
  showToast('Message sent! We\'ll be in touch shortly.', 'fa-paper-plane');

  document.getElementById('qc-fname').value = '';
  document.getElementById('qc-email').value = '';
  document.getElementById('qc-subject').value = '';
  document.getElementById('qc-message').value = '';
}
function handleContactSubmit(e) {
  e.preventDefault();
  const fname = document.getElementById('cf-fname')?.value;
  const email = document.getElementById('cf-email')?.value;
  const subject = document.getElementById('cf-subject')?.value;
  const message = document.getElementById('cf-message')?.value;

  if (!fname || !email || !subject || !message) {
    showToast('Please fill in all required fields.', 'fa-circle-xmark', true);
    return;
  }

  showToast('Message sent successfully! We\'ll respond within 24 hours.', 'fa-paper-plane');

  document.getElementById('cf-fname').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-message').value = '';
}

// =====================
// CARD INPUT FORMATTING
// =====================
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 2) val = val.slice(0, 2) + ' / ' + val.slice(2);
  input.value = val;
}

// =====================
// SCROLL REVEAL
// =====================
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderBestPicks();
  initReveal();

  // Reveal on scroll for home
  window.addEventListener('scroll', initReveal);
});