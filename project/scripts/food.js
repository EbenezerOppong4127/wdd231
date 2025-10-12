
    // ===== STEP 1: DECLARE GLOBAL VARIABLE =====
    // This will store our food data after loading from JSON file
    let foodData = [];

    // ===== STEP 2: GET DOM ELEMENTS =====
    // These are references to HTML elements we'll manipulate
    const foodMenuList = document.getElementById('foodMenuList');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // ===== STEP 3: RENDER FOOD ITEMS =====
    // This function creates HTML for each food item
    function renderFoodItems(category = 'all') {
    // Clear existing items
    foodMenuList.innerHTML = '';

    // Filter food based on category
    const filteredFood = category === 'all'
    ? foodData
    : foodData.filter(food => food.category === category);

    // Loop through each food item and create HTML
    filteredFood.forEach(food => {
    const foodCard = document.createElement('li');
    foodCard.innerHTML = `
                    <div class="food-menu-card" data-category="${food.category}">
                        <div class="card-banner">
                            <img src="${food.image}" width="300" height="300" loading="lazy" alt="${food.name}">
                            <div class="badge">${food.discount}</div>
                        </div>

                        <div class="wrapper">
                            <p class="category">${food.category.charAt(0).toUpperCase() + food.category.slice(1)}</p>
                            <div class="rating-wrapper">
                                ${generateStars(food.rating)}
                            </div>
                        </div>

                        <h3 class="card-title">${food.name}</h3>

                        <div class="price-wrapper">
                            <p class="price-text">Price:</p>
                            <data class="price">$${food.price.toFixed(2)}</data>
                            <del class="del">$${food.originalPrice.toFixed(2)}</del>
                        </div>

                        <button class="view-details-btn" onclick="openModal(${food.id})">
                            View Details
                        </button>
                    </div>
                `;
    foodMenuList.appendChild(foodCard);
});
}

    // ===== STEP 4: GENERATE STAR RATINGS =====
    // This creates the star icons
    function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
    stars += '<ion-icon name="star"></ion-icon>';
}
    return stars;
}

    // ===== STEP 5: OPEN MODAL FUNCTION =====
    // This shows the modal with food details
    function openModal(foodId) {
    // Find the food item by ID
    const food = foodData.find(item => item.id === foodId);

    if (!food) return;

    // Create modal HTML content
    modalBody.innerHTML = `
                <img src="${food.image}" alt="${food.name}" class="modal-image">

                <div class="modal-details">
                    <h2 class="modal-title">${food.name}</h2>

                    <span class="modal-category">${food.category.toUpperCase()}</span>

                    <div class="modal-rating">
                        <div class="stars">
                            ${generateStars(food.rating)}
                        </div>
                        <span>(${food.rating}.0 Rating)</span>
                    </div>

                    <p class="modal-description">${food.description}</p>

                    <div>
                        <h3 class="ingredients-title">Ingredients:</h3>
                        <ul class="ingredients-list">
                            ${food.ingredients.map(ingredient =>
    `<li class="ingredient-item">${ingredient}</li>`
    ).join('')}
                        </ul>
                    </div>

                    <div class="modal-price-section">
                        <div class="modal-price-wrapper">
                            <span class="modal-price">$${food.price.toFixed(2)}</span>
                            <span class="modal-original-price">$${food.originalPrice.toFixed(2)}</span>
                            <span class="modal-discount">${food.discount}</span>
                        </div>

                        <button class="order-btn" onclick="orderFood('${food.name}')">
                            Order Now
                        </button>
                    </div>
                </div>
            `;

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

    // ===== STEP 6: CLOSE MODAL FUNCTION =====
    function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

    // ===== STEP 7: ORDER FUNCTION =====
    function orderFood(foodName) {
    alert(`Thank you for ordering ${foodName}! We'll prepare it right away.`);
    closeModal();
}

    // ===== STEP 8: FILTER FUNCTIONALITY =====
    filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get category from button
        const category = this.getAttribute('data-filter');

        // Render filtered items
        renderFoodItems(category);
    });
});

    // ===== STEP 9: EVENT LISTENERS =====

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside (on overlay)
    modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
    closeModal();
}
});

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
}
});

    // ===== STEP 10: LOAD DATA FROM JSON FILE =====
    // This function fetches food data from external JSON file
    async function loadFoodData() {
    try {
    // STEP 10.1: Fetch the JSON file
    // fetch() is a built-in JavaScript function that gets files from server
    const response = await fetch('data/food.json');

    // STEP 10.2: Check if fetch was successful
    // response.ok is true if status code is 200-299
    if (!response.ok) {
    throw new Error('Failed to load food data');
}

    // STEP 10.3: Convert response to JavaScript object
    // .json() parses the JSON text into a JavaScript array
    foodData = await response.json();

    // STEP 10.4: Render the food items after data is loaded
    renderFoodItems();



} catch (error) {
    // STEP 10.5: Handle errors (file not found, network issues, etc.)
    console.error('Error loading food data:', error);

    // Show error message to user
    foodMenuList.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                        <h3 style="color: var(--cinnabar); margin-bottom: 10px;">
                            Failed to load food menu
                        </h3>
                        <p style="color: var(--sonic-silver);">
                            Please check if the file exists at: data/food.json
                        </p>
                    </div>
                `;
}
}

    // ===== STEP 11: INITIALIZE =====
    // Load food data when page loads
    loadFoodData();
