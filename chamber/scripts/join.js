
// JOIN PAGE FORM

const membershipForm = document.querySelector("#membership-form");

const timestampField = document.querySelector("#form-timestamp");

const formMessage = document.querySelector("#form-message");

// Record the date and time when the form is submitted
if (membershipForm) {
    membershipForm.addEventListener("submit", function (event) {
        event.preventDefault();

        timestampField.value = new Date().toISOString();

        const firstName = document.querySelector("#first-name").value;
        const lastName = document.querySelector("#last-name").value;

        const membershipLevel = document.querySelector("#membership-level").value;

        formMessage.textContent =
            `Thank you, ${firstName} ${lastName}! Your ${membershipLevel} membership application has been prepared successfully.`;

        membershipForm.reset();
    });
}
