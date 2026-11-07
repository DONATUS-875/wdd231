
/* =========================================
   ABUJA CHAMBER OF COMMERCE
   MAIN JAVASCRIPT
========================================= */


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
   10. INITIALIZE DIRECTORY
========================================= */

getMembers();
