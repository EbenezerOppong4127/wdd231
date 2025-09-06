document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu functionality
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");

    // Initialize hamburger button text
    if (hamButton) {
        hamButton.textContent = "☰";
        hamButton.style.transition = "transform 0.3s ease, color 0.3s ease";
    }

    // Hamburger menu toggle
    if (hamButton && navigation) {
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");

            // Update hamburger icon with smooth animation
            if (hamButton.classList.contains("open")) {
                hamButton.textContent = "✕";
                hamButton.style.transform = "rotate(180deg)";
            } else {
                hamButton.textContent = "☰";
                hamButton.style.transform = "rotate(0deg)";
            }
        });
    }

    // Close menu when clicking on a navigation link (mobile)
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 480 && navigation && hamButton) {
                navigation.classList.remove("open");
                hamButton.classList.remove("open");
                hamButton.textContent = "☰";
                hamButton.style.transform = "rotate(0deg)";
            }
        });
    });

    // Close menu when clicking outside of navigation area
    document.addEventListener("click", (event) => {
        if (navigation && hamButton &&
            !navigation.contains(event.target) &&
            !hamButton.contains(event.target)) {
            if (navigation.classList.contains("open")) {
                navigation.classList.remove("open");
                hamButton.classList.remove("open");
                hamButton.textContent = "☰";
                hamButton.style.transform = "rotate(0deg)";
            }
        }
    });

    // Handle window resize - close mobile menu on desktop view
    const handleResize = () => {
        if (window.innerWidth >= 480 && navigation && hamButton) {
            // Desktop view - ensure menu is visible and reset mobile states
            navigation.classList.remove("open");
            hamButton.classList.remove("open");
            hamButton.textContent = "☰";
            hamButton.style.transform = "rotate(0deg)";
        }
    };

    // Debounced resize handler for performance
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });

    // Active navigation link management
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach(link => {
            link.classList.remove("active");
            const linkPath = new URL(link.href).pathname;

            // Check for various path matches
            if (currentPath === linkPath ||
                (currentPath.endsWith('/') && linkPath.endsWith('index.html')) ||
                (currentPath.endsWith('index.html') && linkPath.endsWith('/')) ||
                (currentPath === '/' && linkPath.includes('index.html'))) {
                link.classList.add("active");
            }
        });
    }

    // Set active nav link on page load
    setActiveNavLink();

    // Dynamic footer content
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById("currentyear");
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // Last modified date with better formatting
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        lastModifiedElement.textContent = `Last Modified: ${lastModified.toLocaleDateString('en-US', options)}`;
    }

    // Enhanced scroll behavior for header
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    if (header) {
        header.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide header
                header.style.transform = "translateY(-100%)";
            } else {
                // Scrolling up - show header
                header.style.transform = "translateY(0)";

                // Add shadow when scrolled
                if (scrollTop > 50) {
                    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.25)";
                } else {
                    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        // Throttled scroll handler for better performance
        let scrollTimeout;
        window.addEventListener("scroll", () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 10);
            }
        });
    }

    // Keyboard navigation support
    if (hamButton) {
        hamButton.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                hamButton.click();
            }
        });
    }

    // Enhanced accessibility: Focus management
    navLinks.forEach(link => {
        link.addEventListener("focus", () => {
            // Ensure menu is open when navigating with keyboard on mobile
            if (window.innerWidth < 480 && navigation && hamButton &&
                !navigation.classList.contains("open")) {
                navigation.classList.add("open");
                hamButton.classList.add("open");
                hamButton.textContent = "✕";
                hamButton.style.transform = "rotate(180deg)";
            }
        });
    });

    // Escape key functionality to close mobile menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navigation && hamButton &&
            navigation.classList.contains("open")) {
            navigation.classList.remove("open");
            hamButton.classList.remove("open");
            hamButton.textContent = "☰";
            hamButton.style.transform = "rotate(0deg)";
            hamButton.focus(); // Return focus to hamburger button
        }
    });

    // Smooth page loading animation
    window.addEventListener("load", () => {
        document.body.style.opacity = "1";
        document.body.style.transition = "opacity 0.5s ease";

        // Animate elements on load
        const sections = document.querySelectorAll("main section");
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 100);
        });
    });

    // Initialize section animations
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Enhanced course button functionality
    const courseButtons = document.querySelectorAll(".courseButton");
    courseButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            courseButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");
        });
    });

    // Initialize the "All" button as active by default
    const allButton = document.querySelector('.courseButton[value="all"]');
    if (allButton) {
        allButton.classList.add("active");
    }

    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, observerOptions);

        // Observe course cards for scroll animations
        const courseCards = document.querySelectorAll(".course");
        courseCards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(card);
        });
    }

    // Performance optimization: Preload critical images
    const criticalImages = document.querySelectorAll("img[loading='eager'], .avatar img");
    criticalImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });

    // Add error handling for images
    const allImages = document.querySelectorAll("img");
    allImages.forEach(img => {
        img.addEventListener("error", () => {
            console.warn(`Failed to load image: ${img.src}`);
            // Optionally set a fallback image
            // img.src = "path/to/fallback-image.jpg";
        });
    });

    // Enhanced dialog functionality (if course details dialog exists)
    const dialog = document.getElementById("courses-details");
    if (dialog) {
        // Close dialog when clicking backdrop
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });

        // Enhanced escape key handling for dialog
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && dialog.open) {
                dialog.close();
            }
        });
    }

    // Console message for successful initialization
    console.log("🚀 Main.js loaded successfully!");
    console.log("✅ Navigation functionality initialized");
    console.log("✅ Dynamic footer content loaded");
    console.log("✅ Scroll behaviors activated");
    console.log("✅ Accessibility features enabled");

    // Performance monitoring (optional)
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page load time: ${loadTime}ms`);
            }, 0);
        });
    }
});