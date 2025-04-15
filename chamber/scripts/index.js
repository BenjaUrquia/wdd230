document.addEventListener("DOMContentLoaded", function () {

    // Footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    // Nav Hamburger
    const menuButton = document.getElementById("menuButton");
    const navList = document.querySelector(".navMenu");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuButton.textContent = navList.classList.contains("open") ? "✖" : "≡";
    });

    // Visit Message
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();
    const visitMessage = document.getElementById("visitMessage");

    if (visitMessage) {
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
    }

    // Weather
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-33&lon=-60.7&units=imperial&appid=b090fd32a362009d6f610d02d94bed33';
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('#captionDesc');

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
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

    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=-33&lon=-60.7&units=imperial&appid=b090fd32a362009d6f610d02d94bed33";

    async function getForecast() {
        try {
            const response = await fetch(forecastURL);
            if (response.ok) {
                const data = await response.json();
                displayForecast(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log("Forecast error:", error);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById("forecast");
        const forecastAtNoon = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        forecastContainer.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const dayData = forecastAtNoon[i];
            const date = new Date(dayData.dt_txt);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(dayData.main.temp);
            const icon = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
            const desc = dayData.weather[0].description;

            const dayDiv = document.createElement("div");
            dayDiv.classList.add("forecast-day");
            dayDiv.innerHTML = `
                <h4>${dayName}</h4>
                <img src="${icon}" alt="${desc}" />
                <p>${temp}&deg;F</p>`;
            forecastContainer.appendChild(dayDiv);
        }
    }

    // Spotlight
    const spotlightSection = document.getElementById("spotlights");
    const membershipLevels = ["NP", "Bronze", "Silver", "Gold"];
    const visitorMembership = membershipLevels[Math.floor(Math.random() * membershipLevels.length)];
    console.log("Membership:", visitorMembership);

    if (visitorMembership === "Silver" || visitorMembership === "Gold") {
        fetch("data/members.json")
            .then(response => response.json())
            .then(data => {
                const qualifiedMembers = data.members.filter(member =>
                    member["member-level"] === "Silver" || member["member-level"] === "Gold"
                );
                const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 2);
                selected.forEach(member => {
                    const card = document.createElement("div");
                    card.classList.add("spotlight-card");
                    card.innerHTML = `
                    <h3>${member.name}</h3>
                    <img src="images/${member["icon-file"]}" alt="${member.name}">
                    <p>${member.adress}</p>
                    <p>${member.tel}</p>
                    <a href="${member.urls}" target="_blank">Visit Website</a>
                `;
                    spotlightSection.appendChild(card);
                });
            })
            .catch(error => console.error("Error loading spotlight data:", error));
    } else {
        spotlightSection.style.display = "none";
    }

    // Banner
    function showEventBanner() {
        const today = new Date().getDay();
        const banner = document.getElementById("eventBanner");
        const closeBtn = document.getElementById("closeBanner");

        if ([1, 2, 3].includes(today)) {
            banner.classList.remove("hidden");
        }

        closeBtn.addEventListener("click", () => {
            banner.classList.add("hidden");
        });
    }


    apiFetch();
    getForecast();
    showEventBanner();
});
