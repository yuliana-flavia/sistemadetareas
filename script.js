function saveState() {
  const alias = document.getElementById("alias").value;
  const status = document.getElementById("status").value;
  const text = document.getElementById("freeText").value;

  const state = { alias, status, text };
  localStorage.setItem(alias, JSON.stringify(state));
  renderStates();
}

function renderStates() {
  const statusList = document.getElementById("statusList");
  statusList.innerHTML = "";

  Object.keys(localStorage).forEach((key) => {
    const item = JSON.parse(localStorage.getItem(key));
    const statusIcon = getStatusIcon(item.status);
    const li = document.createElement("li");
    li.textContent = `${statusIcon} ${key} — ${item.text}`;
    statusList.appendChild(li);
  });
}

function getStatusIcon(status) {
  switch(status) {
    case "working": return "🟢";
    case "semi-idle": return "🟡";
    case "idle": return "🔴";
    case "out": return "⚪";
    default: return "❔";
  }
}

document.addEventListener("DOMContentLoaded", renderStates);