// Food Menu Data with Real Images
const menuData = [
    // Pizza
    { id: 1, name: "Margherita Pizza", category: "pizza", price: 249, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", description: "Classic pizza with tomato sauce, mozzarella, and fresh basil", rating: 4.8, reviews: 124, badge: "Bestseller" },
    { id: 2, name: "Pepperoni Pizza", category: "pizza", price: 299, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", description: "Loaded with spicy pepperoni and melted cheese", rating: 4.7, reviews: 98 },
    { id: 3, name: "Veggie Supreme", category: "pizza", price: 279, image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop", description: "Bell peppers, mushrooms, olives, onions on a crispy base", rating: 4.5, reviews: 76 },
    { id: 4, name: "BBQ Chicken Pizza", category: "pizza", price: 329, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", description: "Tangy BBQ sauce with grilled chicken chunks", rating: 4.6, reviews: 89, badge: "Popular" },

    // Burger
    { id: 5, name: "Classic Beef Burger", category: "burger", price: 179, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", description: "Juicy beef patty with lettuce, tomato, and special sauce", rating: 4.9, reviews: 156, badge: "Bestseller" },
    { id: 6, name: "Chicken Burger", category: "burger", price: 159, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop", description: "Crispy fried chicken with mayo and fresh veggies", rating: 4.6, reviews: 112 },
    { id: 7, name: "Veggie Burger", category: "burger", price: 149, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop", description: "Grilled vegetable patty with cheese and herbs", rating: 4.4, reviews: 67 },
    { id: 8, name: "Double Cheese Burger", category: "burger", price: 219, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop", description: "Double beef patty with extra cheese layers", rating: 4.8, reviews: 134, badge: "Popular" },

    // Biryani
    { id: 9, name: "Chicken Biryani", category: "biryani", price: 249, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop", description: "Aromatic basmati rice with tender chicken pieces", rating: 4.9, reviews: 203, badge: "Bestseller" },
    { id: 10, name: "Mutton Biryani", category: "biryani", price: 329, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop", description: "Rich and flavorful mutton cooked with spiced rice", rating: 4.8, reviews: 167 },
    { id: 11, name: "Veg Biryani", category: "biryani", price: 199, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop", description: "Mixed vegetables in fragrant basmati rice", rating: 4.5, reviews: 89 },
    { id: 12, name: "Egg Biryani", category: "biryani", price: 219, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop", description: "Boiled eggs layered with spiced rice", rating: 4.6, reviews: 78 },

    // Drinks
    { id: 13, name: "Mango Lassi", category: "drinks", price: 89, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop", description: "Creamy yogurt drink blended with fresh mango", rating: 4.7, reviews: 145, badge: "Refreshing" },
    { id: 14, name: "Cold Coffee", category: "drinks", price: 99, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop", description: "Chilled coffee with ice cream and chocolate", rating: 4.6, reviews: 112 },
    { id: 15, name: "Fresh Lime Soda", category: "drinks", price: 59, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", description: "Refreshing lime juice with soda water", rating: 4.5, reviews: 87 },
    { id: 16, name: "Masala Chai", category: "drinks", price: 49, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop", description: "Traditional Indian spiced tea", rating: 4.8, reviews: 198 },

    // Dessert
    { id: 17, name: "Chocolate Brownie", category: "dessert", price: 129, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop", description: "Warm fudgy brownie with vanilla ice cream", rating: 4.9, reviews: 176, badge: "Must Try" },
    { id: 19, name: "Ice Cream Sundae", category: "dessert", price: 149, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", description: "Mixed ice cream with nuts and chocolate sauce", rating: 4.6, reviews: 98 },
];

// Cart Data
let cart = JSON.parse(localStorage.getItem('foodzone_cart')) || [];

// Current Filter State
let currentCategory = 'all';
let currentSearch = '';
let currentPriceRange = 'all';
let currentSort = 'default';

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupEventListeners();
    renderMenu();
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
function setupEventListeners() {
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

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav) mobileNav.classList.remove('active');
        });
    });

    // Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase();
            renderMenu();
        });
    }

    // Price Filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            currentPriceRange = this.value;
            renderMenu();
        });
    }

    // Sort Filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentSort = this.value;
            renderMenu();
        });
    }

    // Category Tabs
    const categoryTabs = document.getElementById('categoryTabs');
    if (categoryTabs) {
        categoryTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('category-tab')) {
                document.querySelectorAll('.category-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                e.target.classList.add('active');
                currentCategory = e.target.dataset.category;
                renderMenu();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent successfully!');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Subscribed successfully!');
            this.reset();
        });
    }
}

// =============================================
// FILTER AND SORT
// =============================================
function getFilteredItems() {
    let filtered = [...menuData];

    // Category Filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(item => item.category === currentCategory);
    }

    // Search Filter
    if (currentSearch) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(currentSearch) ||
            item.description.toLowerCase().includes(currentSearch)
        );
    }

    // Price Filter
    if (currentPriceRange !== 'all') {
        if (currentPriceRange === '0-100') {
            filtered = filtered.filter(item => item.price < 100);
        } else if (currentPriceRange === '100-200') {
            filtered = filtered.filter(item => item.price >= 100 && item.price <= 200);
        } else if (currentPriceRange === '200-300') {
            filtered = filtered.filter(item => item.price >= 200 && item.price <= 300);
        } else if (currentPriceRange === '300+') {
            filtered = filtered.filter(item => item.price > 300);
        }
    }

    // Sort
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return filtered;
}

