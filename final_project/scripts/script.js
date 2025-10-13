'use strict';

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggleBtn.classList.toggle("active");
    });
}

/**
 * header sticky & back to top
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

/**
 * search box toggle
 */
const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
    searchBoxElems[i].addEventListener("click", function () {
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
    });
}

/**
 * move cycle on scroll
 */
const deliveryBoy = document.querySelector("[data-delivery-boy]");

if (deliveryBoy) {
    let deliveryBoyMove = -80;
    let lastScrollPos = 0;

    window.addEventListener("scroll", function () {
        let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

        if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
            let activeScrollPos = window.scrollY;

            if (lastScrollPos < activeScrollPos) {
                deliveryBoyMove += 1;
            } else {
                deliveryBoyMove -= 1;
            }

            lastScrollPos = activeScrollPos;
            deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
        }
    });
}

/**
 * MENU FUNCTIONALITY - Load from JSON
 */

// Store menu data globally
let menuData = [];

// Gradient backgrounds for different categories
const categoryGradients = {
    chicken: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    burger: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    pizza: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    drinks: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    default: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
};

// Function to generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<ion-icon name="star"></ion-icon>';
        } else {
            stars += '<ion-icon name="star-outline"></ion-icon>';
        }
    }
    return stars;
}

// Function to render menu items
function renderMenuItems(filterCategory = 'all') {
    const menuGrid = document.getElementById('menuGrid');

    if (!menuGrid) return; // Exit if menu grid doesn't exist on this page

    menuGrid.innerHTML = '';

    const filteredItems = filterCategory === 'all'
        ? menuData
        : menuData.filter(item => item.category === filterCategory);

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.8rem; color: var(--sonic-silver); padding: 50px;">No items found in this category.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const gradient = categoryGradients[item.category] || categoryGradients.default;

        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card';
        menuCard.setAttribute('data-category', item.category);

        menuCard.innerHTML = `
      <div style="position: relative;">
        ${item.discount ? `<span class="menu-badge">${item.discount}</span>` : ''}
        <img src="${item.image}" alt="${item.name}" class="menu-img" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="menu-img" style="background: ${gradient}; display: none;"></div>
      </div>
      <div class="menu-content">
        <div class="menu-rating">
          ${generateStars(item.rating)}
        </div>
        <h3 class="menu-title">${item.name}</h3>
        <p class="menu-description">${item.description}</p>
        <p class="menu-ingredients">Ingredients: ${item.ingredients.slice(0, 4).join(', ')}${item.ingredients.length > 4 ? '...' : ''}</p>
        <div class="price-wrapper">
          <span class="menu-price">$${item.price.toFixed(2)}</span>
          ${item.originalPrice ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
          <ion-icon name="cart-outline" style="vertical-align: middle;"></ion-icon>
          Add to Cart
        </button>
      </div>
    `;

        menuGrid.appendChild(menuCard);
    });
}

// Function to load menu data from JSON
async function loadMenuData() {
    try {
        const response = await fetch('data/index.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        menuData = await response.json();
        console.log('Menu data loaded successfully:', menuData);

        // Render all items initially
        renderMenuItems();

    } catch (error) {


        const menuGrid = document.getElementById('menuGrid');
        if (menuGrid) {
            menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
          <p style="font-size: 1.8rem; color: var(--cinnabar); margin-bottom: 15px;">
            <ion-icon name="alert-circle-outline" style="font-size: 4rem; display: block; margin: 0 auto 20px;"></ion-icon>
            Unable to load menu items.
          </p>
          <p style="font-size: 1.4rem; color: var(--sonic-silver);">
            Please make sure the file <strong>data/index.json</strong> exists.
          </p>
        </div>
      `;
        }
    }
}

// Function to handle add to cart
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);

    if (!item) {

        return;
    }

    // Show alert with item details
    alert(`✅ Added to Cart!\n\n${item.name}\nPrice: $${item.price.toFixed(2)}\n\n(Cart functionality can be implemented here)`);

    // TODO: Implement actual cart functionality
    // You can store cart items in an array or use localStorage
    console.log('Item added to cart:', item);
}

// Make addToCart function globally accessible
window.addToCart = addToCart;

/**
 * Initialize menu functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {

    // Load menu data from JSON file
    loadMenuData();

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter category
                const filterCategory = this.getAttribute('data-filter');

                // Render filtered items
                renderMenuItems(filterCategory);
            });
        });
    }

    // Search functionality for menu items
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm === '') {
                renderMenuItems();
                return;
            }

            const menuGrid = document.getElementById('menuGrid');
            if (!menuGrid) return;

            // Filter items based on search term
            const searchResults = menuData.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm) ||
                item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
            );

            // Display search results
            menuGrid.innerHTML = '';

            if (searchResults.length === 0) {
                menuGrid.innerHTML = `
          <p style="grid-column: 1/-1; text-align: center; font-size: 1.8rem; color: var(--sonic-silver); padding: 50px;">
            No results found for "${searchTerm}"
          </p>
        `;
                return;
            }

            searchResults.forEach(item => {
                const gradient = categoryGradients[item.category] || categoryGradients.default;

                const menuCard = document.createElement('div');
                menuCard.className = 'menu-card';

                menuCard.innerHTML = `
          <div style="position: relative;">
            ${item.discount ? `<span class="menu-badge">${item.discount}</span>` : ''}
            <img src="${item.image}" alt="${item.name}" class="menu-img" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="menu-img" style="background: ${gradient}; display: none;"></div>
          </div>
          <div class="menu-content">
            <div class="menu-rating">
              ${generateStars(item.rating)}
            </div>
            <h3 class="menu-title">${item.name}</h3>
            <p class="menu-description">${item.description}</p>
            <p class="menu-ingredients">Ingredients: ${item.ingredients.slice(0, 4).join(', ')}${item.ingredients.length > 4 ? '...' : ''}</p>
            <div class="price-wrapper">
              <span class="menu-price">$${item.price.toFixed(2)}</span>
              ${item.originalPrice ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
              <ion-icon name="cart-outline" style="vertical-align: middle;"></ion-icon>
              Add to Cart
            </button>
          </div>
        `;

                menuGrid.appendChild(menuCard);
            });
        });
    }
});