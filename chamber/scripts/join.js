// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    const now = new Date();
    timestampField.value = now.toISOString();

    // Update last modified
    document.getElementById('last-modified').textContent = document.lastModified;
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.membership-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal when card is clicked
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Close modal when X is clicked
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

// Form validation enhancement
document.querySelector('form').addEventListener('submit', function(e) {
    const titleField = document.getElementById('title');
    if (titleField.value && titleField.value.length < 7) {
        e.preventDefault();
        alert('Title/Position must be at least 7 characters long.');
        titleField.focus();
    }
});