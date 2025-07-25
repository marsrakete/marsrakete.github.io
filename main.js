const cols = 30, rows = 10;
let maxSymbols = 50;
let mode = 'game';
let currentWorld = 'galaxy';
let gameGrid = [], originalGrid = [], editorGrid = [];
let playerX = 0, playerY = 0, foundCount = 0, initialTargets = 0;
let timerStart = null, timerInterval = null;
let selectedSymbol = '';

let maxSymbolsSlider = document.getElementById('maxSymbolsSlider');
let maxSymbolsValue = document.getElementById('maxSymbolsValue');

// Berechne die maximale Symbolzahl: (cols * rows) - 25%
function updateMaxSymbolsSlider() {
    let max = Math.floor(cols * rows * 0.75);
    maxSymbolsSlider.max = max;
    if (parseInt(maxSymbolsSlider.value) > max) {
        maxSymbolsSlider.value = max;
    }
    maxSymbolsValue.textContent = maxSymbolsSlider.value;
}

function setupMaxSymbolsSlider() {
  const slider = document.getElementById('maxSymbolsSlider');
  const valueDisplay = document.getElementById('maxSymbolsValue');
  // Dynamische Maximalgrenze berechnen:
  function updateMax() {
    const max = Math.floor(cols * rows * 0.75);
    slider.max = max;
    if (parseInt(slider.value) > max) slider.value = max;
    valueDisplay.textContent = slider.value;
    maxSymbols = parseInt(slider.value);
  }
  updateMax();

  slider.addEventListener('input', function() {
    maxSymbols = parseInt(this.value);
    valueDisplay.textContent = this.value;
    generateRandomWorld(); // Welt neu berechnen!
  });

  // Falls cols/rows dynamisch geändert werden, muss updateMax erneut aufgerufen werden!
}

// BFS-Suche ob die Welt gelöst werden kann
function isPlayerToTargetReachable() {
  const w = worldData[currentWorld];
  // Starte direkt bei playerX/playerY
  const start = { x: playerX, y: playerY };
  let target = null;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (gameGrid[y][x] === w.target) {
        target = { x, y };
        break;
      }
    }
    if (target) break;
  }
  if (!target) return false;

  // BFS
  const queue = [start];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[start.y][start.x] = true;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  while (queue.length) {
    const { x, y } = queue.shift();
    if (x === target.x && y === target.y) return true;
    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      if (
        nx >= 0 && ny >= 0 && nx < cols && ny < rows &&
        !visited[ny][nx] &&
        (gameGrid[ny][nx] === ' ' || gameGrid[ny][nx] === w.target)
      ) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny });
      }
    }
  }
  return false;
}

