
// Select the hamburger button and navigation menu
const menuButton = document.querySelector("#hamburger-button");
const navigation = document.querySelector("#nav-bar");

// Open and close the navigation menu when the button is clicked
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    // Update accessibility attributes
    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change the hamburger icon to an X when the menu is open
    menuButton.textContent = isOpen ? "✕" : "☰";
});
