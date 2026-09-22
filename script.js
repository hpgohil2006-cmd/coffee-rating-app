const coffeeGrid = document.getElementById("coffeeGrid");
const leaderboard = document.getElementById("leaderboard");
const statusMessage = document.getElementById("statusMessage");

const defaultCoffees = [
    {
        id: 1,
        name: "Arabica Classic",
        category: "Arabica",
        description: "Smooth and balanced coffee.",
        votes: 0
    },
    {
        id: 2,
        name: "Robusta Dark Roast",
        category: "Robusta",
        description: "Bold, rich, and intense.",
        votes: 0
    },
    {
        id: 3,
        name: "Mocha Blend",
        category: "Blend",
        description: "A rich coffee with chocolate notes.",
        votes: 0
    },
    {
        id: 4,
        name: "Ethiopian Light Roast",
        category: "Light Roast",
        description: "Floral, fruity, and refreshing.",
        votes: 0
    }
];

function getCoffees() {
    return JSON.parse(
        localStorage.getItem("coffees") ||
        JSON.stringify(defaultCoffees)
    );
}

function saveCoffees(coffees) {
    localStorage.setItem("coffees", JSON.stringify(coffees));
}

function renderCoffees(coffees) {
    coffeeGrid.innerHTML = coffees.map(coffee => `
        <article class="coffee-card">
            <div class="coffee-icon">☕</div>
            <span class="category">${escapeHtml(coffee.category)}</span>
            <h3>${escapeHtml(coffee.name)}</h3>
            <p class="description">${escapeHtml(coffee.description)}</p>
            <div class="vote-row">
                <span class="vote-count">⭐ ${coffee.votes} votes</span>
                <button class="vote-button" data-id="${coffee.id}">Vote</button>
            </div>
        </article>
    `).join("");

    document.querySelectorAll(".vote-button").forEach(button => {
        button.addEventListener("click", () => {
            const coffees = getCoffees();
            const coffee = coffees.find(item =>
                String(item.id) === String(button.dataset.id)
            );

            if (!coffee) return;

            coffee.votes++;
            saveCoffees(coffees);

            statusMessage.textContent = "✓ Your vote has been recorded!";
            renderCoffees(coffees);
            renderLeaderboard(coffees);
        });
    });
}

function renderLeaderboard(coffees) {
    const sorted = [...coffees]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 5);

    leaderboard.innerHTML = sorted.map((coffee, index) => `
        <div class="leaderboard-item">
            <div class="rank">${index + 1}</div>
            <div class="leader-info">
                <h3>${escapeHtml(coffee.name)}</h3>
                <p>${escapeHtml(coffee.category)}</p>
            </div>
            <div class="leader-votes">⭐ ${coffee.votes}</div>
        </div>
    `).join("");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

const coffees = getCoffees();
renderCoffees(coffees);
renderLeaderboard(coffees);