// worldData.js
// Alle Welten und ihre Konfigurationen in einem einzigen globalen Objekt,
// inklusive Symbol Arrays (symbols, rare, bottom) sowie der Spieler- und Ziel-Symbole.
const worldData = {
  galaxy: { 
    symbols: ["🧿","🕳️","✮","🎱","🌍","☾","🌌","🌑","🪐","🌕","☄️","💫","🚀","🛸","🌠","🌙","⭐️","🌜","🌚"],
    rare: ["👾","👽","🎮","👩‍🚀","🔫","🛰️"],
    bottom: ["🔭","📡"],
    player: "🚀",
    target: "🌍"
  },
  flowers: { 
    symbols: ["🌸","🌹","🌺","🌻","🌼","💐","🥀","🌷","🍀"],
    rare: ["🦋","🐞","🐝","🍄","🐇","🍄‍🟫","🍄","🪰","🪁"],
    bottom: [],
    player: "🐝",
    target: "🌹"
  },
  water: { 
    symbols: ["🐠","🐟","🐬","🐳","🐋","🦈","🦑","🐙","🌊","🚤","⛵","🚢","🛥️"],
    rare: ["🧜‍♂️","🧜‍♀️","🐋","🤿","🥽","🔱","⚓","🦈","🛟","🩳","🏊‍♀️","🏊‍♂️","🏊","🏄","🤽‍♂️"],
    bottom: [],
    player: "🏊‍♂️",
    target: "🐋"
  },
  forest: { 
    symbols: ["🌲","🌳","🌴","🍄","🌿","🍃","🍂","🦉","🐿️","🦌","🐻","🐇"],
    rare: ["🦅","🪺","🪹"],
    bottom: [],
    player: "🦊",
    target: "🍄"
  },
  lava: { 
    symbols: ["🔥","🌋","🪨","💀","👹","⚔️","♨️"],
    rare: [],
    bottom: [],
    player: "😎",
    target: "🔥"
  },
  steampunk: { 
    symbols: ["⚙️","🔩","🛠️","⏳","🚂","🎩","🕰️","🔧","🧰"],
    rare: [],
    bottom: [],
    player: "🤖",
    target: "⚙️"
  },
  desert: { 
    symbols: ["🏜️","🌵","🐫","🦂","☀️","🌞","🐍","🦎"],
    rare: [],
    bottom: [],
    player: "🐫",
    target: "🌵"
  },
  medieval: { 
    symbols: ["⚔️","🛡️","🏰","🐉","🧙‍♂️","👑","🏹","🗡️","📜"],
    rare: [],
    bottom: [],
    player: "🧙‍♂️",
    target: "👑"
  },
  racing: { 
    symbols: ["🏎️","🚦","🛣️","🏁","🚗","💨","🚘","⛽"],
    rare: [],
    bottom: [],
    player: "🏎️",
    target: "🚦"
  },
  airport: { 
    symbols: ["✈️","🛫","🛬","🛄","🎫","🛩️","🚁"],
    rare: [],
    bottom: [],
    player: "✈️",
    target: "🛫"
  },
  cyberpunk: { 
    symbols: ["🔮","💾","🕶️","🛸","🤖","⚡","🎛️","🖥️","💡","📡"],
    rare: [],
    bottom: [],
    player: "🤖",
    target: "💾"
  },
  northpole: { 
    symbols: ["❄️","⛄","🎅","🦌","🏔️","🌨️","🎁","🛷","🌲"],
    rare: [],
    bottom: [],
    player: "⛄",
    target: "❄️"
  },
  volcano: { 
    symbols: ["🌋","🔥","🪨","💀","⛏️","🌪️","♨️","🚒"],
    rare: [],
    bottom: [],
    player: "🚒",
    target: "🌋"
  },
  office: { 
    symbols: ["⌨️","☕","🖥️","📎","📁","🖨️","📊","📅","🖋️","📞","💻","📠"],
    rare: ["🖇️","🗃️","🏢","🗂️","🧑‍💼","👩‍💼"],
    bottom: [],
    player: "👩‍💼",
    target: "📎"
  },
  candyland: { 
    symbols: ["🍭","🍫","🍩","🍪","🍬","🍰","🎂","🍧","🍦"],
    rare: ["🍨","🧁","🍠","🧇"],
    bottom: [],
    player: "🍭",
    target: "🍬"
  },
  jungle: { 
    symbols: ["🌴","🐒","🦜","🍌","🐍","🐅","🐆","🦁","🐘"],
    rare: [],
    bottom: [],
    player: "🐒",
    target: "🍌"
  },
  circus: { 
    symbols: ["🎪","🤹‍♂️","🎭","🐘","🎠","🤡","🎟️","🎫"],
    rare: [],
    bottom: [],
    player: "🤹‍♂️",
    target: "🎪"
  },
  ruins: { 
    symbols: ["🏺","🗿","⛏️","🏛️","🔦","🏚️","🗺️"],
    rare: [],
    bottom: [],
    player: "🏺",
    target: "🗿"
  },
  disco: { 
    symbols: ["🪩","💃","🕺","🎶","🔊","🌈","🎧","💿"],
    rare: [],
    bottom: [],
    player: "🕺",
    target: "💃"
  },
  concert: { 
    symbols: ["🎤","🎸","🥁","🎵","🎧","🎹","🎺","🎷"],
    rare: [],
    bottom: [],
    player: "🎤",
    target: "🎸"
  },
  pirate: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "🏴‍☠️",
    target: "☠️"
  },
  ghost: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "👻",
    target: "🎃"
  },
  party: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "🥳",
    target: "🎉"
  },
  fairytale: { 
    symbols: ["🧚","✨","🌈"],
    rare: ["🦄","🔮","🪄"],
    bottom: [],
    player: "🧚‍♀️",
    target: "🦄"
  },
  apocalypse: { 
    symbols: ["☢️","🏚️","🔥"],
    rare: ["💣","🌅"],
    bottom: [],
    player: "😷",
    target: "🌅"
  },
  cave: { 
    symbols: ["🪨","⛰️","🕸️"],
    rare: ["🏺","🕯️"],
    bottom: [],
    player: "⛏️",
    target: "🏺"
  },
  cloud: { 
    symbols: ["☁️","🌤️","🌈"],
    rare: ["🕊️","🦋"],
    bottom: [],
    player: "☁️",
    target: "🕊️"
  },
  arcade: { 
    symbols: ["🎮","👾","🕹️"],
    rare: ["⭐️","💎"],
    bottom: [],
    player: "🎮",
    target: "💎"
  }
};