function switchMode() {
  if (mode === 'game') {
    mode = 'editor';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('editorContainer').style.display = 'block';
    document.getElementById('toggleMode').innerText = 'Zum Spiel';
    editorGrid = originalGrid.map(r => r.slice());
    renderEditor();
  } else {
    mode = 'game';
    document.getElementById('editorContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('toggleMode').innerText = 'Zum Editor';
  }
}
document.getElementById('toggleMode').addEventListener('click', switchMode);

window.addEventListener('keydown', e => {
  if (mode !== 'game') return;
  if (['ArrowUp','w','W'].includes(e.key)) { movePlayer(0,-1); e.preventDefault(); }
  if (['ArrowDown','s','S'].includes(e.key)) { movePlayer(0,1); e.preventDefault(); }
  if (['ArrowLeft','a','A'].includes(e.key)) { movePlayer(-1,0); e.preventDefault(); }
  if (['ArrowRight','d','D'].includes(e.key)) { movePlayer(1,0); e.preventDefault(); }
});

// --- Spielfunktionen ---
function populateWorldGallery() {
  const container = document.getElementById('worldGallery');
  container.innerHTML = '';

  for (let name in worldData) {
    const world = worldData[name];
    const card = document.createElement('div');
    card.className = 'world-card';
    if (name === currentWorld) card.classList.add('selected');

    const title = document.createElement('div');
    title.className = 'world-title';
    title.textContent = world.title || name;

    const symbols = document.createElement('div');
    symbols.className = 'world-symbols';
    symbols.textContent = `${world.player} → ${world.target}`;

    const desc = document.createElement('div');
    desc.className = 'world-description';
    desc.textContent = world.description || '';

    card.appendChild(title);
    card.appendChild(symbols);
    card.appendChild(desc);

    card.onclick = () => {
      currentWorld = name;
      document.querySelectorAll('.world-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateGameInfo?.();
      generateRandomWorld?.();

      // Tooltip für Touch-Geräte ein-/ausblenden
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        card.classList.toggle('show-description');
      }
    };

    container.appendChild(card);
  }

  // Tap außerhalb -> Tooltip ausblenden
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.world-card.show-description').forEach(card => {
      if (!card.contains(e.target)) {
        card.classList.remove('show-description');
      }
    });
  });
}
function populateWorldButtonsGame() {
  const container = document.getElementById('worldButtonsGame');
  container.innerHTML = '';

  for (let name in worldData) {
    const label = document.createElement('label');
    label.style.display = 'inline-block';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'worldSelect';
    input.value = name;
    input.style.display = 'none';
    if (name === currentWorld) input.checked = true;

    const span = document.createElement('span');
    span.className = 'world-chip';

    const title = worldData[name]?.title || name;
    const playerSymbol = worldData[name]?.player || '';
    span.innerText = `${title} ${playerSymbol}`;
    span.title = worldData[name]?.description || '';

    input.addEventListener('change', () => {
      currentWorld = name;
      updateGameInfo();
      generateRandomWorld();
    });

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  }
}

function highlightButton(containerId, selected) {
  document.querySelectorAll('#'+containerId+' button').forEach(b => b.style.background = b.innerText===selected?'#555':'#333');
}

function updateGameInfo() {
  const w = worldData[currentWorld];
  document.getElementById('gameInfo').innerText =
    `Du steuerst ${w.player} und musst ${w.target} finden. ${w.description}`;
}

function initGameGridEmpty() {
  gameGrid = [];
  const output = document.getElementById('gameOutput'); output.innerHTML = '';
  for (let y=0; y<rows; y++) {
    const row = [];
    for (let x=0; x<cols; x++) {
      row.push(' ');
      const cell = document.createElement('div'); cell.className = 'cell'; output.appendChild(cell);
    }
    gameGrid.push(row);
  }
}
function updateZoom(value) {
  document.getElementById("gameOutput").style.fontSize = value + "em";
  document.getElementById("zoomPercentage").innerText = Math.round(value * 100) + "%";
}

function renderGame() {
  const cells = document.querySelectorAll('#gameOutput .cell');
  gameGrid.forEach((row,y) => row.forEach((sym,x) => cells[y*cols+x].textContent = sym));
}

