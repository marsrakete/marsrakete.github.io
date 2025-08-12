
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


```bash
# Clone the repo
git clone https://github.com/your-user/worldgenerator.git
cd worldgenerator

# Open in browser
open index.html   # macOS
# or:
start index.html  # Windows
```

> Works fully **offline** – no internet required.

---

## 📦 Project Structure

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
    "description_en": "A simple test world."
  }
}
```


💡 You can optionally add animations like this:

```json
"animation": {
  "animate-glow": ["⭐️"],
  "animate-float": ["🪐"]
}
```

Available animations: `animate-glow`, `animate-float`, `animate-pulse`, `animate-spin`, `animate-wiggle`, `animate-shake`, `animate-blink`


Check the browser console for validation:  
`✅ Symbol check: no conflicts found.`

---

## 💡 Contributing

Contributions are welcome:

1. Fork the repository.
2. Add your changes.
3. Submit a pull request.

Make sure your JSON is valid and worlds have unique names.

---

## 🔒 License

Licensed under the [Apache License 2.0](LICENSE).
