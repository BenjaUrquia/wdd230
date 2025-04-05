document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://benjaurquia.github.io/wdd230/";
    const linksURL = "https://benjaurquia.github.io/wdd230/data/links.json";

    async function getLinks() {
        const response = await fetch(linksURL);
        const data = await response.json();
        displayLinks(data);
    }

    function displayLinks(data) {
        const list = document.querySelector("#weeks-activities");

        data.weeks.forEach((week) => {
            const li = document.createElement("li");
            li.textContent = `${week.week}: `;

            week.links.forEach((link, index) => {
                const a = document.createElement("a");
                a.href = baseURL + link.url;
                a.textContent = link.title;
                li.appendChild(a);

                if (index < week.links.length - 1) {
                    li.append(" | ");
                }
            });

            list.appendChild(li);
        });
    }

    getLinks();
});