function generateRandomWorld() {
  // Timer zurücksetzen
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  timerStart = null;
  foundCount = 0;

  const w = worldData[currentWorld];
  initGameGridEmpty();

  // Pool aus normalen und seltenen Symbolen
  const symbolPool = [...w.symbols, ...w.rare];

  // Zufällige Symbole platzieren
  for (let i = 0; i < maxSymbols; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * cols);
      y = Math.floor(Math.random() * rows);
    } while (gameGrid[y][x] !== ' ');
    gameGrid[y][x] = symbolPool[Math.floor(Math.random() * symbolPool.length)];
  }

  // Optionales Bottom-Element unten einfügen
  if (w.bottom.length > 0) {
    const x = Math.floor(Math.random() * cols);
    gameGrid[rows - 1][x] = w.bottom[Math.floor(Math.random() * w.bottom.length)];
  }

  // Sicherstellen, dass mindestens ein Target vorhanden ist
  let targetCount = gameGrid.flat().filter(c => c === w.target).length;
  if (targetCount === 0) {
    let tx, ty;
    do {
      tx = Math.floor(Math.random() * cols);
      ty = Math.floor(Math.random() * rows);
    } while (gameGrid[ty][tx] !== ' ');
    gameGrid[ty][tx] = w.target;
    targetCount = 1;
  }
  initialTargets = targetCount;

  // Spielerposition wählen (entweder vorhandenes Player-Symbol oder zufällige freie Zelle)
  const playerPositions = [];
  gameGrid.forEach((row, ry) =>
    row.forEach((c, cx) => {
      if (c === w.player) playerPositions.push({
        x: cx,
        y: ry
      });
    })
  );
  let start;
  if (playerPositions.length > 0) {
    start = playerPositions[Math.floor(Math.random() * playerPositions.length)];
  } else {
    let px, py;
    do {
      px = Math.floor(Math.random() * cols);
      py = Math.floor(Math.random() * rows);
    } while (gameGrid[py][px] !== ' ');
    start = {
      x: px,
      y: py
    };
  }
  playerX = start.x;
  playerY = start.y;
  gameGrid[playerY][playerX] = w.player;

  // Anzeige aktualisieren
  renderGame();
  updateGameInfo();
  document.getElementById('foundCount').innerText = 'Gefundene Ziele: 0';
  document.getElementById('timerDisplay').innerText = 'Zeit: 0 s';

  // Ursprungszustand speichern
  originalGrid = gameGrid.map(row => row.slice());

  if (!isPlayerToTargetReachable()) {
    // Optional: max. 10 Versuche, sonst lockere die Platzierung!
    for (let tries = 0; tries < 10; tries++) {
      generateRandomWorld();
      if (isPlayerToTargetReachable()) break;
    }
    // Optional: Zeige Hinweis, falls nach 10 Versuchen kein Pfad da ist
    if (!isPlayerToTargetReachable()) {
      alert("Kein Pfad zwischen Spieler und Ziel möglich! Weniger Symbole wählen.");
    }
  }
}

function movePlayer(dx,dy) {
  if (!timerStart) { timerStart = Date.now(); timerInterval = setInterval(() => {
    document.getElementById('timerDisplay').innerText = `Zeit: ${Math.floor((Date.now()-timerStart)/1000)} s`;
  }, 1000); }
  const w = worldData[currentWorld], target=w.target;
  const nx = playerX+dx, ny = playerY+dy;
  if (nx<0||ny<0||nx>=cols||ny>=rows) { playPowSound(); return; }
  const cell = gameGrid[ny][nx];
  if (cell===' '||cell===target) {
    if (cell===target) { playPewSound(); foundCount++; document.getElementById('foundCount').innerText=`Gefundene Ziele: ${foundCount}`; }
    gameGrid[playerY][playerX] = ' '; gameGrid[ny][nx] = w.player; playerX=nx; playerY=ny; renderGame();
    if (foundCount>=initialTargets) {
      clearInterval(timerInterval);
      const msg = `Spiel beendet!\nGefundene Ziele: ${foundCount}\nZeit: ${Math.floor((Date.now()-timerStart)/1000)} s`;
      setTimeout(() => {
        alert(msg);
        resetToOriginalGrid();
      }, 50);
    }
  } else { playPowSound(); }
}

function resetToOriginalGrid() {
  gameGrid = originalGrid.map(r=>r.slice());
  const w = worldData[currentWorld];
  initialTargets = gameGrid.flat().filter(c => c === w.target).length;
  foundCount = 0;
  timerStart = null;
  playerX = 0; playerY = 0;
  gameGrid.forEach((row, ry) => row.forEach((c, cx) => {
    if (c === w.player) { playerX = cx; playerY = ry; }
  }));
  document.getElementById('foundCount').innerText = 'Gefundene Ziele: 0';
  document.getElementById('timerDisplay').innerText = 'Zeit: 0 s';
  renderGame();
}

