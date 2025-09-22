// members.js - Dynamic Member Spotlight from JSON data with enhanced debugging

console.log('🚀 Members.js loaded - Starting initialization');

async function loadMembers() {
    console.log('📥 loadMembers() called');

    try {
        console.log('🔍 Attempting to fetch data/members.json');

        // Load member data from JSON file
        const response = await fetch('data/members.json');
        console.log('📡 Fetch response status:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();
        console.log('📊 Members data loaded:', members);
        console.log('📈 Total members count:', members.length);

        // Filter for gold and silver members only
        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );
        console.log('✅ Qualified members (Gold/Silver):', qualifiedMembers);
        console.log('🎯 Qualified members count:', qualifiedMembers.length);

        if (qualifiedMembers.length === 0) {
            console.warn('⚠️ No qualified members found! Showing all members instead.');
            // Fallback to show all members if no Gold/Silver found
            const selectedMembers = getRandomMembers(members, Math.min(3, members.length));
            displayMemberSpotlight(selectedMembers);
            return;
        }

        // Randomly select 2-3 members
        const selectedMembers = getRandomMembers(qualifiedMembers, Math.min(3, qualifiedMembers.length));
        console.log('🎲 Selected members for spotlight:', selectedMembers);

        // Display the selected members
        displayMemberSpotlight(selectedMembers);

    } catch (error) {
        console.error('❌ Error loading members:', error);
        console.error('📍 Error details:', {
            message: error.message,
            stack: error.stack
        });

        // Fallback to existing static images if JSON fails
        console.log('🔄 Falling back to static images');
        displayFallbackSpotlight();
    }
}

function getRandomMembers(members, count) {
    console.log(`🎲 Getting ${count} random members from ${members.length} available`);

    if (members.length === 0) {
        console.warn('⚠️ No members provided to getRandomMembers');
        return [];
    }

    const shuffled = [...members].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    console.log('🎯 Random selection result:', selected);

    return selected;
}

function displayMemberSpotlight(members) {
    console.log('🖼️ displayMemberSpotlight() called with:', members);

    const carousel = document.getElementById('member-carousel');
    console.log('🎠 Carousel element:', carousel);

    if (!carousel) {
        console.error('❌ CRITICAL: Carousel element with ID "member-carousel" not found!');
        console.log('🔍 Available elements with class "carousel":',
            document.querySelectorAll('.carousel'));
        console.log('🔍 Available elements with ID containing "carousel":',
            document.querySelectorAll('[id*="carousel"]'));
        return;
    }

    console.log('🧹 Clearing existing carousel content');
    carousel.innerHTML = '';

    if (members.length === 0) {
        console.warn('⚠️ No members to display');
        carousel.innerHTML = '<div class="no-members">No members to display</div>';
        return;
    }

    members.forEach((member, index) => {
        console.log(`🏗️ Creating member item ${index + 1}:`, member);

        const memberItem = document.createElement('div');
        memberItem.className = 'carousel-item';

        // Validate member data
        const name = member.name || 'Unknown Member';
        const website = member.website || '#';
        const image = member.image || 'images/placeholder.jpg';
        const level = member.membershipLevel || 'Member';
        const description = member.other_information || 'No description available';

        console.log(`📝 Member ${index + 1} data:`, {
            name, website, image, level, description
        });

        memberItem.innerHTML = `
            <a href="${website}" target="_blank" title="${name}">
                <img src="${image}" alt="${name}" loading="lazy" 
                     onerror="console.error('Failed to load image:', this.src); this.src='images/placeholder.jpg';">
                <div class="member-info">
                    <h4>${name}</h4>
                    <p>${level} Member</p>
                    <p>${description}</p>
                </div>
            </a>
        `;

        carousel.appendChild(memberItem);
        console.log(`✅ Added member item ${index + 1} to carousel`);
    });

    console.log('🎉 Member spotlight display completed!');
    console.log('📊 Final carousel HTML:', carousel.innerHTML);
}

function displayFallbackSpotlight() {
    console.log('🔄 displayFallbackSpotlight() called');

    // Fallback to existing images if JSON loading fails
    const carousel = document.getElementById('member-carousel');

    if (!carousel) {
        console.error('❌ CRITICAL: Carousel element not found for fallback!');
        return;
    }

    const fallbackImages = [
        { src: 'images/pic1.webp', alt: 'Company Partner 1' },
        { src: 'images/pic2.webp', alt: 'Company Partner 2' }, // Fixed: different image
        { src: 'images/pic3.webp', alt: 'Company Partner 3' }  // Fixed: different image
    ];

    console.log('🖼️ Using fallback images:', fallbackImages);
    carousel.innerHTML = '';

    fallbackImages.forEach((img, index) => {
        console.log(`🏗️ Creating fallback item ${index + 1}:`, img);

        const memberItem = document.createElement('div');
        memberItem.className = 'carousel-item';
        memberItem.innerHTML = `
            <a href="#" title="${img.alt}">
                <img src="${img.src}" alt="${img.alt}" loading="lazy"
                     onerror="console.error('Failed to load fallback image:', this.src);">
                <div class="member-info">
                    <h4>${img.alt}</h4>
                    <p>Partner Member</p>
                </div>
            </a>
        `;
        carousel.appendChild(memberItem);
        console.log(`✅ Added fallback item ${index + 1}`);
    });

    console.log('🎉 Fallback spotlight display completed!');
}

// Enhanced DOM ready check with debugging
function initializeCarousel() {
    console.log('🎬 initializeCarousel() called');
    console.log('📄 Document ready state:', document.readyState);
    console.log('🌐 Current URL:', window.location.href);

    // Check if required elements exist
    const carousel = document.getElementById('member-carousel');
    const spotlightSection = document.getElementById('company-spotlights');

    console.log('🔍 DOM Elements check:', {
        carousel: !!carousel,
        spotlightSection: !!spotlightSection,
        carouselElement: carousel,
        spotlightElement: spotlightSection
    });

    if (!carousel) {
        console.error('❌ FATAL: member-carousel element not found in DOM!');
        console.log('🔍 Available elements:', {
            allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
            allCarousels: document.querySelectorAll('.carousel'),
            allSections: document.querySelectorAll('section')
        });
        return;
    }

    console.log('✅ All required elements found, starting member loading...');
    loadMembers();
}

// Multiple event listeners to ensure initialization
console.log('🔧 Setting up event listeners...');

if (document.readyState === 'loading') {
    console.log('📄 Document still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
    console.log('📄 Document already loaded, initializing immediately');
    initializeCarousel();
}

// Backup initialization after a delay
setTimeout(() => {
    console.log('⏰ Backup initialization after 2 seconds');
    if (!document.getElementById('member-carousel')?.hasChildNodes()) {
        console.log('🔄 Carousel still empty, trying backup initialization');
        initializeCarousel();
    }
}, 2000);

console.log('🏁 Members.js setup complete');