// Debug version with multiple fallback paths and embedded data
(function() {
    'use strict';

    // DOM elements
    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
    const display = document.querySelector("article");

    // View switching functionality
    if (gridbutton && listbutton && display) {
        gridbutton.addEventListener("click", function() {
            display.classList.add("directoring-grid");
            display.classList.remove("directoring-list");
            gridbutton.setAttribute('aria-pressed', 'true');
            listbutton.setAttribute('aria-pressed', 'false');
        });

        listbutton.addEventListener("click", function() {
            display.classList.add("directoring-list");
            display.classList.remove("directoring-grid");
            listbutton.setAttribute('aria-pressed', 'true');
            gridbutton.setAttribute('aria-pressed', 'false');
        });
    }

    // Fallback data in case JSON file isn't found
    const fallbackData = [
        {
            "name": "Tech Solutions Inc",
            "address": "123 Business Ave, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 67",
            "website": "https://www.techsolutions.ci",
            "image": "images/directory/camplogo1.webp",
            "membership_level": "Gold",
            "other_information": "Leading provider of IT solutions and consulting services"
        },
        {
            "name": "Green Energy Co",
            "address": "456 Renewable St, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 68",
            "website": "https://www.greenenergy.ci",
            "image": "images/directory/camplogo2.webp",
            "membership_level": "Silver",
            "other_information": "Sustainable energy solutions for businesses and homes"
        },
        {
            "name": "Local Restaurant Group",
            "address": "789 Food Plaza, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 69",
            "website": "https://www.localrestaurants.ci",
            "image": "images/directory/camplogo3.webp",
            "membership_level": "Bronze",
            "other_information": "Family-owned restaurants serving authentic local cuisine"
        },
        {
            "name": "Financial Services Ltd",
            "address": "321 Bank Street, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 70",
            "website": "https://www.finservices.ci",
            "image": "images/directory/camplogo4.webp",
            "membership_level": "Gold",
            "other_information": "Comprehensive financial planning and investment services"
        },
        {
            "name": "Construction & Development",
            "address": "654 Builder Blvd, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 71",
            "website": "https://www.construction.ci",
            "image": "images/directory/camplogo5.webp",
            "membership_level": "Silver",
            "other_information": "Commercial and residential construction projects"
        },
        {
            "name": "Healthcare Partners",
            "address": "987 Medical Center, Abidjan, Côte d'Ivoire",
            "phone": "+225 01 23 45 72",
            "website": "https://www.healthcare.ci",
            "image": "images/directory/camplogo6.webp",
            "membership_level": "Gold",
            "other_information": "Modern healthcare facilities with experienced medical professionals"
        }
    ];

    // Company card creation
    function createCompanyCard(company) {
        const section = document.createElement('section');
        section.classList.add("directoring-section");

        // Company logo
        const img = document.createElement('img');
        img.src = company.image;
        img.alt = `${company.name} logo`;
        img.classList.add("directoring-img");
        img.width = 95;
        img.height = 73;
        img.loading = "lazy";
        section.appendChild(img);

        // Company name
        const heading = document.createElement('h3');
        heading.textContent = company.name;
        section.appendChild(heading);

        // Address
        const addressDiv = document.createElement('div');
        addressDiv.innerHTML = `<strong>Address:</strong> ${company.address}`;
        section.appendChild(addressDiv);

        // Phone
        const phoneDiv = document.createElement('div');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${company.phone.replace(/\D/g, '')}`;
        phoneLink.textContent = company.phone;
        phoneDiv.innerHTML = '<strong>Phone:</strong> ';
        phoneDiv.appendChild(phoneLink);
        section.appendChild(phoneDiv);

        // Website
        const websiteLink = document.createElement('a');
        websiteLink.href = company.website;
        websiteLink.textContent = 'Visit Website';
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';
        section.appendChild(websiteLink);

        // Membership level
        const membershipDiv = document.createElement('div');
        membershipDiv.innerHTML = `<strong>Membership:</strong> ${company.membership_level}`;
        section.appendChild(membershipDiv);

        // Additional info
        if (company.other_information && company.other_information.trim()) {
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `<strong>Info:</strong> ${company.other_information}`;
            section.appendChild(infoDiv);
        }

        return section;
    }

    // Display data function
    function displayData(data) {
        const container = document.querySelector('.directoring-grid');
        const loadingElement = document.querySelector('#loading');

        if (loadingElement) {
            loadingElement.remove();
        }

        const fragment = document.createDocumentFragment();
        data.forEach(company => {
            const section = createCompanyCard(company);
            fragment.appendChild(section);
        });

        container.appendChild(fragment);
        console.log(`Displayed ${data.length} companies successfully`);
    }

    // Data loading with multiple attempts
    function loadDirectoryData() {
        const container = document.querySelector('.directoring-grid');

        if (!container) {
            console.error('Directory container not found');
            return;
        }

        // Multiple possible paths to try
        const paths = [
            'data/members.json',
            '../data/members.json',
            './data/members.json',
            '/wdd231/chamber/data/members.json',
            'https://ebenezeroppong4127.github.io/wdd231/chamber/data/members.json'
        ];

        let attemptCount = 0;

        function tryNextPath() {
            if (attemptCount >= paths.length) {
                console.warn('All JSON paths failed, using fallback data');
                displayData(fallbackData);
                return;
            }

            const currentPath = paths[attemptCount];
            console.log(`Attempt ${attemptCount + 1}: Trying ${currentPath}`);

            fetch(currentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Success! Loaded data from: ${currentPath}`);
                    displayData(data);
                })
                .catch(error => {
                    console.log(`Failed ${currentPath}:`, error.message);
                    attemptCount++;
                    tryNextPath();
                });
        }

        tryNextPath();
    }

    // Initialize everything
    document.addEventListener("DOMContentLoaded", function() {
        // Last modified date
        const lastModifiedElement = document.getElementById("last-modified");
        if (lastModifiedElement) {
            const lastModified = new Date(document.lastModified);
            lastModifiedElement.textContent = lastModified.toDateString();
        }

        // Active navigation
        const currentUrl = window.location.href;
        const navLinks = document.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            if (link.href === currentUrl) {
                link.classList.add('active');
            }
        });

        // Load data
        loadDirectoryData();
    });

})();