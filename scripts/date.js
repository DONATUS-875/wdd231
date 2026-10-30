
// Display the current year in the footer
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

// Display the date and time the document was last modified
document.querySelector("#lastModified").textContent = document.lastModified;
