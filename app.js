// ===== FLAVOR HAVEN - FOOD ORDERING SYSTEM =====

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('flavorCart')) || [];

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    updateCartCount();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect for navbar
    if (navbar && !navbar.classList.contains('navbar-solid')) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
}

// ===== CART FUNCTIONS =====
function addToCart(id, name, price, image) {
    cart = JSON.parse(localStorage.getItem('flavorCart')) || [];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showToast(name + ' added to cart!');
}

function buyNow(id, name, price, image) {
    // Clear cart and add only this item
    cart = [{
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1
    }];
    
    saveCart();
    updateCartCount();
    
    // Redirect to order details page
    window.location.href = 'order-details.html';
}

function saveCart() {
    localStorage.setItem('flavorCart', JSON.stringify(cart));
}

function updateCartCount() {
    cart = JSON.parse(localStorage.getItem('flavorCart')) || [];
    const cartCountElements = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function openCart() {
    window.location.href = 'order-details.html';
}

// ===== SEARCH FUNCTION =====
function searchFood() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const foodCards = document.querySelectorAll('.food-card');
    const categorySections = document.querySelectorAll('.category-section');
    const noResults = document.getElementById('noResults');
    
    let visibleCount = 0;
    
    // Reset category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.category-btn[data-category="all"]')?.classList.add('active');
    
    // Show all categories first
    categorySections.forEach(section => {
        section.classList.remove('hidden');
    });
    
    // Filter food cards
    foodCards.forEach(card => {
        const name = card.getAttribute('data-name')?.toLowerCase() || '';
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        
        if (name.includes(searchTerm) || category.includes(searchTerm) || searchTerm === '') {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Hide empty category sections
    categorySections.forEach(section => {
        const visibleCards = section.querySelectorAll('.food-card:not(.hidden)');
        if (visibleCards.length === 0) {
            section.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (noResults) {
        if (visibleCount === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// ===== CATEGORY FILTER =====
function filterCategory(category) {
    const categorySections = document.querySelectorAll('.category-section');
    const foodCards = document.querySelectorAll('.food-card');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const noResults = document.getElementById('noResults');
    const searchInput = document.getElementById('searchInput');
    
    // Clear search
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Update active button
    categoryButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Hide no results
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    if (category === 'all') {
        // Show all sections and cards
        categorySections.forEach(section => {
            section.classList.remove('hidden');
        });
        foodCards.forEach(card => {
            card.classList.remove('hidden');
        });
    } else {
        // Show only matching category section
        categorySections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category-section');
            if (sectionCategory === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        // Show only matching cards
        foodCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // Smooth scroll to menu section
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