// =============================================
// RENDER MENU
// =============================================
function renderMenu() {
    const menuContainer = document.getElementById('menuContainer');
    const noResults = document.getElementById('noResults');
    
    if (!menuContainer) return;

    const filtered = getFilteredItems();

    if (filtered.length === 0) {
        menuContainer.innerHTML = '';
        if (noResults) noResults.classList.add('show');
        return;
    }

    if (noResults) noResults.classList.remove('show');

    // Group by category if showing all
    if (currentCategory === 'all' && currentSort === 'default') {
        const categories = {
            pizza: { name: 'Pizza', emoji: '🍕', items: [] },
            burger: { name: 'Burger', emoji: '🍔', items: [] },
            biryani: { name: 'Biryani', emoji: '🍚', items: [] },
            drinks: { name: 'Drinks', emoji: '🥤', items: [] },
            dessert: { name: 'Dessert', emoji: '🍰', items: [] }
        };

        filtered.forEach(item => {
            if (categories[item.category]) {
                categories[item.category].items.push(item);
            }
        });

        let html = '';
        for (const [key, category] of Object.entries(categories)) {
            if (category.items.length > 0) {
                html += `
                    <div class="category-section">
                        <h3 class="category-title">
                            <span class="category-emoji">${category.emoji}</span>
                            ${category.name}
                        </h3>
                        <div class="food-grid">
                            ${category.items.map(item => createFoodCard(item)).join('')}
                        </div>
                    </div>
                `;
            }
        }
        menuContainer.innerHTML = html;
    } else {
        menuContainer.innerHTML = `
            <div class="food-grid">
                ${filtered.map(item => createFoodCard(item)).join('')}
            </div>
        `;
    }
}

// =============================================
// CREATE FOOD CARD
// =============================================
function createFoodCard(item) {
    const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));
    
    return `
        <div class="food-card">
            <div class="food-card-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                ${item.badge ? `<span class="food-card-badge">${item.badge}</span>` : ''}
            </div>
            <div class="food-card-content">
                <h3 class="food-card-title">${item.name}</h3>
                <p class="food-card-description">${item.description}</p>
                <div class="food-card-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${item.reviews})</span>
                </div>
                <div class="food-card-footer">
                    <span class="food-card-price">Rs.${item.price}</span>
                    <div class="food-card-buttons">
                        <button class="btn-add-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                        <button class="btn-buy-now" onclick="buyNow(${item.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// CART FUNCTIONS
// =============================================
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`${item.name} added to cart!`);
}

function buyNow(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    window.location.href = 'order.html';
}

function saveCart() {
    localStorage.setItem('foodzone_cart', JSON.stringify(cart));
}

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
window.addToCart = addToCart;
window.buyNow = buyNow;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
