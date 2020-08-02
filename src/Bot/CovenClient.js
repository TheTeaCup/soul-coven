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

Coven.Developers = [
  "338192747754160138" /* Tea Cup#9999 */,
  "734953269717237771" /* TheHighPriestess#7585 */,
];

Coven.Staff = [
  "338192747754160138" /* Tea Cup#9999 */,
  "734953269717237771" /* TheHighPriestess#7585 */,
  "410634001750163457" /* Emma#1111 */ 
];

Coven.Commands = new Discord.Collection();
Coven.Aliases = new Discord.Collection();

const emoji = require("./Handlers/emoji");
Coven.emoji = emoji;

module.exports = Coven;