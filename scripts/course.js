
// Course data
const courses = [
    {
        code: "CSE 110",
        subject: "CSE",
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 130",
        subject: "WDD",
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "CSE 111",
        subject: "CSE",
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        code: "CSE 210",
        subject: "CSE",
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 131",
        subject: "WDD",
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 231",
        subject: "WDD",
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

// Select the course list and credit display
const coursesList = document.querySelector("#courses-list");
const creditsValue = document.querySelector("#credits-value");

// Select the filter buttons
const filterAllButton = document.querySelector("#filter-all");
const filterCSEButton = document.querySelector("#filter-cse");
const filterWDDButton = document.querySelector("#filter-wdd");

// Display courses and calculate credits
function displayCourses(courseList) {
    // Clear the existing course cards
    coursesList.innerHTML = "";

    // Create a card for each course
    courseList.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <span>${course.code}</span>
            <span>${course.completed ? "✓ Completed" : "Not Completed"}</span>
        `;

        // Add a descriptive title for accessibility
        courseCard.setAttribute(
            "aria-label",
            `${course.code}: ${course.title}. ${
                course.completed ? "Completed" : "Not completed"
            }. ${course.credits} credits.`
        );

        coursesList.appendChild(courseCard);
    });

    // Calculate the credits for the currently displayed courses
    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditsValue.textContent = totalCredits;
}

// Highlight the active filter button
function updateActiveFilter(activeButton) {
    const filterButtons = [
        filterAllButton,
        filterCSEButton,
        filterWDDButton
    ];

    filterButtons.forEach((button) => {
        const isActive = button === activeButton;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

// Filter the course list
function filterCourses(subject, activeButton) {
    let filteredCourses;

    if (subject === "all") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(
            (course) => course.subject === subject
        );
    }

    displayCourses(filteredCourses);
    updateActiveFilter(activeButton);
}

// Add event listeners to the filter buttons
filterAllButton.addEventListener("click", () => {
    filterCourses("all", filterAllButton);
});

filterCSEButton.addEventListener("click", () => {
    filterCourses("CSE", filterCSEButton);
});

filterWDDButton.addEventListener("click", () => {
    filterCourses("WDD", filterWDDButton);
});

// Display all courses when the page first loads
displayCourses(courses);
updateActiveFilter(filterAllButton);
