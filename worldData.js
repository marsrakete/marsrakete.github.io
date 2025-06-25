// worldData.js
// Helper to load world data from the external JSON file

<!-- Fallback: JSON-Daten im HTML einbetten. Hier nur 2 Welten -->
<script id="worldDataJson" type="application/json">
{
  "galaxy": {
    "symbols": [
      "🧿",
      "🕳️",
      "✮",
      "🎱",
      "🌍",
      "☾",
      "🌌",
      "🌑",
      "🪐",
      "🌕",
      "☄️",
      "💫",
      "🚀",
      "🛸",
      "🌠",
      "🌙",
      "⭐️",
      "🌜",
      "🌚"
    ],
    "rare": [
      "👾",
      "👽",
      "🎮",
      "👩‍🚀",
      "🔫",
      "🛰️"
    ],
    "bottom": [
      "🔭",
      "📡"
    ],
    "player": "🚀",
    "target": "🌍",
    "description": "Eine galaktische Welt voller Sterne und fremder Planeten.",
    "title": "Galaxie"
  },
  "flowers": {
    "symbols": [
      "🌸",
      "🌹",
      "🌺",
      "🌻",
      "🌼",
      "💐",
      "🥀",
      "🌷",
      "🍀",
      "🌱"
    ],
    "rare": [
      "🦋",
      "🐞",
      "🐝",
      "🍄",
      "🐇",
      "🍄‍🟫",
      "🪰",
      "🪁"
    ],
    "bottom": [],
    "player": "🐝",
    "target": "🌹",
    "description": "Eine blühende Welt, erfüllt von zarten Blumen und feinen Düften.",
    "title": "Blumenwiese"
  }
}
</script>

<script>
  let worldData;

  async function loadWorldData() {
    // Falls Daten schon geladen wurden
    if (worldData) return worldData;

    try {
      const response = await fetch('./worldData.json');

      // Check: fetch erfolgreich UND JSON?
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Fetch fehlgeschlagen oder kein JSON");
      }

      worldData = await response.json();
      console.log("Daten per fetch geladen.");
    } catch (err) {
      // Fallback: JSON aus HTML-Tag laden
      console.warn("Fetch fehlgeschlagen, Fallback wird genutzt:", err);
      const jsonText = document.getElementById('worldDataJson')?.textContent;
      worldData = JSON.parse(jsonText);
      console.log("Daten per Fallback (script-tag) geladen.");
    }

    return worldData;
  }

  // Beispiel: Nutzung
  loadWorldData().then(data => console.log("Welt:", data));
</script>

