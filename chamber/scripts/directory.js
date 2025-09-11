

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("directoring-grid");
    display.classList.remove("directoring-list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("directoring-list");
    display.classList.remove("directoring-grid");
}

document.addEventListener("DOMContentLoaded", function() {
    var lastModifiedElement = document.getElementById("last-modified");
    var lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModified.toDateString();
});

const baseURL = 'https://ebenezeroppong4127.github.io/wdd230'; // Your GitHub Pages URL
const membersURL = `${baseURL}/chamber/data/members.json`;

fetch(membersURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(company => {
            var section = document.createElement('section');
            section.classList.add("directoring-section");

            var img = document.createElement('img');
            img.src = company.image;
            img.alt = company.name;
            img.classList.add("directoring-img");
            section.appendChild(img);

            var h2 = document.createElement('h2');
            h2.textContent = company.name;
            section.appendChild(h2);

            var pAddress = document.createElement('p');
            pAddress.textContent = company.address;
            section.appendChild(pAddress);

            var pPhone = document.createElement('p');
            pPhone.textContent = company.phone;
            section.appendChild(pPhone);

            var aWebsite = document.createElement('a');
            aWebsite.href = company.website;
            aWebsite.textContent = 'Website';
            aWebsite.target = '_blank';
            section.appendChild(aWebsite);

            var pMembership = document.createElement('p');
            pMembership.textContent = 'Membership Level: ' + company.membership_level;
            section.appendChild(pMembership);

            var pOtherInfo = document.createElement('p');
            pOtherInfo.textContent = company.other_information;
            section.appendChild(pOtherInfo);

            document.querySelector('.directoring-grid').appendChild(section);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


    $(document).ready(function() {
    var currentUrl = window.location.href;
    $('.navigation a').each(function() {
    if (this.href === currentUrl) {
    $(this).addClass('active');
}
});
});
