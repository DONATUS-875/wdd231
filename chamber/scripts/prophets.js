
// URL of the JSON data
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the cards div
const cards = document.querySelector('#cards');

// Display prophet information
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        // Create HTML elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');

        // Build the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Set image attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add date and place of birth
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Add elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);

        // Add the completed card to the page
        cards.appendChild(card);
    });
};

// Fetch prophet data
async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Temporary testing line
        // console.table(data.prophets);

        displayProphets(data.prophets);

    } catch (error) {
        console.error('Error retrieving prophet data:', error);
    }
}

// Run the function
getProphetData();