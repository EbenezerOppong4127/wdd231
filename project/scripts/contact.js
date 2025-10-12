// Contact Form Handling with Local Storage and Success Page Redirect
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all the values user entered in the form
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString(),
        id: Date.now() // Unique ID for each submission
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Save form data to localStorage
    saveFormData(formData);

    // Clear the form fields
    form.reset();

    // Redirect to success page
    window.location.href = 'success.html';
});

// Function to save form data to localStorage
function saveFormData(formData) {
    try {
        // Get existing submissions or initialize empty array
        const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];

        // Add new submission
        existingSubmissions.push(formData);

        // Keep only last 50 submissions to prevent localStorage from getting too large
        const recentSubmissions = existingSubmissions.slice(-50);

        // Save back to localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(recentSubmissions));


    } catch (error) {

        localStorage.setItem('lastContactSubmission', JSON.stringify(formData));
    }
}

// Optional: Form validation on input
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = 'var(--cinnabar)';
        } else {
            this.style.borderColor = '';
        }
    });

    // Phone number formatting (optional)
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+1 (' + value;
            if (value.length > 7) {
                value = value.slice(0, 7) + ') ' + value.slice(7);
            }
            if (value.length > 12) {
                value = value.slice(0, 12) + '-' + value.slice(12, 16);
            }
        }
        this.value = value;
    });
});