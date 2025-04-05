document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    const menuButton = document.getElementById("menuButton");
    const navList = document.querySelector(".navMenu");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuButton.textContent = navList.classList.contains("open") ? "✖" : "≡";
    });


    const url = "https://benjaurquia.github.io/wdd230/chamber/data/members.json";
    const main = document.querySelector("main");

    const gridBtn = document.createElement("button");
    gridBtn.textContent = "Grid View";
    gridBtn.id = "gridBtn";
    const listBtn = document.createElement("button");
    listBtn.textContent = "List View";
    listBtn.id = "listBtn";

    main.before(gridBtn, listBtn);

    gridBtn.addEventListener("click", () => {
        main.classList.add("grid");
        main.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
        main.classList.add("list");
        main.classList.remove("grid");
    });

    async function getMembers() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }

    function displayMembers(members) {
        members.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("member-card");

            const name = document.createElement("a");
            name.href = member.urls;
            name.target = "_blank";
            name.textContent = member.name;

            const address = document.createElement("p");
            address.textContent = member.adress;

            const phone = document.createElement("p");
            phone.textContent = member.tel;

            const icon = document.createElement("img");
            icon.className = "logo";
            icon.src = `images/${member["icon-file"].replace(/\.\w+$/, '.webp')}`;
            icon.alt = `${member.name} logo`;
            icon.loading = "lazy";

            const level = document.createElement("p");
            level.textContent = `Membership Level: ${member["member-level"]}`;

            card.append(name, icon, address, phone, level);
            main.appendChild(card);
        });
    }

    getMembers();


});