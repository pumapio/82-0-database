let players = [];

const searchInput = document.getElementById("searchInput");
const teamFilter = document.getElementById("teamFilter");
const decadeFilter = document.getElementById("decadeFilter");
const positionFilter = document.getElementById("positionFilter");

const cardView = document.getElementById("cardView");
const tableView = document.getElementById("tableView");
const tableBody = document.getElementById("tableBody");

const cardBtn = document.getElementById("cardViewBtn");
const tableBtn = document.getElementById("tableViewBtn");

// ---------------------------
// LOAD DATA (TEMP MOCK DATA)
// ---------------------------
function loadData() {
    // We will replace this with Google Sheets later
    players = [
        {
            name: "Kevin Durant",
            team: "PHX",
            decade: "2020s",
            position: "PF / SF / SG",
            ppg: 27.4,
            rpg: 6.8,
            apg: 4.5,
            spg: 1.1,
            bpg: 1.2,
            total: 40.8,
            grade: "A+"
        },
        {
            name: "Michael Jordan",
            team: "CHI",
            decade: "1990s",
            position: "SG / SF",
            ppg: 30.1,
            rpg: 6.2,
            apg: 5.3,
            spg: 2.3,
            bpg: 0.8,
            total: 48.7,
            grade: "A+"
        }
    ];

    populateFilters();
    render();
}

// ---------------------------
// FILTERS
// ---------------------------
function populateFilters() {
    let teams = [...new Set(players.map(p => p.team))];
    let decades = [...new Set(players.map(p => p.decade))];
    let positions = [...new Set(players.map(p => p.position))];

    teams.forEach(t => {
        let opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        teamFilter.appendChild(opt);
    });

    decades.forEach(d => {
        let opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        decadeFilter.appendChild(opt);
    });

    positions.forEach(p => {
        let opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        positionFilter.appendChild(opt);
    });
}

// ---------------------------
// FILTER LOGIC
// ---------------------------
function getFilteredPlayers() {
    return players.filter(p => {
        const query = searchInput.value.toLowerCase();

        return (
            (query === "" ||
                p.name.toLowerCase().includes(query) ||
                p.team.toLowerCase().includes(query) ||
                p.decade.toLowerCase().includes(query)
            ) &&
            (teamFilter.value === "" || p.team === teamFilter.value) &&
            (decadeFilter.value === "" || p.decade === decadeFilter.value)
        );
    });
}
// ---------------------------
// RENDER CARD VIEW
// ---------------------------
function renderCards(data) {
    cardView.innerHTML = "";

    data.forEach(p => {
        let div = document.createElement("div");
        div.className = "player-card";

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.team} • ${p.decade} • ${p.position}</p>
            <p>PPG: ${p.ppg}</p>
            <p>RPG: ${p.rpg}</p>
            <p>APG: ${p.apg}</p>
            <p>Total: ${p.total}</p>
            <p>Grade: ${p.grade}</p>
        `;

        cardView.appendChild(div);
    });
}

// ---------------------------
// RENDER TABLE VIEW
// ---------------------------
function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(p => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.team}</td>
            <td>${p.decade}</td>
            <td>${p.ppg}</td>
            <td>${p.rpg}</td>
            <td>${p.apg}</td>
            <td>${p.spg}</td>
            <td>${p.bpg}</td>
            <td>${p.total}</td>
            <td>${p.grade}</td>
        `;

        tableBody.appendChild(row);
    });
}

// ---------------------------
// MAIN RENDER
// ---------------------------
function render() {
    let data = getFilteredPlayers();
    renderCards(data);
    renderTable(data);
}

// ---------------------------
// EVENTS
// ---------------------------
searchInput.addEventListener("input", render);
teamFilter.addEventListener("change", render);
decadeFilter.addEventListener("change", render);
positionFilter.addEventListener("change", render);

// VIEW TOGGLE
cardBtn.addEventListener("click", () => {
    cardView.style.display = "grid";
    tableView.style.display = "none";
});

tableBtn.addEventListener("click", () => {
    cardView.style.display = "none";
    tableView.style.display = "block";
});

// INIT
loadData();