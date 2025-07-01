const cols = 30, rows = 10, maxSymbols = 50;
let mode = 'game';
let currentWorld = 'galaxy';
let gameGrid = [], originalGrid = [], editorGrid = [];
let playerX = 0, playerY = 0, foundCount = 0, initialTargets = 0;
let timerStart = null, timerInterval = null;
let selectedSymbol = '';

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
function populateWorldButtonsGame() {
  const container = document.getElementById('worldButtonsGame'); container.innerHTML = '';
  for (let name in worldData) {
    const btn = document.createElement('button');
    btn.innerText = (worldData[name] && worldData[name].title) ? worldData[name].title : name;
    btn.onclick = () => { currentWorld = name; highlightButton('worldButtonsGame', name.title); updateGameInfo(); generateRandomWorld(); };
    container.appendChild(btn);
  }
  highlightButton('worldButtonsGame', currentWorld);
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
  if (c === w.player) playerPositions.push({ x: cx, y: ry });
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
start = { x: px, y: py };
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
document.getElementById('copyGameGraphic').addEventListener('click', ()=>{
  html2canvas(document.getElementById('gameOutput')).then(canvas=>{
    canvas.toBlob(blob=>navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(()=>alert('Grafik kopiert!')));
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
document.getElementById('copyEditorGraphic').addEventListener('click', ()=>{
  html2canvas(document.getElementById('editorOutput')).then(canvas=>{
    canvas.toBlob(blob=>navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(()=>alert('Grafik kopiert!')));
  });
});
document.getElementById('copyEditorText').addEventListener('click', ()=>{
  const text = editorGrid.map(row=>row.join('').replace(/\s+$/,'')).join('\r\n');
  navigator.clipboard.writeText(text).then(()=>alert('Text kopiert!'));
});

function populateWorldButtonsEditor() {
  const container=document.getElementById('worldButtonsEditor'); container.innerHTML='';
  for (let name in worldData) {
    const btn=document.createElement('button'); 
    btn.innerText = (worldData[name] && worldData[name].title) ? worldData[name].title : name;
    btn.onclick=()=>{ currentWorld=name; highlightButton('worldButtonsEditor',name); updatePlayerTargetInfo(); populateSymbolPalette(); };
    container.appendChild(btn);
  }
  highlightButton('worldButtonsEditor', currentWorld);
}
function updatePlayerTargetInfo() {
  const w=worldData[currentWorld]; document.getElementById('playerTargetInfo').innerHTML=
    `Spielersymbol: <span style="color:limegreen;">${w.player}</span> | Zielsymbol: <span style="color:red;">${w.target}</span>`;
}
function populateSymbolPalette() {
  const p=document.getElementById('symbolPalette'); p.innerHTML=''; const w=worldData[currentWorld];
  [...w.symbols,...w.rare,...w.bottom].forEach(sym=>{ const span=document.createElement('span'); span.className='symbol'; span.textContent=sym;
    if(sym===w.player) span.classList.add('playerSymbol'); if(sym===w.target) span.classList.add('targetSymbol');
    span.onclick=()=>{ document.querySelectorAll('#symbolPalette .symbol').forEach(el=>el.classList.remove('selected')); span.classList.add('selected'); selectedSymbol=sym; };
    p.appendChild(span);
  });
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
  populateWorldButtonsGame();
  updateGameInfo();
  generateRandomWorld();
  populateWorldButtonsEditor();
  updatePlayerTargetInfo();
  populateSymbolPalette();
  initEditorGrid();
});

