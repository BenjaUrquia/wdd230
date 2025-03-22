document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    const menuButton = document.getElementById("menuButton");
    const navList = document.querySelector(".navMenu");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuButton.textContent = navList.classList.contains("open") ? "✖" : "≡";
    });

    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = currentDate - lastVisit;
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentDate);

    document.getElementById("menuButton").addEventListener("click", function () {
        const navMenu = document.querySelector(".navMenu");
        navMenu.classList.toggle("active");
    });
});