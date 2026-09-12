# 🌌 World Generator

A browser-based world generator for exploring, playing, and editing random emoji worlds. Whether galaxies, flower fields, or nightmares – a single click creates a unique scenery. Ideal for creative exploration, accessibility (ALT text), and playful experiments.

> Supports both **Game Mode** (with timer & target collection) and **Editor Mode** (for custom designs).

---

## 🚀 Features

- 🌍 Generates **random emoji worlds** in a 30x10 grid.
- 🎮 **Game mode** with targets, timer, and result summary.
- ✏️ **Editor mode** to freely design and test your own worlds.
- ♿ Built-in **ALT text generator** for accessibility (DE/EN).
- 🎨 Optional **animations** for symbols (glow, pulse, float, blink, spin, etc.).
- 📋 Export as **text**, **graphic (clipboard)**, or **permalink**.
- 📱 Mobile-optimized: touch, swipe & desktop support.
- 🔀 Language toggle: **English** / **German** (auto-detect).
- 🔄 Built-in **permalink system** with hash validation.
- ✨ Symbol galleries, zoom slider, and animation toggle included.

---

## 🧑‍💻 Running Locally

⚠️ **Note**: For full functionality (all available worlds), the page must be served via a local web server. Modern browsers block local `file://` loading of JSON data.

### 🔧 Using Python (recommended):
```bash
# Start from project root
python3 -m http.server 8000

# Then open in browser:
http://localhost:8000/
```

Alternatively:
```bash
npx serve .
```

---

## 📦 Project Structure

### Open Graph image

The editable source is `icons/weltgenerator-og.svg` (1200 × 630). Its reusable
SVG templates use `defs` / `use` and contain vector artwork without external images.
The build is copied from Threadline: Resvg renders the SVG to PNG, checks the
dimensions with Sharp, and exports a JPEG at quality 92.

```bash
npm ci
npm run build:og-image
npm run check
```

`config/og-image.config.json` defines the source, dimensions and outputs:
`icons/weltgenerator-og.png` and `og-image.jpg`. Commit both generated images
after changing the SVG. `index.html` references the absolute JPEG URL in the
Open Graph and Twitter Card metadata, with dimensions and alternative text.
GitHub Pages serves the generated files; Node.js is only needed for rebuilding.
Text uses locally installed Arial (with Helvetica / sans-serif fallbacks), so
font rendering can differ between build machines. Review the PNG after rebuilding.

| File              | Purpose                                                             |
|------------------|---------------------------------------------------------------------|
| `index.html`     | Main HTML entry point                                               |
| `main.js`        | Game logic, switching, control and editor behavior                  |
| `worldData.json` | Emoji world definitions (symbols, targets, player, animations, etc.)|
| `worldData.js`   | Fallback and loader for world data                                  |
| `common.js`      | Language switch, clipboard, ALT text, audio, hashes, permalinks     |
| `common.css`     | Styling and animations                                              |
| `lang.json`      | UI language strings (de/en)                                         |

---

## 🌱 Adding New Worlds

Extend the file `worldData.json` like this:

```json
{
  "myNewWorld": {
    "symbols": ["🍎", "🍌"],
    "rare": ["🍇"],
    "bottom": ["🌿"],
    "player": "🚶",
    "target": "🎯",
    "description": "A simple test world.",
    "title": "Test World",
    "title_en": "Test World",
    "description_en": "A simple test world.",
    "animation": {
      "animate-glow": ["⭐️"],
      "animate-float": ["🪐"]
    }
  }
}
```

Available animations: `animate-glow`, `animate-float`, `animate-pulse`, `animate-spin`, `animate-wiggle`, `animate-shake`, `animate-blink`, `animate-bounce`, `animate-wobble`, `animate-flicker`, `animate-swing`, `animate-breathe`

Check the browser console for validation:  
`✅ Symbol check: no conflicts found.`

---

## 💡 Contributing

Contributions are welcome:

1. Fork the repository.
2. Add your changes.
3. Submit a pull request.

Please ensure your JSON is valid and worlds have unique names.

---

## 🔒 License

Licensed under the [Apache License 2.0](LICENSE).

---

## 🧪 Validation with `validateWorldData()`

To check your emoji world definitions for issues or compatibility, use the built-in JavaScript function `validateWorldData(worldData)`.

### 🔍 What does it check?

- duplicate symbols in a world (`symbols`, `rare`, `bottom`)
- conflicts between `player`, `target`, `monster`
- missing or invalid entries (e.g. empty titles or invalid symbols)
- emoji compatibility: warns about Unicode symbols that may not appear correctly under **Windows 10**

### 🖥️ How to use it in the browser console

1. Open the game in a browser
2. Press **F12** to open Developer Tools → Console tab
3. Type:
```js
validateWorldData(worldData);
```

The console will display warnings and notes about any problems found – including symbols that might not be displayed on some systems.
