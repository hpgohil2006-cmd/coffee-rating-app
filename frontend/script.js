const coffeeGrid = document.getElementById("coffeeGrid");
const leaderboard = document.getElementById("leaderboard");
const statusMessage = document.getElementById("statusMessage");

async function loadCoffees() {
    try {
        const response = await fetch("/api/coffees");

        if (!response.ok) {
            throw new Error("Failed to load coffees");
        }

        const result = await response.json();

        renderCoffees(result.data);

    } catch (error) {
        console.error(error);

        coffeeGrid.innerHTML = `
            <div class="error">
                Unable to load coffee blends.
                Please try again.
            </div>
        `;
    }
}


function renderCoffees(coffees) {

    if (!coffees.length) {
        coffeeGrid.innerHTML = `
            <div class="loading">
                No coffee blends available.
            </div>
        `;

        return;
    }

    coffeeGrid.innerHTML = coffees.map(coffee => `
        <article class="coffee-card">

            <div class="coffee-icon">
                ☕
            </div>

            <span class="category">
                ${escapeHtml(coffee.category)}
            </span>

            <h3>
                ${escapeHtml(coffee.name)}
            </h3>

            <p class="description">
                ${escapeHtml(coffee.description)}
            </p>

            <div class="vote-row">

                <span class="vote-count">
                    ⭐ ${coffee.votes} votes
                </span>

                <button
                    class="vote-button"
                    data-id="${coffee.id}"
                >
                    Vote
                </button>

            </div>

        </article>
    `).join("");

    document
        .querySelectorAll(".vote-button")
        .forEach(button => {

            button.addEventListener("click", () => {
                voteForCoffee(button.dataset.id, button);
            });

        });
}


async function voteForCoffee(id, button) {

    button.disabled = true;

    statusMessage.textContent = "Recording your vote...";

    try {

        const response = await fetch(
            `/api/coffees/${id}/vote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        statusMessage.textContent =
            "✓ Your vote has been recorded!";

        await loadCoffees();
        await loadLeaderboard();

    } catch (error) {

        console.error(error);

        statusMessage.textContent =
            "Unable to record vote. Please try again.";

        button.disabled = false;
    }
}


async function loadLeaderboard() {

    try {

        const response =
            await fetch("/api/coffees/top");

        if (!response.ok) {
            throw new Error("Failed to load leaderboard");
        }

        const result = await response.json();

        renderLeaderboard(result.data);

    } catch (error) {

        console.error(error);

        leaderboard.innerHTML = `
            <div class="error">
                Unable to load leaderboard.
            </div>
        `;
    }
}


function renderLeaderboard(coffees) {

    if (!coffees.length) {

        leaderboard.innerHTML = `
            <div class="loading">
                No votes yet.
            </div>
        `;

        return;
    }

    leaderboard.innerHTML = coffees
        .map((coffee, index) => `
            <div class="leaderboard-item">

                <div class="rank">
                    ${index + 1}
                </div>

                <div class="leader-info">

                    <h3>
                        ${escapeHtml(coffee.name)}
                    </h3>

                    <p>
                        ${escapeHtml(coffee.category)}
                    </p>

                </div>

                <div class="leader-votes">
                    ⭐ ${coffee.votes}
                </div>

            </div>
        `)
        .join("");
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


loadCoffees();
loadLeaderboard();