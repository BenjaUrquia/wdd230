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

    // Visitor Count
    const visitCounter = document.getElementById("visitCounter");
    let visits = localStorage.getItem("pageVisits");

    if (!visits) {
        visits = 0;
    } else {
        visits = parseInt(visits);
    }

    visits++;
    localStorage.setItem("pageVisits", visits);
    visitCounter.textContent = visits;




    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-33&lon=-60.7&units=imperial&appid=b090fd32a362009d6f610d02d94bed33';
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('#captionDesc');

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    function displayResults(data) {
        currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
    }

    apiFetch();

});