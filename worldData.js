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
  },
  "flowers": {
    "symbols": [
      "🌸",      "🌹",      "🌺",      "🌻",      "🌼",      "💐",      "🥀",      "🌷",      "🍀",      "🌱"
    ],
    "rare": [
      "🦋",      "🐞",      "🐝",      "🍄",      "🐇",      "🍄‍🟫",      "🪰",      "🪁"
    ],
    "bottom": [],
    "player": "🐝",
    "target": "🌹",
    "description": "Eine blühende Welt, erfüllt von zarten Blumen und feinen Düften.",
    "title": "Blumenwiese"
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
