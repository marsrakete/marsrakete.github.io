# World Generator

This repository contains a small browser-based "Weltgenerator" (world generator) built entirely with HTML, CSS and JavaScript. The generator creates grid-based worlds made of emoji symbols. You can switch between a playable game mode and an editor mode to design your own worlds.

## Running Locally

No build steps are required. Clone the repository and open `index.html` in your web browser. All assets and scripts are loaded from local files.

```bash
# Clone and open
git clone <repository>
cd marsrakete.github.io
# open index.html with your favourite browser
```

## Extending World Data

World definitions are stored in [`worldData.js`](worldData.js). Each world entry defines available symbols, rare symbols, a player icon, a target icon and a short description. To add a new world, append an object in `worldData` following the existing pattern and submit a pull request.

Example snippet:

```javascript
const worldData = {
  myWorld: {
    symbols: ["🧪","🔬"],
    rare:    ["👾"],
    bottom:  [],
    player:  "🧑‍🔬",
    target:  "🧬",
    description: "A science themed world." ,
  }
};
```

## Contributing

Contributions and new world ideas are welcome! Fork the project, make your changes and open a pull request. Please keep your additions consistent with the existing code style.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
