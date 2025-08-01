// common.js

// Zentralen AudioContext einmalig erzeugen
const globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Gemeinsame Sound-Funktionen
function playPewSound() {
  if (!globalAudioCtx) return;
  const oscillator = globalAudioCtx.createOscillator();
  const gain = globalAudioCtx.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(440, globalAudioCtx.currentTime);
  oscillator.connect(gain);
  gain.connect(globalAudioCtx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, globalAudioCtx.currentTime + 0.2);
  oscillator.stop(globalAudioCtx.currentTime + 0.2);
}

function playPowSound() {
  if (!globalAudioCtx) return;
  const oscillator = globalAudioCtx.createOscillator();
  const gain = globalAudioCtx.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(200, globalAudioCtx.currentTime);
  oscillator.connect(gain);
  gain.connect(globalAudioCtx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, globalAudioCtx.currentTime + 0.2);
  oscillator.stop(globalAudioCtx.currentTime + 0.2);
}

// Funktion zum Erzeugen eines leeren Rasters
function initGrid(gridRows, gridCols) {
  const gridData = [];
  const output = document.getElementById("output");
  output.innerHTML = "";
  for (let r = 0; r < gridRows; r++) {
    let row = [];
    for (let c = 0; c < gridCols; c++) {
      row.push(" ");
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = " ";
      output.appendChild(cell);
    }
    gridData.push(row);
  }
  return gridData;
}

// Funktion zum Rendern des Rasters basierend auf gridData
function renderGameGrid(gridData, gridCols, gridRows) {
  const cells = document.querySelectorAll("#output .cell");
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const index = r * gridCols + c;
      if (cells[index]) {
        cells[index].textContent = gridData[r][c];
      }
    }
  }
}

// Funktion zur Parameterübergabe mit URLSearchParams
function transferToPage(worldKey, gridData) {
  const params = new URLSearchParams();
  params.set("world", worldKey);
  const gridText = gridData.map(row => row.join("")).join("\n");
  params.set("grid", gridText);
  return window.location.pathname + "?" + params.toString();
}
