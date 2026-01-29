// Cart Data
let cart = JSON.parse(localStorage.getItem('foodzone_cart')) || [];
let promoApplied = false;
let promoDiscount = 0;

// Promo Codes
const promoCodes = {
    'FOOD10': { discount: 10, type: 'percent' },
    'SAVE50': { discount: 50, type: 'fixed' },
    'WELCOME': { discount: 15, type: 'percent' }
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupOrderEventListeners();
    renderOrderItems();
    updateSummary();
    updateCartCount();
});

// =============================================
// THEME TOGGLE
// =============================================
function initTheme() {
    const savedTheme = localStorage.getItem('foodzone_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('foodzone_theme', isDark ? 'dark' : 'light');
}

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// =============================================
// EVENT LISTENERS
// =============================================
function setupOrderEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Clear Cart
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Apply Promo
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromo);
    }

    // Place Order
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav) mobileNav.classList.remove('active');
        });
    });
}

// =============================================
// RENDER ORDER ITEMS
// =============================================
function renderOrderItems() {
    const orderItems = document.getElementById('orderItems');
    const emptyCart = document.getElementById('emptyCart');
    const orderSummary = document.getElementById('orderSummary');
    const clearCartBtn = document.getElementById('clearCartBtn');

    if (!orderItems) return;

    if (cart.length === 0) {
        orderItems.innerHTML = '';
        if (emptyCart) emptyCart.classList.add('show');
        if (orderSummary) orderSummary.style.display = 'none';
        if (clearCartBtn) clearCartBtn.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.classList.remove('show');
    if (orderSummary) orderSummary.style.display = 'block';
    if (clearCartBtn) clearCartBtn.style.display = 'block';

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="order-item" data-id="${item.id}">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-name">${item.name}</h4>
                    <span class="order-item-price">Rs.${item.price} x ${item.quantity} = Rs.${item.price * item.quantity}</span>
                </div>
                <div class="order-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });

    orderItems.innerHTML = html;
}

// =============================================
// UPDATE QUANTITY
// =============================================
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeItem(itemId);
        return;
    }

    saveCart();
    renderOrderItems();
    updateSummary();
    updateCartCount();
}

// =============================================
// REMOVE ITEM
// =============================================
function removeItem(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    renderOrderItems();
    updateSummary();
    updateCartCount();
    showToast('Item removed from cart');
}

// =============================================
// CLEAR CART
// =============================================
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        promoApplied = false;
        promoDiscount = 0;
        saveCart();
        renderOrderItems();
        updateSummary();
        updateCartCount();
        showToast('Cart cleared');
    }
}

// =============================================
// UPDATE SUMMARY
// =============================================
function updateSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const tax = Math.round(subtotal * 0.05);
    
    let discount = 0;
    if (promoApplied) {
        discount = promoDiscount;
    }
    
    const total = subtotal + deliveryFee + tax - discount;

    if (subtotalEl) subtotalEl.textContent = `Rs.${subtotal}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = deliveryFee === 0 ? 'FREE' : `Rs.${deliveryFee}`;
    if (taxEl) taxEl.textContent = `Rs.${tax}`;
    if (totalEl) totalEl.textContent = `Rs.${Math.max(0, total)}`;
}

// =============================================
// APPLY PROMO
// =============================================
function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const promoMessage = document.getElementById('promoMessage');

    if (!promoInput || !promoMessage) return;

    const code = promoInput.value.toUpperCase().trim();

    if (promoApplied) {
        promoMessage.textContent = 'A promo code is already applied';
        promoMessage.className = 'promo-message error';
        return;
    }

    if (!code) {
        promoMessage.textContent = 'Please enter a promo code';
        promoMessage.className = 'promo-message error';
        return;
    }

    const promo = promoCodes[code];
    if (!promo) {
        promoMessage.textContent = 'Invalid promo code. Try: FOOD10, SAVE50, or WELCOME';
        promoMessage.className = 'promo-message error';
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (promo.type === 'percent') {
        promoDiscount = Math.round(subtotal * (promo.discount / 100));
        promoMessage.textContent = `${promo.discount}% discount applied! You save Rs.${promoDiscount}`;
    } else {
        promoDiscount = promo.discount;
        promoMessage.textContent = `Rs.${promo.discount} discount applied!`;
    }

    promoApplied = true;
    promoMessage.className = 'promo-message success';
    promoInput.disabled = true;

    updateSummary();
    showToast('Promo code applied!');
}

// =============================================
// PLACE ORDER
// =============================================
function placeOrder() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    // Generate order ID
    const orderId = 'FZ' + Date.now().toString().slice(-8);
    
    // Show success modal
    const modalOverlay = document.getElementById('successModalOverlay');
    const successModal = document.getElementById('successModal');
    const orderIdEl = document.getElementById('orderId');

    if (orderIdEl) orderIdEl.textContent = orderId;
    if (modalOverlay) modalOverlay.classList.add('show');
    if (successModal) successModal.classList.add('show');

    // Clear cart
    cart = [];
    promoApplied = false;
    promoDiscount = 0;
    saveCart();
    updateCartCount();
}

// =============================================
// SAVE CART
// =============================================
function saveCart() {
    localStorage.setItem('foodzone_cart', JSON.stringify(cart));
}

// =============================================
// UPDATE CART COUNT
// =============================================
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions globally accessible
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.applyPromo = applyPromo;
window.placeOrder = placeOrder;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
