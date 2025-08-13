// worldData.js
// Helper to load world data from the external JSON file
let worldData;

<!-- Fallback: JSON-Daten im HTML einbetten. Hier nur 2 Welten -->
  // Direkter Fallback als JavaScript-Objekt:
  const fallbackWorldData = {
  "galaxy": {
    "symbols": [
      "🧿",      "🕳️",      "✮",      "🎱",      "🌍",      "☾",      "🌌",      "🌑",      "🪐",      "🌕",      "☄️",      "💫",      "🚀",      "🛸",      "🌠",      "🌙",      "⭐️",      "🌜",      "🌚"    ],
    "rare": [
      "👾",      "👽",      "🎮",      "👩‍🚀",      "🔫",      "🛰️"
    ],
    "bottom": [
      "🔭",      "📡"
    ],
    "player": "🚀",
    "target": "🌍",
    "description": "Eine galaktische Welt voller Sterne und fremder Planeten.",
    "title": "Galaxie"
  }
};

async function loadWorldData() {
  if (worldData) return worldData;

  try {
    const response = await fetch('./worldData.json');
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("Kein JSON oder fetch fehlgeschlagen");
    }
    worldData = await response.json();
    console.log("Daten per fetch geladen.");
  } catch (err) {
    console.warn("Fetch fehlgeschlagen, nutze Fallback-Daten:", err);
    worldData = fallbackWorldData;
  }

  return worldData;
}


function validateWorldData(data) {
  const incompatibleEmojis = {
    "🧌": "Unicode 14.0",
    "🫛": "Unicode 14.0",
    "🫧": "Unicode 13.0",
    "🪸": "Unicode 14.0",
    "🪷": "Unicode 14.0",
    "🫠": "Unicode 14.0",
    "🫨": "Unicode 15.0",
    "🪻": "Unicode 15.0",
    "🪼": "Unicode 15.0",
    "🪮": "Unicode 13.0",
    "🪵": "Unicode 13.0",
    "🛗": "Unicode 13.0",
    "🪦": "Unicode 13.0",
    "🪤": "Unicode 13.0",
    "🪜": "Unicode 13.0",
    "🪛": "Unicode 13.0",
    "🪠": "Unicode 13.0",
    "🩴": "Unicode 13.0",
    "🩲": "Unicode 12.0",
    "🪺": "Unicode 15.0"
  };

  const issues = [];

  for (const [key, world] of Object.entries(data)) {
    const all = new Set();
    const duplicates = new Set();
    const sections = ["symbols", "rare", "bottom"];

    for (const sec of sections) {
      if (!Array.isArray(world[sec])) continue;
      for (const sym of world[sec]) {
        if (all.has(sym)) duplicates.add(sym);
        all.add(sym);

        if (incompatibleEmojis[sym]) {
          issues.push(`🚫 ${key}: Symbol '${sym}' in ${sec} ist evtl. inkompatibel (${incompatibleEmojis[sym]})`);
        }
      }
    }

    // Spieler- und Ziel-Symbol prüfen
    const coreSymbols = ["player", "target", "monster"];
    for (const symField of coreSymbols) {
      const sym = world[symField];
      if (sym) {
        if (all.has(sym)) {
          issues.push(`⚠️  ${key}: ${symField}-Symbol '${sym}' ist mehrfach vergeben`);
        }
        if (incompatibleEmojis[sym]) {
          issues.push(`🚫 ${key}: Symbol '${sym}' in ${symField} ist evtl. inkompatibel (${incompatibleEmojis[sym]})`);
        }
      } else {
        issues.push(`❌ ${key}: Symbol '${symField}' fehlt`);
      }
    }

    if (world.player === world.target) {
      issues.push(`❌ ${key}: Player und Target haben dasselbe Symbol '${world.player}'`);
    }

    if (!world.description || !world.title) {
      issues.push(`ℹ️  ${key}: Beschreibung oder Titel fehlt`);
    }

    if (duplicates.size > 0) {
      issues.push(`🔁 ${key}: doppelte Symbole gefunden: ${[...duplicates].join(', ')}`);
    }
  }

  if (issues.length > 0) {
    console.warn("⚠️ Symbolprüfung abgeschlossen. Probleme gefunden:\n" + issues.join('\n'));
  } else {
    console.log("✅ Symbolprüfung: keine Konflikte gefunden.");
  }
}

