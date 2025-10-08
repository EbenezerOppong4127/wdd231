
    // STEP 1: Select the form element from the page
    const form = document.getElementById('contactForm');

    // STEP 2: Add an event listener that runs when form is submitted
    form.addEventListener('submit', function(e) {
    // STEP 3: Prevent the page from refreshing (default behavior)
    e.preventDefault();

    // STEP 4: Get all the values user entered in the form
    const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
};

    // STEP 5: Show what was submitted (in real app, this would send to server)
    console.log('Form submitted with data:', formData);

    // STEP 6: Show success message to user
    alert('Thank you for your message! We will get back to you soon.');

    // STEP 7: Clear the form fields
    form.reset();
});
