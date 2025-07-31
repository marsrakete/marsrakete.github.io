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
  const issues = [];

  for (const [key, world] of Object.entries(data)) {
    const all = new Set();
    const duplicates = new Set();
    //const sections = ['symbols', 'rare', 'bottom'];
    const sections = ['symbols'];

    // Sammle alle Symbole
    for (const sec of sections) {
      if (!Array.isArray(world[sec])) continue;
      for (const sym of world[sec]) {
        if (all.has(sym)) duplicates.add(sym);
        all.add(sym);
      }
    }

    // Prüfe auf Player/Target-Kollision
    if (duplicates.has(world.player)) {
      issues.push(`⚠️  ${key}: Player-Symbol "${world.player}" ist mehrfach vergeben`);
    }
    if (duplicates.has(world.target)) {
      issues.push(`⚠️  ${key}: Target-Symbol "${world.target}" ist mehrfach vergeben`);
    }
    if (world.player === world.target) {
      issues.push(`❌ ${key}: Player und Target haben dasselbe Symbol "${world.player}"`);
    }

    // Warnung bei fehlender Beschreibung
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
