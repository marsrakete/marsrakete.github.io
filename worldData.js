// worldData.js
// Helper to load world data from the external JSON file

let worldData = {};

async function loadWorldData() {
  if (Object.keys(worldData).length) return worldData;
  const response = await fetch('./worldData.json');
  worldData = await response.json();
  return worldData;
}

