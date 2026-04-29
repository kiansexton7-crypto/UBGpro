// ============================================================
// UBG PRO — GAME LIBRARY
// A curated list of working games
// ============================================================

const GAMES = [
  // ---- ACTION ----
  { id: 1,  name: "Bullet Force",       cat: "shooting",    emoji: "🔫",  thumb: "https://tse2.mm.bing.net/th?q=Bullet%20Force%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/bullet-force-multiplayer", featured: true  },
  { id: 2,  name: "Venge.io",           cat: "shooting",    emoji: "🎯",  thumb: "https://tse2.mm.bing.net/th?q=Venge.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://venge.io/",                                        featured: false },
  { id: 3,  name: "Shell Shockers",     cat: "shooting",    emoji: "🥚",  thumb: "https://tse2.mm.bing.net/th?q=Shell%20Shockers%20game%20thumbnail&w=320&h=200&c=7", url: "https://shellshock.io/",                                   featured: true  },
  { id: 4,  name: "Warbrokers.io",      cat: "shooting",    emoji: "⚔️",  thumb: "https://tse2.mm.bing.net/th?q=Warbrokers.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://warbrokers.io/",                                   featured: false },
  { id: 5,  name: "Krunker.io",         cat: "shooting",    emoji: "🔫",  thumb: "https://tse2.mm.bing.net/th?q=Krunker.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://krunker.io/",                                      featured: true  },

  // ---- MULTIPLAYER ----
  { id: 6,  name: "Slither.io",         cat: "multiplayer", emoji: "🐍",  thumb: "https://tse2.mm.bing.net/th?q=Slither.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://slither.io/",                                      featured: true  },
  { id: 7,  name: "Agar.io",            cat: "multiplayer", emoji: "🔵",  thumb: "https://tse2.mm.bing.net/th?q=Agar.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://agar.io/",                                         featured: false },
  { id: 8,  name: "Surviv.io",          cat: "multiplayer", emoji: "🏝️",  thumb: "https://tse2.mm.bing.net/th?q=Surviv.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://surviv.io/",                                       featured: false },
  { id: 9,  name: "Diep.io",            cat: "multiplayer", emoji: "🪖",  thumb: "https://tse2.mm.bing.net/th?q=Diep.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://diep.io/",                                         featured: false },
  { id: 10, name: "Zombs Royale",       cat: "multiplayer", emoji: "🧟",  thumb: "https://tse2.mm.bing.net/th?q=Zombs%20Royale%20game%20thumbnail&w=320&h=200&c=7", url: "https://zombsroyale.io/",                                  featured: true  },
  { id: 11, name: "Skribbl.io",         cat: "multiplayer", emoji: "🖌️",  thumb: "https://tse2.mm.bing.net/th?q=Skribbl.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://skribbl.io/",                                      featured: false },
  { id: 12, name: "Paper.io 2",         cat: "multiplayer", emoji: "📄",  thumb: "https://tse2.mm.bing.net/th?q=Paper.io%202%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/paper-io-2",               featured: false },
  { id: 13, name: "Wormate.io",         cat: "multiplayer", emoji: "🪱",  thumb: "https://tse2.mm.bing.net/th?q=Wormate.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://wormate.io/",                                      featured: false },
  { id: 14, name: "Splix.io",           cat: "multiplayer", emoji: "🧩",  thumb: "https://tse2.mm.bing.net/th?q=Splix.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://splix.io/",                                        featured: false },
  { id: 15, name: "Uno Online",         cat: "multiplayer", emoji: "🃏",  thumb: "https://tse2.mm.bing.net/th?q=Uno%20Online%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/uno-online",               featured: false },
  { id: 16, name: "Among Us Online",   cat: "multiplayer", emoji: "🚀",  thumb: "https://tse2.mm.bing.net/th?q=Among%20Us%20Online%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/among-us-online-edition",  featured: true  },
  { id: 17, name: "Snake.io",          cat: "multiplayer", emoji: "🐍",  thumb: "https://tse2.mm.bing.net/th?q=Snake.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/snake-io",                 featured: false },

  // ---- RACING ----
  { id: 18, name: "Neon Rider",         cat: "racing",      emoji: "🌈",  thumb: "https://tse2.mm.bing.net/th?q=Neon%20Rider%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/neon-rider",               featured: false },
  { id: 19, name: "Eggy Car",           cat: "racing",      emoji: "🥚",  thumb: "https://tse2.mm.bing.net/th?q=Eggy%20Car%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/eggy-car",                 featured: false },

  // ---- PUZZLE ----
  { id: 20, name: "2048",               cat: "puzzle",      emoji: "🔢",  thumb: "https://tse2.mm.bing.net/th?q=2048%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/2048",                     featured: false },
  { id: 21, name: "Chess",              cat: "puzzle",      emoji: "♟️",  thumb: "https://tse2.mm.bing.net/th?q=Chess%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.chess.com/play/computer",                      featured: false },
  { id: 22, name: "Wordle",             cat: "puzzle",      emoji: "📝",  thumb: "https://tse2.mm.bing.net/th?q=Wordle%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.nytimes.com/games/wordle/index.html",           featured: false },
  { id: 23, name: "Sugar Sugar",        cat: "puzzle",      emoji: "🍬",  thumb: "https://tse2.mm.bing.net/th?q=Sugar%20Sugar%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/sugar-sugar-3",            featured: false },

  // ---- ADVENTURE ----
  { id: 24, name: "Run 3",              cat: "adventure",   emoji: "🏃",  thumb: "https://tse2.mm.bing.net/th?q=Run%203%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.coolmathgames.com/0-run-3",                     featured: true  },
  { id: 25, name: "Temple Run 2",       cat: "adventure",   emoji: "🏛️",  thumb: "https://tse2.mm.bing.net/th?q=Temple%20Run%202%20game%20thumbnail&w=320&h=200&c=7", url: "https://poki.com/en/g/temple-run-2",                       featured: false },
  { id: 26, name: "Minecraft Classic",  cat: "adventure",   emoji: "⛏️",  thumb: "https://tse2.mm.bing.net/th?q=Minecraft%20Classic%20game%20thumbnail&w=320&h=200&c=7", url: "https://classic.minecraft.net/",                           featured: true  },

  // ---- SPORTS ----
  { id: 27, name: "Basketball Stars",   cat: "sports",      emoji: "🏀",  thumb: "https://tse2.mm.bing.net/th?q=Basketball%20Stars%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/basketball-stars",         featured: false },
  { id: 28, name: "Rooftop Snipers",    cat: "sports",      emoji: "🏹",  thumb: "https://tse2.mm.bing.net/th?q=Rooftop%20Snipers%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/rooftop-snipers",          featured: false },

  // ---- STRATEGY ----
  { id: 29, name: "Bloons TD 5",        cat: "strategy",    emoji: "🎈",  thumb: "https://tse2.mm.bing.net/th?q=Bloons%20TD%205%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/bloons-tower-defense-5",   featured: false },
  { id: 30, name: "Kingdom Rush",       cat: "strategy",    emoji: "🏰",  thumb: "https://tse2.mm.bing.net/th?q=Kingdom%20Rush%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/kingdom-rush",             featured: false },
  { id: 31, name: "Clash of Clans",     cat: "strategy",    emoji: "⚔️",  thumb: "https://tse2.mm.bing.net/th?q=Clash%20of%20Clans%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/mini-royale-nations",      featured: false },
  { id: 32, name: "Mini Royale",        cat: "strategy",    emoji: "👑",  thumb: "https://tse2.mm.bing.net/th?q=Mini%20Royale%20game%20thumbnail&w=320&h=200&c=7", url: "https://miniroyale.io/",                                   featured: false },
  { id: 33, name: "Tiny Fishing",       cat: "strategy",    emoji: "🎣",  thumb: "https://tse2.mm.bing.net/th?q=Tiny%20Fishing%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/tiny-fishing",             featured: false },
  { id: 34, name: "Cookie Clicker",     cat: "strategy",    emoji: "🍪",  thumb: "https://tse2.mm.bing.net/th?q=Cookie%20Clicker%20game%20thumbnail&w=320&h=200&c=7", url: "https://orteil.dashnet.org/cookieclicker/",                 featured: false },
  { id: 35, name: "Lordz.io",          cat: "strategy",    emoji: "👑",  thumb: "https://tse2.mm.bing.net/th?q=Lordz.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.lordz.io/",                                    featured: false },

  // ---- UNITY GAMES ----
  { id: 36, name: "Dino Squad",         cat: "unity",       emoji: "🦕",  thumb: "https://tse2.mm.bing.net/th?q=Dino%20Squad%20game%20thumbnail&w=320&h=200&c=7", url: "https://simmer.io/@simmer/dino-squad",                     featured: false, unity: true },
  { id: 37, name: "Smash Karts",        cat: "unity",       emoji: "🏎️",  thumb: "https://tse2.mm.bing.net/th?q=Smash%20Karts%20game%20thumbnail&w=320&h=200&c=7", url: "https://smashkarts.io/",                                   featured: true,  unity: true },
  { id: 38, name: "Bonk.io",            cat: "unity",       emoji: "💥",  thumb: "https://tse2.mm.bing.net/th?q=Bonk.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://bonk.io/",                                         featured: false, unity: true },
  { id: 39, name: "Narrow.One",         cat: "unity",       emoji: "🏹",  thumb: "https://tse2.mm.bing.net/th?q=Narrow.One%20game%20thumbnail&w=320&h=200&c=7", url: "https://narrow.one/",                                      featured: true,  unity: true },
  { id: 40, name: "Getaway Shootout",   cat: "unity",       emoji: "🚁",  thumb: "https://tse2.mm.bing.net/th?q=Getaway%20Shootout%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/getaway-shootout",         featured: false, unity: true },
  { id: 41, name: "Ragdoll Archers",    cat: "unity",       emoji: "🎯",  thumb: "https://tse2.mm.bing.net/th?q=Ragdoll%20Archers%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/ragdoll-archers",          featured: false, unity: true },
  { id: 42, name: "Tribals.io",         cat: "unity",       emoji: "🏕️",  thumb: "https://tse2.mm.bing.net/th?q=Tribals.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://tribals.io/",                                      featured: false, unity: true },
  { id: 43, name: "GoBattle.io",        cat: "unity",       emoji: "⚔️",  thumb: "https://tse2.mm.bing.net/th?q=GoBattle.io%20game%20thumbnail&w=320&h=200&c=7", url: "https://gobattle.io/",                                     featured: false, unity: true },
  { id: 44, name: "Town of Salem",      cat: "unity",       emoji: "🕵️",  thumb: "https://tse2.mm.bing.net/th?q=Town%20of%20Salem%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.blankmediagames.com/TownOfSalem/",              featured: false, unity: true },
  { id: 45, name: "Lost Ruins",         cat: "unity",       emoji: "🏚️",  thumb: "https://tse2.mm.bing.net/th?q=Lost%20Ruins%20game%20thumbnail&w=320&h=200&c=7", url: "https://simmer.io/@simmer/lost-ruins",                     featured: false, unity: true },

  // ---- MORE ACTION ----
  { id: 46, name: "Knife Hit",          cat: "action",      emoji: "🔪",  thumb: "https://tse2.mm.bing.net/th?q=Knife%20Hit%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/knife-hit",                featured: false },
  { id: 47, name: "Raze 3",             cat: "action",      emoji: "🚀",  thumb: "https://tse2.mm.bing.net/th?q=Raze%203%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/raze",                     featured: false },
  { id: 48, name: "Super Smash Flash 2",cat: "action",      emoji: "👊",  thumb: "https://tse2.mm.bing.net/th?q=Super%20Smash%20Flash%202%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.supersmashflash.com/",                         featured: true  },
  { id: 49, name: "House of Hazards",   cat: "multiplayer", emoji: "🏠",  thumb: "https://tse2.mm.bing.net/th?q=House%20of%20Hazards%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/house-of-hazards",         featured: false },
  { id: 50, name: "Stickman Army",      cat: "action",      emoji: "💂",  thumb: "https://tse2.mm.bing.net/th?q=Stickman%20Army%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/stickman-army-team-battle",featured: false },
  { id: 51, name: "Learn to Fly 3",     cat: "action",      emoji: "🐧",  thumb: "https://tse2.mm.bing.net/th?q=Learn%20to%20Fly%203%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/learn-to-fly-3",           featured: false },
  { id: 52, name: "Doodle Jump",        cat: "action",      emoji: "📱",  thumb: "https://tse2.mm.bing.net/th?q=Doodle%20Jump%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/doodle-jump",              featured: false },
  { id: 53, name: "Tank Trouble",       cat: "action",      emoji: "🪖",  thumb: "https://tse2.mm.bing.net/th?q=Tank%20Trouble%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/tank-trouble",             featured: false },
  { id: 54, name: "Helix Jump",         cat: "action",      emoji: "🌀",  thumb: "https://tse2.mm.bing.net/th?q=Helix%20Jump%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/helix-jump",               featured: false },
  { id: 55, name: "Raft Wars",          cat: "action",      emoji: "🚢",  thumb: "https://tse2.mm.bing.net/th?q=Raft%20Wars%20game%20thumbnail&w=320&h=200&c=7", url: "https://www.crazygames.com/embed/raft-wars-2",              featured: false },
  { id: 56, name: "Happy Wheels",       cat: "action",      emoji: "🚲",  thumb: "https://tse2.mm.bing.net/th?q=Happy%20Wheels%20game%20thumbnail&w=320&h=200&c=7", url: "https://totaljerkface.com/happy_wheels.tjf",                featured: true  },
];
