
// Usamos localStorage para simular una "sincronización"
let storedStatus = JSON.parse(localStorage.getItem('everyoneStatus') || '{}');

function updateStatus() {
  const icon = document.getElementById('icon').value;
  const message = document.getElementById('message').value;
  storedStatus[icon] = message;
  localStorage.setItem('everyoneStatus', JSON.stringify(storedStatus));
  renderStatus();
}

function renderStatus() {
  const container = document.getElementById('everyone-status');
  container.innerHTML = '';
  Object.entries(storedStatus).forEach(([icon, msg]) => {
    const box = document.createElement('div');
    box.className = 'status-item';
    box.innerHTML = icon + '<small>' + msg + '</small>';
    container.appendChild(box);
  });
}

window.onload = renderStatus;
