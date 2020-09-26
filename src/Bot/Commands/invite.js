const Discord = require("discord.js");

module.exports.run = async (Mythical, message, args) => {
  // eslint-disable-line no-unused-vars

  const aboutEmbed = new Discord.MessageEmbed()
    .setTitle("Soul Coven Bot Invite")
    .setColor(Mythical.Color)
    .setDescription(
      "Would you like to Invite me to your server? Well check below for more info!"
    )
    .addField(
      "Website Invite",
      "[Click Me](https://soulcoven.me/) then click the 'Login Button'!"
    )
    .addField(
      "Direct Invite",
      "[Click Me](https://discord.com/oauth2/authorize?client_id=735313029016846487&scope=bot&permissions=2080767185)"
    )
    .addField(
      "Discord Server Invite",
      "[Click Me](https://discord.gg/EXQ2hUj)"
    )

  return message.channel.send(aboutEmbed);
};

exports.help = {
  name: "invite",
  description: "Shows a bit of information about the API.",
  usage: "c!Invite"
};

exports.conf = {
  Aliases: []
};