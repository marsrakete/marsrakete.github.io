// common.js

// Gemeinsame Sound-Funktionen
function playPewSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(440, ctx.currentTime);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
  oscillator.stop(ctx.currentTime + 0.2);
}

function playPowSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(200, ctx.currentTime);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
  oscillator.stop(ctx.currentTime + 0.2);
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
function transferToPage(targetUrl, worldKey, gridData) {
  const params = new URLSearchParams();
  params.set("world", worldKey);
  const gridText = gridData.map(row => row.join("")).join("\n");
  params.set("grid", gridText);
  return targetUrl + "?" + params.toString();
}
