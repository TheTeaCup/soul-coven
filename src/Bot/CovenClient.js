const Discord = require("discord.js");
const { get } = require("snekfetch");

/**
 * Create our client
 */
const Coven = new Discord.Client({
  disabledEvents: [
    "CHANNEL_PINS_UPDATE",
    "RELATIONSHIP_ADD",
    "RELATIONSHIP_REMOVE",
    "TYPING_START"
  ],
  messageCacheMaxSize: 100,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
  fetchAllMembers: true
});

require("./Database/index.js")(Coven);
/**
 * Require external files that Coven needs.
 */
require(process.cwd() + "/src/Bot/Handlers/EventHandler.js")(Coven);
require(process.cwd() + "/src/Bot/Handlers/CommandHandler.js")(Coven);
require("./Handlers/functions")(Coven);

Coven.Color = "#2C2F33";
Coven.WebColor = "#8B008B";
Coven.Desc = "Wanna learn about witch craft and astrology? well this is site for you!";
Coven.Image = "/images/pent.png";
Coven.Website = "https://soulcoven.me/";

Coven.Developers = [
  "338192747754160138" /* Tea Cup#9999 */,
  "734953269717237771" /* TheHighPriestess#7585 */,
];

Coven.Staff = [
  "338192747754160138" /* Tea Cup#9999 */,
  "734953269717237771" /* TheHighPriestess#7585 */,
  "410634001750163457" /* Emma#1111 */,
  "296239960648974337" /* Infamous Alex#4597 */,
  "419287711506235393" /* ℬїтḉ♄#7564 */,
  "387738012219342849" /* froggy lora#8277 */,
  "334765531825438721" /* Kistyra#2188 */,
  "685684615066681397" /* matt#9304 */,
  "659650462643126292" /* selena#9373 */,
  "337378226005344258" /* Blueberry#6373 */
];

Coven.Commands = new Discord.Collection();
Coven.Aliases = new Discord.Collection();

Coven.on("BotList", async () => {
  require(process.cwd() + "/src/Bot/Handlers/BotList.js")(Coven);
});

const emoji = require("./Handlers/emoji");
Coven.emoji = emoji;

const { GiveawaysManager } = require('discord-giveaways');
Coven.giveawaysManager = new GiveawaysManager(Coven, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: Coven.Color,
        reaction: "🎉"
    }
});

module.exports = Coven;