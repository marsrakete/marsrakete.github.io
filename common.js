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

// String zu Uint8Array umwandeln
function str2ab(str) {
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) buf[i] = str.charCodeAt(i);
  return buf;
}

// SHA-256-Hash als Hex-String berechnen (async!)
async function calcHash(str) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', str2ab(str));
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// Funktion zur Parameterübergabe mit URLSearchParams
async function transferToPage(worldKey, gridData) {
  const params = new URLSearchParams();
  params.set("world", worldKey);
  const gridText = gridData.map(row => row.join("")).join("\n");
  params.set("grid", gridText);

  // Hash berechnen (Welt + Grid)
  const hash = await calcHash(worldKey + ':' + gridText);
  params.set("hash", hash);

  return window.location.pathname + "?" + params.toString();
}


// Sprachlogik
// Lade Sprachdatei (lang.json)
async function loadLangData() {
    const res = await fetch('lang.json');
    langData = await res.json();
}

// Erkenne die Sprache des Browsers
function detectLang() {
    const browserLang = navigator.language?.slice(0,2).toLowerCase();
    if (supportedLangs.includes(browserLang)) return browserLang;
    return 'de';
}

// Text holen, mit Platzhalter-Ersatz
function t(key, vars={}) {
    let str = langData[lang]?.[key] || langData['de']?.[key] || key;
    Object.keys(vars).forEach(k => {
        str = str.replaceAll(`{${k}}`, vars[k]);
    });
    return str;
}

// Sprache wechseln
function switchLang() {
    lang = (lang === 'de') ? 'en' : 'de';
    updateUIText();
    populateWorldGallery();
    populateWorldButtonsEditor();
    localStorage.setItem('appLang', lang);
    document.getElementById('langSwitchBtn').innerText = (lang === 'de') ? '🌐 EN' : '🌐 DE';
}

function updateUIText() {
    // Dokument-Titel
    document.title = t('game_title');

    // --- SPIELMODUS ---
    // Headline
    if (document.getElementById('gameInfo')) document.getElementById('gameInfo').innerText = t('game_title');
    // Buttons
    if (document.getElementById('toggleModeGame')) document.getElementById('toggleModeGame').innerText = t('btnSwitchMode');
    if (document.getElementById('newRandomGame')) document.getElementById('newRandomGame').innerText = t('btnNewGame');
    if (document.getElementById('generateGameAltText')) document.getElementById('generateGameAltText').innerText = t('btnAltText');
    if (document.getElementById('copyGameGraphic')) document.getElementById('copyGameGraphic').innerText = t('btnCopyGraphic');
    if (document.getElementById('copyGameText')) document.getElementById('copyGameText').innerText = t('btnCopyText');
    if (document.getElementById('generateGamePermalink')) document.getElementById('generateGamePermalink').innerText = t('btnPermalink');
    if (document.getElementById('postToBsky')) document.getElementById('postToBsky').innerText = t('btnPostBsky');

    // Zeit & Ziele in Statusleiste (werden dynamisch ergänzt, aber für Initialanzeige sinnvoll)
    if (document.getElementById('timerDisplay')) document.getElementById('timerDisplay').innerText = t('time', {seconds: 0});
    if (document.getElementById('foundCount')) document.getElementById('foundCount').innerText = t('found_targets', {count: 0});

    // Hinweistext unter Steuerfeld
    if (document.getElementById('swipeHint')) {
        document.getElementById('swipeHint').innerText =
            ('ontouchstart' in window || navigator.maxTouchPoints > 0)
            ? t('hintSwipe')
            : t('hintMouse');
    }

    // --- EDITORMODUS ---
    if (document.getElementById('toggleModeEditor')) document.getElementById('toggleModeEditor').innerText = t('btnSwitchModeGame');
    if (document.getElementById('clearGrid')) document.getElementById('clearGrid').innerText = t('btnClearGrid');
    if (document.getElementById('newEditorRandom')) document.getElementById('newEditorRandom').innerText = t('btnNewEditorRandom');
    if (document.getElementById('generateEditorAltText')) document.getElementById('generateEditorAltText').innerText = t('btnAltText');
    if (document.getElementById('copyEditorGraphic')) document.getElementById('copyEditorGraphic').innerText = t('btnCopyEditorGraphic');
    if (document.getElementById('copyEditorText')) document.getElementById('copyEditorText').innerText = t('btnCopyEditorText');
    // Falls aktiviert:
    if (document.getElementById('applyToGame')) document.getElementById('applyToGame').innerText = t('btnApplyToGame');

    // Überschriften/Labels im Editormodus
    if (document.querySelector('#editorContainer h1')) document.querySelector('#editorContainer h1').innerText = t('editorMode');
    if (document.querySelector('#editorContainer h2')) document.querySelector('#editorContainer h2').innerText = t('outputField');

    // --- SLIDER & LABELS ---
    // Zoom
    const zoomLabel = document.querySelector('label[for="zoomSlider"]');
    if (zoomLabel) zoomLabel.innerText = t('zoom');
    // Symbolanzahl
    const symbolsLabel = document.querySelector('label[for="maxSymbolsSlider"]');
    if (symbolsLabel) symbolsLabel.innerText = `| ${t('symbols')}`;

    // --- WELTENZÄHLER ---
    const countDiv = document.getElementById('worldCount');
    if (countDiv) {
        const n = Object.keys(worldData).length;
        countDiv.innerHTML = `<span class="icon">✨</span> <span>${t('worldsAvailable', {count: n})}</span>`;
    }

    // --- Sprache-Umschaltbutton (Label aktualisieren) ---
    if (document.getElementById('langSwitchBtn')) {
        document.getElementById('langSwitchBtn').innerText = (lang === 'de') ? '🌐 EN' : '🌐 DE';
    }
}
// Statusmeldungen
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 3000);
  }, duration);
}

function showCopyOverlay(targetElement, message = '✓ Kopiert') {
  const overlay = document.createElement('div');
  overlay.textContent = message;

  Object.assign(overlay.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: getComputedStyle(targetElement).borderRadius || '0',
    zIndex: '100',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 1s ease',
  });

  // Eltern-Element muss relativ positioniert sein
  const container = targetElement.closest('.overlay-wrapper') || targetElement.parentElement;
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  // Einfügen und anzeigen
  container.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  // Automatisch ausblenden und entfernen
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 400);
  }, 1200);
}

function showDialogToast(message, onConfirm) {
  const overlay = document.getElementById('modal-overlay');
  const dialog = document.getElementById('dialog-toast');
  overlay.hidden = false;
  //dialog.hidden = false;
  dialog.style.display = 'flex';
  dialog.innerHTML = `<div>${message.replace(/\n/g, '<br>')}</div><button class="toast-ok-btn">OK</button>`;
  dialog.querySelector('.toast-ok-btn').addEventListener('click', () => {
    overlay.hidden = true;
    dialog.hidden = true;
    if (typeof onConfirm === 'function') onConfirm();
  });
  dialog.querySelector('.toast-ok-btn').focus();
}
