const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

$(document).ready(function() {
    // Store carousel jQuery object
    const carousel = $('.carousel');

    // Store carousel items jQuery object
    const carouselItems = $('.carousel-item');

    // Get carousel width
    const carouselWidth = carousel.outerWidth();

    // Get item width
    const itemWidth = carouselItems.outerWidth(true);

    // Initialize currentPosition variable
    let currentPosition = 0;

    // Function to slide the carousel to the left
    function slideLeft() {
        currentPosition -= itemWidth;
        if (currentPosition < -carouselWidth) {
            currentPosition = 0;
        }
        carousel.css('transform', 'translateX(' + currentPosition + 'px)');
    }

    // Function to slide the carousel to the right
    function slideRight() {
        currentPosition += itemWidth;
        if (currentPosition > 0) {
            currentPosition = -carouselWidth + itemWidth;
        }
        carousel.css('transform', 'translateX(' + currentPosition + 'px)');
    }

    // Set interval to slide left every 3 seconds
    var slideInterval = setInterval(slideLeft, 3000);

    // Click events for navigation buttons
    $('.next').click(slideLeft);
    $('.prev').click(slideRight);

    // Pause slide interval on hover
    carousel.on('mouseenter', function() {
        clearInterval(slideInterval);
    });

    // Resume slide interval on mouse leave
    carousel.on('mouseleave', function() {
        slideInterval = setInterval(slideLeft, 3000);
    });
});

$(document).ready(function() {
    // Click events for navigation buttons
    $('.next').click(function() {
        $('.carousel').css('animation-play-state', 'paused');
    });

    $('.prev').click(function() {
        $('.carousel').css('animation-play-state', 'paused');
    });

    // Resume animation on mouse leave
    $('.carousel-wrapper').mouseleave(function() {
        $('.carousel').css('animation-play-state', 'running');
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var lastModifiedElement = document.getElementById("last-modified");
    var lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModified.toDateString();
});
$(document).ready(function() {
    // Function to check if the device is mobile
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    // Remove classes if the device is mobile
    if (isMobileDevice()) {
        $('.w-layout-grid, .grid, ._3col, .gap-150, .mobile-22').removeClass('w-layout-grid grid _3col gap-150 mobile-22');
    }
});

$(document).ready(function() {
    // Function to detect mobile devices
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    // Remove 'le-corps' class if on mobile device
    if (isMobileDevice()) {
        $('.main-container').removeClass('le-corps');
    }
});
$(document).ready(function() {
    // Function to check if the screen width is below a certain threshold
    function checkScreenSize() {
        if ($(window).width() <= 768) { // Assuming mobile screen size threshold
            $('.main-container').removeClass('le-corps');
        }
    }

    // Initial check
    checkScreenSize();

    // Check again if the window is resized
    $(window).resize(function() {
        checkScreenSize();
    });
});


$(document).ready(function() {
    // Get the current date and time
    var currentDate = new Date();
    // Format the date as needed (e.g., ISO string)
    var timestamp = currentDate.toISOString();
    // Set the value of the hidden field
    $('#timestamp').val(timestamp);
});


    $(document).ready(function() {
    var currentUrl = window.location.href;
    $('.navigation a').each(function() {
    if (this.href === currentUrl) {
    $(this).addClass('active');
}
});
});



