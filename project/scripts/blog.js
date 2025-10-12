// Blog JavaScript with JSON data loading

let allPosts = [];
let currentFilter = 'all';
let currentPage = 1;
const postsPerPage = 6;

// Load blog data from JSON
async function loadBlogData() {
    try {
        const response = await fetch('data/blog-data.json');
        const data = await response.json();
        allPosts = data.blogPosts;
        displayPosts();
    } catch (error) {
        console.error('Error loading blog data:', error);
        document.getElementById('blog-list').innerHTML =
            '<p class="loading">Error loading blog posts. Please try again later.</p>';
    }
}

// Display blog posts
function displayPosts() {
    const blogList = document.getElementById('blog-list');

    // Filter posts
    const filteredPosts = currentFilter === 'all'
        ? allPosts
        : allPosts.filter(post => post.category === currentFilter);

    // Pagination
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Clear loading message
    blogList.innerHTML = '';

    // Display posts
    if (paginatedPosts.length === 0) {
        blogList.innerHTML = '<p class="loading">No posts found in this category.</p>';
        return;
    }

    paginatedPosts.forEach((post, index) => {
        const postCard = createPostCard(post, index);
        blogList.appendChild(postCard);
    });

    // Setup pagination
    setupPagination(filteredPosts.length);
}

// Create post card element
function createPostCard(post, index) {
    const li = document.createElement('li');
    li.style.animationDelay = `${index * 0.1}s`;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    };

    li.innerHTML = `
        <div class="blog-card">
            <div class="card-banner">
                <img src="${post.image}" width="600" height="390" loading="lazy"
                    alt="${post.title}" class="w-100">
                <div class="badge">${post.category}</div>
            </div>
            <div class="card-content">
                <div class="card-meta-wrapper">
                    <a href="#" class="card-meta-link">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <time class="meta-info" datetime="${post.date}">${formatDate(post.date)}</time>
                    </a>
                    <a href="#" class="card-meta-link">
                        <ion-icon name="person-outline"></ion-icon>
                        <p class="meta-info">${post.author}</p>
                    </a>
                </div>
                <h3 class="h3">
                    <a href="#" class="card-title">${post.title}</a>
                </h3>
                <p class="card-text">${post.excerpt}</p>
                <a href="#" class="btn-link">
                    <span>Read More</span>
                    <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </a>
            </div>
        </div>
    `;

    return li;
}

// Setup pagination
function setupPagination(totalPosts) {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    pagination.innerHTML = '';

    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '<ion-icon name="chevron-back"></ion-icon>';
        prevBtn.addEventListener('click', () => {
            currentPage--;
            displayPosts();
            scrollToTop();
        });
        pagination.appendChild(prevBtn);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayPosts();
            scrollToTop();
        });
        pagination.appendChild(pageBtn);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '<ion-icon name="chevron-forward"></ion-icon>';
        nextBtn.addEventListener('click', () => {
            currentPage++;
            displayPosts();
            scrollToTop();
        });
        pagination.appendChild(nextBtn);
    }
}

// Filter functionality
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Update filter and reset to page 1
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            displayPosts();
            scrollToTop();
        });
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const navToggleBtn = document.querySelector('.nav-toggle-btn');
    const navbar = document.querySelector('.navbar');

    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            navToggleBtn.classList.toggle('active');
        });
    }
}

// Back to top button
function setupBackToTop() {
    const backTopBtn = document.querySelector('.back-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backTopBtn.classList.add('active');
        } else {
            backTopBtn.classList.remove('active');
        }
    });

    backTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });
}

// Header scroll effect
function setupHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px hsla(0, 0%, 0%, 0.15)';
        } else {
            header.style.boxShadow = 'var(--shadow-1)';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBlogData();
    setupFilters();
    setupMobileMenu();
    setupBackToTop();
    setupHeaderScroll();
});

// Add smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});