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

function displayCourses(courseList) {
    const coursesList = document.querySelector("#courses-list");

    coursesList.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <span>${course.code}</span>
            ${course.completed ? "<span>✔</span>" : ""  }
        `;

        coursesList.appendChild(courseCard);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector("#credits-value").textContent = totalCredits;
}

function filterCourses(subject) {
    if (subject === "all") {
        displayCourses(courses);
    } else {
        const filteredCourses = courses.filter(
            course => course.subject === subject
        );

        displayCourses(filteredCourses);
    }
}

document.querySelector("#filter-all").addEventListener("click", () => {
    filterCourses("all");
});

document.querySelector("#filter-cse").addEventListener("click", () => {
    filterCourses("CSE");
});

document.querySelector("#filter-wdd").addEventListener("click", () => {
    filterCourses("WDD");
});

displayCourses(courses);

