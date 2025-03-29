
document.addEventListener("DOMContentLoaded", function () {

    // Footer Last Modified
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


    //Hamburguer Menu
    const menuButton = document.getElementById("menuButton");
    const navList = document.querySelector("nav ul");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuButton.textContent = navList.classList.contains("open") ? "✖" : "≡";
    });


    // Dark Mode
    const modeButton = document.querySelector("#mode");
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");

    modeButton.addEventListener("click", () => {
        if (modeButton.textContent.includes("🌙")) {
            nav.style.background = "#000";
            header.style.background = "#000";
            main.style.background = "#000";
            main.style.color = "#fff";
            footer.style.background = "#000";
            modeButton.textContent = "🔆";
        } else {
            header.style.background = "#2b455f";
            main.style.background = "white";
            main.style.color = "#000";
            nav.style.background = "#183149";
            footer.style.background = "#2b455f"
            modeButton.textContent = "🌙";
        }
    });


    // Form 
    const form = document.getElementById("userForm");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const email = document.getElementById("email");
    const pageRating = document.getElementById("pageRating");
    const ratingValue = document.getElementById("ratingValue");

    function validatePassword() {
        const passwordPattern = /^[a-zA-Z0-9ñÑ]{8,}$/;
        if (!passwordPattern.test(password.value)) {
            alert("Password must be at least 8 characters long and contain only letters and numbers.");
            password.value = "";
            password2.value = "";
            password.focus();
            return false;
        }
        return true;
    }

    function confirmPassword() {
        if (password.value !== password2.value) {
            alert("Passwords do not match! Please try again.");
            password.value = "";
            password2.value = "";
            password.focus();
            return false;
        }
        return true;
    }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;
        if (!emailPattern.test(email.value)) {
            alert("Please enter a valid BYU-Idaho email address (e.g., user@byui.edu).");
            email.value = "";
            email.focus();
            return false;
        }
        return true;
    }

    function updateRating() {
        ratingValue.textContent = pageRating.value;
    }

    pageRating.addEventListener("input", updateRating);

    form.addEventListener("submit", function (event) {
        if (!validatePassword() || !confirmPassword() || !validateEmail()) {
            event.preventDefault();
        }
    });
})