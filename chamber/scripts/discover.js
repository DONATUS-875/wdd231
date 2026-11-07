
// DISCOVER PAGE

const discoverContainer = document.querySelector("#discover-cards");
const visitorMessage = document.querySelector("#visitor-message");

// VISITOR MESSAGE USING LOCAL STORAGE

function displayVisitorMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitorMessage.textContent =
            "Welcome! We are glad you are visiting Abuja. Explore our amazing destinations.";
    } else {
        const elapsedTime = currentVisit - Number(lastVisit);
        const daysBetweenVisits = Math.floor(
            elapsedTime / (1000 * 60 * 60 * 24)
        );

        if (daysBetweenVisits < 1) {
            visitorMessage.textContent =
                "Back so soon! Awesome! We hope you enjoy discovering more of Abuja.";
        } else if (daysBetweenVisits === 1) {
            visitorMessage.textContent =
                "You last visited 1 day ago. Welcome back!";
        } else {
            visitorMessage.textContent =
                `You last visited ${daysBetweenVisits} days ago. Welcome back!`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

// LOAD ATTRACTIONS FROM JSON

async function loadDiscoverPlaces() {
    try {
        const response = await fetch("data/places.json");

        if (!response.ok) {
            throw new Error("Unable to load Abuja attractions.");
        }

        const places = await response.json();

        discoverContainer.innerHTML = "";

        places.forEach((place) => {
            const card = document.createElement("article");
            card.classList.add("discover-card");

            const image = document.createElement("img");
            image.src = place.image;
            image.alt = place.imageAlt;
            image.loading = "lazy";
            image.width = 400;
            image.height = 260;

            const content = document.createElement("div");
            content.classList.add("discover-card-content");

            const heading = document.createElement("h3");
            heading.textContent = place.name;

            const address = document.createElement("address");
            address.textContent = place.address;

            const description = document.createElement("p");
            description.textContent = place.description;

            content.append(heading, address, description);
            card.append(image, content);

            discoverContainer.appendChild(card);
        });

    } catch (error) {
        discoverContainer.innerHTML =
            '<p class="error-message">Sorry, Abuja attractions could not be loaded. Please check your data/places.json file.</p>';

        console.error(error);
    }
}

// INITIALIZE DISCOVER PAGE

displayVisitorMessage();
loadDiscoverPlaces();
