
/* =========================================
   ABUJA CHAMBER OF COMMERCE
   MAIN JAVASCRIPT
========================================= */

/* OPENWEATHER API CONFIGURATION */
const WEATHER_API_KEY = "76759025518ee8df02683967036f4e11"

/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close the mobile menu after selecting a navigation link.
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        });
    });
}


/* =========================================
   2. DARK MODE TOGGLE
========================================= */

const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");

        themeButton.setAttribute("aria-pressed", isDarkMode);
        themeButton.setAttribute(
            "aria-label",
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
        );

        const themeIcon = themeButton.querySelector("span:first-child");
        const themeText = themeButton.querySelector(".theme-button-text");

        if (themeIcon) {
            themeIcon.textContent = isDarkMode ? "☀" : "☾";
        }

        if (themeText) {
            themeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
        }
    });
}


/* =========================================
   3. SELECT DIRECTORY ELEMENTS
========================================= */

const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#view-grid");
const listButton = document.querySelector("#view-list");


/* =========================================
   4. GRID AND LIST VIEW TOGGLE
========================================= */

function setDirectoryView(view) {
    if (!membersContainer || !gridButton || !listButton) {
        return;
    }

    if (view === "grid") {
        membersContainer.classList.remove("list-view");
        membersContainer.classList.add("grid-view");

        gridButton.classList.add("active");
        listButton.classList.remove("active");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    } else {
        membersContainer.classList.remove("grid-view");
        membersContainer.classList.add("list-view");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");
    }
}

if (gridButton) {
    gridButton.addEventListener("click", () => {
        setDirectoryView("grid");
    });
}

if (listButton) {
    listButton.addEventListener("click", () => {
        setDirectoryView("list");
    });
}


/* =========================================
   5. GET MEMBERSHIP LEVEL
========================================= */

function getMembershipName(level) {
    switch (Number(level)) {
        case 1:
            return "Member";
        case 2:
            return "Silver Member";
        case 3:
            return "Gold Member";
        default:
            return "Membership Level Unspecified";
    }
}


/* =========================================
   6. CREATE A BUSINESS DIRECTORY CARD
========================================= */

function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    // Business image
    const image = document.createElement("img");
    image.classList.add("member-image");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business image`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    // Remove the image if its file cannot be loaded.
    image.addEventListener("error", () => {
        image.remove();
    });

    // Business information container
    const info = document.createElement("div");
    info.classList.add("member-info");

    // Business name
    const name = document.createElement("h3");
    name.textContent = member.name;

    // Membership level
    const membership = document.createElement("span");
    membership.classList.add("membership-level");
    membership.textContent = getMembershipName(member.membershipLevel);

    // Business description
    const description = document.createElement("p");
    description.textContent = member.description;

    // Business details container
    const details = document.createElement("div");
    details.classList.add("member-details");

    // Business address
    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    // Business phone number
    const phone = document.createElement("p");
    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${member.phone.replace(/[^\d+]/g, "")}`;
    phoneLink.textContent = member.phone;
    phone.append("Phone: ", phoneLink);

    // Business website
    const websiteParagraph = document.createElement("p");
    const websiteLink = document.createElement("a");

    try {
        const websiteURL = new URL(member.website);

        if (["http:", "https:"].includes(websiteURL.protocol)) {
            websiteLink.href = websiteURL.href;
            websiteLink.textContent = "Visit Website";
            websiteLink.classList.add("member-website");
            websiteLink.target = "_blank";
            websiteLink.rel = "noopener noreferrer";
            websiteParagraph.appendChild(websiteLink);
        } else {
            websiteParagraph.textContent = "Website unavailable";
        }
    } catch {
        websiteParagraph.textContent = "Website unavailable";
    }

    // Assemble business details
    details.append(address, phone, websiteParagraph);

    // Assemble the business information
    info.append(name, membership, description, details);

    // Assemble the complete business card
    card.append(image, info);

    return card;
}


/* =========================================
   7. FETCH AND DISPLAY MEMBERS USING ASYNC/AWAIT
========================================= */

async function getMembers() {
    if (!membersContainer) {
        return;
    }

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Unable to load members: ${response.status}`);
        }

        const members = await response.json();

        if (!Array.isArray(members) || members.length === 0) {
            throw new Error("No chamber members were found.");
        }

        // Remove the loading message.
        membersContainer.replaceChildren();

        // Create and display each member card.
        members.forEach((member) => {
            const memberCard = createMemberCard(member);
            membersContainer.appendChild(memberCard);
        });

        // Start with grid view.
        setDirectoryView("grid");

    } catch (error) {
        console.error("Error loading chamber members:", error);

        membersContainer.replaceChildren();

        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.setAttribute("role", "alert");
        errorMessage.textContent =
            "Sorry, the chamber directory could not be loaded. Please try again later.";

        membersContainer.appendChild(errorMessage);
    }
}


/* =========================================
   8. FOOTER COPYRIGHT YEAR
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   9. FOOTER LAST MODIFIED DATE
========================================= */

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    const modifiedDate = new Date(document.lastModified);

    lastModified.textContent = modifiedDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


/* =========================================
   COMPANY SPOTLIGHTS - W03 HOME PAGE
========================================= */

// Create an individual company spotlight card.
function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    // Company logo/image
    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    image.addEventListener("error", () => {
        image.remove();
    });

    // Company information
    const info = document.createElement("div");
    info.classList.add("spotlight-info");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const membership = document.createElement("span");
    membership.classList.add("membership-level");
    membership.textContent = getMembershipName(member.membershipLevel);

    const description = document.createElement("p");
    description.textContent = member.description;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const phone = document.createElement("p");
    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${member.phone.replace(/[^\d+]/g, "")}`;
    phoneLink.textContent = member.phone;
    phone.append("Phone: ", phoneLink);

    // Website link
    const websiteParagraph = document.createElement("p");

    try {
        const websiteURL = new URL(member.website);

        if (["http:", "https:"].includes(websiteURL.protocol)) {
            const websiteLink = document.createElement("a");
            websiteLink.href = websiteURL.href;
            websiteLink.textContent = "Visit Website";
            websiteLink.target = "_blank";
            websiteLink.rel = "noopener noreferrer";

            websiteParagraph.appendChild(websiteLink);
        } else {
            websiteParagraph.textContent = "Website unavailable";
        }
    } catch {
        websiteParagraph.textContent = "Website unavailable";
    }

    info.append(
        name,
        membership,
        description,
        address,
        phone,
        websiteParagraph
    );

    card.append(image, info);

    return card;
}


