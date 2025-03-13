document.addEventListener("DOMContentLoaded", function () {


    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;



    const menuButton = document.getElementById("menuButton");
    const navList = document.querySelector("nav ul");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuButton.textContent = navList.classList.contains("open") ? "✖" : "≡";
    });



    const modeButton = document.querySelector("#mode");
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    const section = document.querySelector("section");
    const card2 = document.querySelector(".card2");

    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");

    modeButton.addEventListener("click", () => {
        if (modeButton.textContent.includes("🌙")) {
            nav.style.background = "#000";
            header.style.background = "#000";
            main.style.background = "#000";
            main.style.color = "#fff";
            section.style.background = "grey";
            card2.style.background = "grey";
            footer.style.background = "#000";
            modeButton.textContent = "🔆";
        } else {
            header.style.background = "#2b455f";
            main.style.background = "white";
            main.style.color = "#000";
            nav.style.background = "#183149";
            section.style.background = "white";
            card2.style.background = "white";
            footer.style.background = "#2b455f"
            modeButton.textContent = "🌙";
        }
    });

});