// Optional: Display the last submitted form data
document.addEventListener('DOMContentLoaded', function() {
    try {
        const lastSubmission = JSON.parse(localStorage.getItem('lastContactSubmission'));
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions'));

        if (submissions && submissions.length > 0) {
            const latest = submissions[submissions.length - 1];
            console.log('Latest submission:', latest);
            // You could display this data on the success page if desired
        }
    } catch (error) {
        console.log('No previous submissions found or error reading data');
    }
});