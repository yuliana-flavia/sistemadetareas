const aliases = [
  { alias: "Compu", emoji: "🧠" },
  { alias: "Mate", emoji: "🧉" },
  { alias: "Leon", emoji: "🦁" },
  { alias: "Muzza", emoji: "🍕" },
  { alias: "Tortu", emoji: "🐢" },
  { alias: "Pato", emoji: "🦆" }
];

const bosses = [
  { alias: "🎨", name: "Manu" },
  { alias: "🌿", name: "Fide" },
  { alias: "🎣", name: "Santi" }
];

const statusColors = {
  ocupado: "red",
  chill: "green",
  alpedo: "orange"
};

const cardsContainer = document.getElementById("cards");
const bossStatusContainer = document.getElementById("bossStatus");

function loadStates() {
  const data = JSON.parse(localStorage.getItem("states") || "{}");
  return data;
}

function saveStates(states) {
  localStorage.setItem("states", JSON.stringify(states));
}

function createAliasCard(alias, emoji) {
  const states = loadStates();
  const current = states[alias] || { status: "", message: "", mood: "" };

  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("div");
  name.className = "alias";
  name.textContent = `${emoji} ${alias}`;

  const buttons = document.createElement("div");
  buttons.className = "status-options";

  Object.entries(statusColors).forEach(([key, color]) => {
    const btn = document.createElement("button");
    btn.style.background = color;
    btn.title = key;
    if (current.status === key) btn.style.border = "2px solid black";
    btn.onclick = () => {
      states[alias] = { ...states[alias], status: key };
      saveStates(states);
      location.reload();
    };
    buttons.appendChild(btn);
  });

  const input = document.createElement("input");
  input.className = "status-message";
  input.type = "text";
  input.placeholder = "Tu estado...";
  input.value = current.message || "";
  input.onchange = () => {
    states[alias] = { ...states[alias], message: input.value };
    saveStates(states);
  };

  card.appendChild(name);
  card.appendChild(buttons);
  card.appendChild(input);

  cardsContainer.appendChild(card);
}

function createBossPanel() {
  bosses.forEach(({ alias, name }) => {
    const card = document.createElement("div");
    card.className = "card";

    const boss = document.createElement("div");
    boss.className = "alias";
    boss.textContent = alias;

    const moodSelect = document.createElement("select");
    ["🤬", "😐", "😊"].forEach((mood) => {
      const opt = document.createElement("option");
      opt.textContent = mood;
      moodSelect.appendChild(opt);
    });

    const states = loadStates();
    const current = states[name] || {};
    moodSelect.value = current.mood || "😊";
    moodSelect.onchange = () => {
      states[name] = { mood: moodSelect.value };
      saveStates(states);
    };

    card.appendChild(boss);
    card.appendChild(moodSelect);
    bossStatusContainer.appendChild(card);
  });
}

aliases.forEach(({ alias, emoji }) => createAliasCard(alias, emoji));
createBossPanel();