// Spiel-Buttons
document.getElementById('newRandomGame').addEventListener('click', generateRandomWorld);
document.getElementById('generateGameAltText').addEventListener('click', ()=>{
  const w = worldData[currentWorld];
  const txt = `Alternativtext: Dieses Bild zeigt eine ${w.description} Welt erstellt mit dem Weltengenerator von Millux. Das Feld umfasst ${rows} Zeilen und ${cols} Spalten.`;
  navigator.clipboard.writeText(txt).then(()=>alert('ALT Text kopiert!'));
});

document.getElementById('copyGameGraphic').addEventListener('click', () => {
  html2canvas(document.getElementById('gameOutput')).then(canvas => {
    canvas.toBlob(blob => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => alert('Grafik kopiert!'))
        .catch(err => alert('Fehler beim Kopieren: ' + err));
    });
  });
});

document.getElementById('copyGameText').addEventListener('click', ()=>{
  const text = gameGrid.map(row=>row.join('').replace(/\s+$/,'')).join('\r\n');
  navigator.clipboard.writeText(text).then(()=>alert('Text kopiert!'));
});

// Editorfunktionen
function renderEditor() {
  document.querySelectorAll('#editorOutput .cell').forEach((cell,idx) => {
    const r=Math.floor(idx/cols), c=idx%cols;
    cell.textContent = editorGrid[r][c];
  });
}
function generateRandomEditor() {
  generateRandomWorld();
  editorGrid = originalGrid.map(r=>r.slice());
  renderEditor();
}
document.getElementById('newEditorRandom').addEventListener('click', generateRandomEditor);
document.getElementById('generateEditorAltText').addEventListener('click', ()=>{
  const w=worldData[currentWorld]; const txt=`Alternativtext: Diese ${w.description} Welt im Editor (${rows}x${cols}).`;
  navigator.clipboard.writeText(txt).then(()=>alert('ALT Text kopiert!')); });
document.getElementById('applyToGame').addEventListener('click', ()=>{
  gameGrid = editorGrid.map(r=>r.slice()); initialTargets = gameGrid.flat().filter(c=>c===worldData[currentWorld].target).length; foundCount=0; timerStart=null; clearInterval(timerInterval);
  document.getElementById('foundCount').innerText='Gefundene Ziele: 0'; document.getElementById('timerDisplay').innerText='Zeit: 0 s'; renderGame(); switchMode();
});

document.getElementById('copyEditorGraphic').addEventListener('click', () => {
  html2canvas(document.getElementById('editorOutput')).then(canvas => {
    canvas.toBlob(blob => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => alert('Grafik kopiert!'))
        .catch(err => alert('Fehler beim Kopieren: ' + err));
    });
  });
});

document.getElementById('copyEditorText').addEventListener('click', ()=>{
  const text = editorGrid.map(row=>row.join('').replace(/\s+$/,'')).join('\r\n');
  navigator.clipboard.writeText(text).then(()=>alert('Text kopiert!'));
});

document.getElementById('postToBsky').addEventListener('click', () => {
  // 1. Welt als Text
  const text = gameGrid.map(row => row.join('').replace(/\s+$/, '')).join(' ');

  // 2. Längenprüfung (max. ~300 Zeichen bei BlueSky)
  if (text.length > 350) {
    alert("Die Anzahl Zeichen der Welt ist zu lang für einen BlueSky-Post. Bitte lösche im Editor bitte ein paar Zeichen.");
    return;
  }

  // 3. Encoding
  const encodedText = encodeURIComponent(text);

  // 4. Plattform prüfen
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const baseURL = isMobile
    ? 'bluesky://intent/compose'
    : 'https://bsky.app/intent/compose';

  const fullURL = `${baseURL}?text=${encodedText}`;

  // 5. Öffnen
  const newTab = window.open(fullURL, '_blank');
  if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
    alert("Der Popup wurde blockiert. Bitte erlaube Popups für diese Seite.");
  }
});

