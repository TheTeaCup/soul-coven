const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let Target = args[0];
  if (message.mentions.users.first()) {
    let t = message.mentions.users.first();
    Target = t.id;
  }
  if (!Target) return message.channel.send("Please give an user to edit.");

  let embed = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setTitle("User Info")
    .setDescription("ID: " + Target);
  message.channel.send(embed);
};

exports.help = {
  name: "userinfo",
  description: "Change a users permissions.",
  usage: "user <args>"
};

exports.conf = {
  Aliases: ["u", "user", "ui"]
};