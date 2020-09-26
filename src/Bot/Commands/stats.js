const Discord = require("discord.js");
const { promisify } = require("util");
const exec = promisify(require("child_process").execFile);
const path = require("path");

module.exports.run = async (Mythical, message, args) => {
  // eslint-disable-line no-unused-vars


  const aboutEmbed = new Discord.MessageEmbed()
    .setTitle("Soul Coven Stats")
    .setColor(Mythical.Color)
    // .setDescription(``)

    .addField(
      "How much storage does Soul Coven take up?",
      `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    )
    .addField(
      "What DJS and Node Version are we using?",
      `DJS: v${Discord.version} \n Node: ${process.version}`
    )
    .addField("How many servers am i in?", `\`${Mythical.guilds.cache.size}\` Servers`)


  return message.channel.send(aboutEmbed);
};

exports.help = {
  name: "stats",
  description: "Shows a bit of information about Koala.",
  usage: "a!Stats"
};

exports.conf = {
  Aliases: []
};