function populateWorldButtonsEditor() {
  const container = document.getElementById('worldButtonsEditor');
  container.innerHTML = '';

  for (let name in worldData) {
    const label = document.createElement('label');
    label.style.display = 'inline-block';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'worldSelect';
    input.value = name;
    input.style.display = 'none';
    if (name === currentWorld) input.checked = true;

    const span = document.createElement('span');
    span.className = 'world-chip';
    span.innerText = worldData[name]?.title || name;
    span.title = worldData[name]?.description || '';

    input.addEventListener('change', () => {
      currentWorld = name;
      updateGameInfo();
      generateRandomWorld();
      // Optional: visuelles Highlight aktualisieren (siehe CSS)
    });

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  }
}


function updatePlayerTargetInfo() {
  const w=worldData[currentWorld]; document.getElementById('playerTargetInfo').innerHTML=
    `Spielersymbol: <span style="color:limegreen;">${w.player}</span> | Zielsymbol: <span style="color:red;">${w.target}</span>`;
}

function populateSymbolPalette() {
  const palette = document.getElementById('symbolPalette');
  palette.innerHTML = '';

  const w = worldData[currentWorld];
  // Alle Symbole zusammenfassen und Duplikatentfernung 
  const allSymbols = []
  .concat(w.symbols || [])
  .concat(w.rare || [])
  .concat(w.bottom || []);


  allSymbols.forEach(sym => {
    const span = document.createElement('span');
    span.className = 'symbol-chip';
    span.textContent = sym;

    if (sym === w.player) span.classList.add('symbol-player');
    if (sym === w.target) span.classList.add('symbol-target');

    span.onclick = () => {
      document.querySelectorAll('#symbolPalette .symbol-chip').forEach(el => el.classList.remove('selected'));
      span.classList.add('selected');
      selectedSymbol = sym;
    };

    palette.appendChild(span);
  });

  // Leeres Symbol am Ende hinzufügen
  const emptySpan = document.createElement('span');
  emptySpan.className = 'symbol-chip symbol-empty';
  emptySpan.textContent = '␣'; // Alternativ: '□' oder '␢'

  emptySpan.onclick = () => {
    document.querySelectorAll('#symbolPalette .symbol-chip').forEach(el => el.classList.remove('selected'));
    emptySpan.classList.add('selected');
    selectedSymbol = " ";
  };

  palette.appendChild(emptySpan);
}

function initEditorGrid() {
  editorGrid=[]; const out=document.getElementById('editorOutput'); out.innerHTML='';
  for (let y=0; y<rows; y++) { const rowArr=[]; const line=document.createElement('div'); line.className='row';
    for (let x=0; x<cols; x++) { rowArr.push(' '); const cell=document.createElement('span'); cell.className='cell';
      cell.onclick=()=>{ if(selectedSymbol){ cell.textContent=selectedSymbol; editorGrid[y][x]=selectedSymbol;} };
      line.appendChild(cell);
    }
    editorGrid.push(rowArr); out.appendChild(line);
  }
}
document.getElementById('clearGrid').addEventListener('click', ()=>{ editorGrid.forEach(r=>r.fill(' ')); document.querySelectorAll('#editorOutput .cell').forEach(c=>c.textContent=' '); });
window.addEventListener('load', async ()=>{
  await loadWorldData();
  //populateWorldButtonsGame();
  populateWorldGallery();
  updateGameInfo();
  generateRandomWorld();
  populateWorldButtonsEditor();
  updatePlayerTargetInfo();
  populateSymbolPalette();
  initEditorGrid();
  if (navigator.clipboard && window.ClipboardItem) {
    document.getElementById('copyEditorGraphic').style.display = 'inline-block';
    document.getElementById('copyGameGraphic').style.display = 'inline-block';
  }
  updateZoom(document.getElementById("zoomSlider").value);
  setupMaxSymbolsSlider();
  updateMaxSymbolsSlider();
});

