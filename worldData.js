// worldData.js
// Zentrales Objekt, das alle Welten mit ihren Symbolen, seltenen Symbolen, bottom-Elementen,
// den Spielern und Zielen sowie einer Beschreibung enthält.
const worldData = {
  galaxy: { 
    symbols: ["🧿","🕳️","✮","🎱","🌍","☾","🌌","🌑","🪐","🌕","☄️","💫","🚀","🛸","🌠","🌙","⭐️","🌜","🌚"],
    rare: ["👾","👽","🎮","👩‍🚀","🔫","🛰️"],
    bottom: ["🔭","📡"],
    player: "🚀",
    target: "🌍",
    description: "Eine galaktische Welt voller Sterne und fremder Planeten."
  },
  flowers: { 
    symbols: ["🌸","🌹","🌺","🌻","🌼","💐","🥀","🌷","🍀"],
    rare: ["🦋","🐞","🐝","🍄","🐇","🍄‍🟫","🍄","🪰","🪁"],
    bottom: [],
    player: "🐝",
    target: "🌹",
    description: "Eine blühende Welt, erfüllt von zarten Blumen und feinen Düften."
  },
  water: { 
    symbols: ["🐠","🐟","🐬","🐳","🐋","🦈","🦑","🐙","🌊","🚤","⛵","🚢","🛥️"],
    rare: ["🧜‍♂️","🧜‍♀️","🐋","🤿","🥽","🔱","⚓","🦈","🛟","🩳","🏊‍♀️","🏊‍♂️","🏊","🏄","🤽‍♂️"],
    bottom: [],
    player: "🏊‍♂️",
    target: "🐋",
    description: "Eine wasserbasierte Welt mit Ozeanen, Meerestieren und sanften Wellen."
  },
  forest: { 
    symbols: ["🦊","🌲","🌳","🌴","🍄","🌿","🍃","🍂","🦉","🐿️","🦌","🐻","🐇"],
    rare: ["🦅","🪺","🪹"],
    bottom: [],
    player: "🦊",
    target: "🍄",
    description: "Ein waldartiges Paradies voller Bäume, Tiere und geheimnisvoller Lichtungen."
  },
  lava: { 
    symbols: ["😎","🔥","🌋","🪨","💀","👹","⚔️","♨️"],
    rare: [],
    bottom: [],
    player: "😎",
    target: "🔥",
    description: "Eine feurige Welt, in der Vulkane lodern und Magma den Boden bedeckt."
  },
  steampunk: { 
    symbols: ["🤖","⚙️","🔩","🛠️","⏳","🚂","🎩","🕰️","🔧","🧰"],
    rare: [],
    bottom: [],
    player: "🤖",
    target: "⚙️",
    description: "Eine Steampunk-Welt, die mechanische Wunder und nostalgische Technik verbindet."
  },
  desert: { 
    symbols: ["🏜️","🌵","🐫","🦂","☀️","🌞","🐍","🦎"],
    rare: [],
    bottom: [],
    player: "🐫",
    target: "🌵",
    description: "Eine wüstenartige Welt mit sengender Sonne und kargen Landschaften."
  },
  medieval: { 
    symbols: ["⚔️","🛡️","🏰","🐉","🧙‍♂️","👑","🏹","🗡️","📜"],
    rare: [],
    bottom: [],
    player: "🧙‍♂️",
    target: "👑",
    description: "Eine mittelalterliche Welt, in der Ritter, Burgen und Drachen zuhause sind."
  },
  racing: { 
    symbols: ["🏎️","🚦","🛣️","🏁","🚗","💨","🚘","⛽"],
    rare: [],
    bottom: [],
    player: "🏎️",
    target: "🚦",
    description: "Eine Welt für Adrenalinjunkies mit schnellen Autos und spannenden Rennen."
  },
  airport: { 
    symbols: ["✈️","🛫","🛬","🛄","🎫","🛩️","🚁"],
    rare: [],
    bottom: [],
    player: "✈️",
    target: "🛫",
    description: "Eine flughafenbezogene Welt, in der Flugzeuge und die Faszination des Fliegens im Mittelpunkt stehen."
  },
  cyberpunk: { 
    symbols: ["🔮","💾","🕶️","🛸","🤖","⚡","🎛️","🖥️","💡","📡"],
    rare: [],
    bottom: [],
    player: "🤖",
    target: "💾",
    description: "Eine futuristische Cyberpunk-Welt mit Neonlichtern und digitalen Visionen."
  },
  northpole: { 
    symbols: ["❄️","⛄","🎅","🦌","🏔️","🌨️","🎁","🛷","🌲"],
    rare: [],
    bottom: [],
    player: "⛄",
    target: "❄️",
    description: "Eine frostige Welt am Nordpol, voll von Schnee, Eis und festlicher Stimmung."
  },
  volcano: { 
    symbols: ["🌋","🔥","🪨","💀","⛏️","🌪️","♨️","🚒"],
    rare: [],
    bottom: [],
    player: "🚒",
    target: "🌋",
    description: "Eine vulkanische Welt, in der die Natur mit explosiver Kraft spielt."
  },
  office: { 
    symbols: ["⌨️","☕","🖥️","📎","📁","🖨️","📊","📅","🖋️","📞","💻","📠"],
    rare: ["🖇️","🗃️","🏢","🗂️","🧑‍💼","👩‍💼"],
    bottom: [],
    player: "👩‍💼",
    target: "📎",
    description: "Eine bürokratische Welt, in der Computer, Akten und Kaffee das Geschäft bestimmen."
  },
  candyland: { 
    symbols: ["🍭","🍫","🍩","🍪","🍬","🍰","🎂","🍧","🍦"],
    rare: ["🍨","🧁","🍠","🧇"],
    bottom: [],
    player: "🍭",
    target: "🍬",
    description: "Eine süße Welt, in der Schokolade, Bonbons und Kuchen dominieren."
  },
  jungle: { 
    symbols: ["🌴","🐒","🦜","🍌","🐍","🐅","🐆","🦁","🐘"],
    rare: [],
    bottom: [],
    player: "🐒",
    target: "🍌",
    description: "Eine dschungelartige Welt voller exotischer Tiere und üppiger Vegetation."
  },
  circus: { 
    symbols: ["🎪","🤹‍♂️","🎭","🐘","🎠","🤡","🎟️","🎫"],
    rare: [],
    bottom: [],
    player: "🤹‍♂️",
    target: "🎪",
    description: "Eine zirkusartige Welt, in der Akrobaten, Clowns und bunte Zelte zuhause sind."
  },
  ruins: { 
    symbols: ["🏺","🗿","⛏️","🏛️","🔦","🏚️","🗺️"],
    rare: [],
    bottom: [],
    player: "🏺",
    target: "🗿",
    description: "Eine ruinöse Welt, in der alte Tempel und verfallene Bauwerke eine geheimnisvolle Atmosphäre schaffen."
  },
  disco: { 
    symbols: ["🪩","💃","🕺","🎶","🔊","🌈","🎧","💿"],
    rare: [],
    bottom: [],
    player: "🕺",
    target: "💃",
    description: "Eine discoartige Welt, pulsierend mit Musik, Bewegung und bunten Lichtern."
  },
  concert: { 
    symbols: ["🎤","🎸","🥁","🎵","🎧","🎹","🎺","🎷"],
    rare: [],
    bottom: [],
    player: "🎤",
    target: "🎸",
    description: "Eine konzertbezogene Welt, in der Musik und Live-Auftritte das Herzstück bilden."
  },
  pirate: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "🏴‍☠️",
    target: "☠️",
    description: "Eine piratenhafte Welt mit Abenteuern auf hoher See und Schatzsuchen."
  },
  ghost: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "👻",
    target: "🎃",
    description: "Eine geisterhafte Welt voller Spukgestalten und mysteriöser Erscheinungen."
  },
  party: { 
    symbols: [],
    rare: [],
    bottom: [],
    player: "🥳",
    target: "🎉",
    description: "Eine partyorientierte Welt, in der Feierlaune und Spaß im Vordergrund stehen."
  }
};
