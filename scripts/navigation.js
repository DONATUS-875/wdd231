// Store the selected element that we are going to use
const navbutton = document.querySelector("#hamburger-button");
const navlinks = document.querySelector("#nav-bar");

// Toggle the show class off and on
navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navlinks.classList.toggle("show");
});