// Fetch and randomly display two or three Gold/Silver members.
async function getSpotlights() {
    const spotlightsContainer = document.querySelector(
        "#spotlights-container"
    );

    // Do nothing if this is not the home page.
    if (!spotlightsContainer) {
        return;
    }

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Unable to load members: ${response.status}`);
        }

        const members = await response.json();

        // Only Gold (3) and Silver (2) members qualify.
        const eligibleMembers = members.filter(
            (member) =>
                Number(member.membershipLevel) === 2 ||
                Number(member.membershipLevel) === 3
        );

        if (eligibleMembers.length < 2) {
            throw new Error("Not enough eligible spotlight members.");
        }

        // Randomly shuffle eligible members.
        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        // Randomly display either two or three members.
        const numberOfSpotlights = Math.min(
            Math.floor(Math.random() * 2) + 2,
            shuffledMembers.length
        );

        const selectedMembers = shuffledMembers.slice(
            0,
            numberOfSpotlights
        );

        // Clear loading message.
        spotlightsContainer.replaceChildren();

        // Display selected business cards.
        selectedMembers.forEach((member) => {
            const card = createSpotlightCard(member);
            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading company spotlights:", error);

        spotlightsContainer.textContent =
            "Company spotlights are temporarily unavailable.";
    }
}

/* =========================================
   INITIALIZE DIRECTORY AND SPOTLIGHTS
========================================= */

getMembers();
getSpotlights();

/* =========================================
   ABUJA WEATHER API
========================================= */

// Abuja coordinates
const ABUJA_LAT = 9.0765;
const ABUJA_LON = 7.3986;

// Display current weather
function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector("#current-weather");

    if (!weatherContainer) return;

    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = `
        <div class="weather-card">
            <h3>Current Weather in Abuja</h3>

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="100"
                height="100"
            >

            <p class="current-temperature">
                ${Math.round(data.main.temp)}°C
            </p>

            <p class="weather-description">
                ${description}
            </p>
        </div>
    `;
}


// Get Abuja's local date
function getAbujaDateKey(timestamp) {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date(timestamp * 1000));

    const year = parts.find(part => part.type === "year").value;
    const month = parts.find(part => part.type === "month").value;
    const day = parts.find(part => part.type === "day").value;

    return `${year}-${month}-${day}`;
}


// Display three-day forecast
function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast-container");

    if (!forecastContainer) return;

    forecastContainer.innerHTML = "";

    const today = getAbujaDateKey(Date.now() / 1000);

    const groupedForecast = {};

    data.list.forEach(entry => {
        const date = getAbujaDateKey(entry.dt);

        // Exclude today's remaining forecast
        if (date <= today) return;

        if (!groupedForecast[date]) {
            groupedForecast[date] = [];
        }

        groupedForecast[date].push(entry);
    });

    const forecastDays = Object.keys(groupedForecast)
        .sort()
        .slice(0, 3);

    forecastDays.forEach(date => {
        const entries = groupedForecast[date];

        // Choose the forecast closest to midday in Abuja
        const middayForecast = entries.reduce((closest, entry) => {
            const hourParts = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Africa/Lagos",
                hour: "2-digit",
                hourCycle: "h23"
            }).formatToParts(new Date(entry.dt * 1000));

            const hour = Number(
                hourParts.find(part => part.type === "hour").value
            );

            const closestHour = Number(
                new Intl.DateTimeFormat("en-GB", {
                    timeZone: "Africa/Lagos",
                    hour: "2-digit",
                    hourCycle: "h23"
                }).format(new Date(closest.dt * 1000))
            );

            return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                ? entry
                : closest;
        });

        const dayName = new Intl.DateTimeFormat("en-NG", {
            weekday: "long",
            day: "numeric",
            month: "short",
            timeZone: "Africa/Lagos"
        }).format(new Date(middayForecast.dt * 1000));

        const description = middayForecast.weather[0].description;
        const icon = middayForecast.weather[0].icon;
        const temperature = Math.round(middayForecast.main.temp);

        const card = document.createElement("article");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <h4>${dayName}</h4>

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="80"
                height="80"
            >

            <p class="forecast-temperature">
                ${temperature}°C
            </p>

            <p>${description}</p>
        `;

        forecastContainer.appendChild(card);
    });

    if (forecastDays.length === 0) {
        forecastContainer.textContent =
            "The forecast is currently unavailable.";
    }
}


// Fetch current weather and forecast
async function getAbujaWeather() {
    const currentWeatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${ABUJA_LAT}&lon=${ABUJA_LON}&units=metric&appid=${WEATHER_API_KEY}`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${ABUJA_LAT}&lon=${ABUJA_LON}&units=metric&appid=${WEATHER_API_KEY}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        document.querySelector("#current-weather").textContent =
            "Unable to load current weather. Please try again later.";

        document.querySelector("#forecast-container").textContent =
            "Unable to load the weather forecast.";
    }
}


// Start weather display
getAbujaWeather();
