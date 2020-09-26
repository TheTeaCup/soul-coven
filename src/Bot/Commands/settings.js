const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let prefix = Mythical.settings.get(message.guild.id, "prefix") || "c!";

  if (!args[0]) {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("Soul Coven - Server Settings")
      .setThumbnail(message.guild.iconURL())
      .addField(
        "Here are some of my commands!",
        `
      
      **\`${prefix}settings Prefix\` - Change your servers prefix.**

      
      `
      );
    return message.channel.send(embed);
  }

  if (args[0]) {
    if (Mythical.Developers.includes(message.author.id)) {
    } else {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          "<:no:696126182348816426> **| You don't have `ADMINISTRATOR` perms.**"
        );
    }
  }

  if (args[0].toLowerCase() === "prefix") {
    if (!args[1]) return message.reply("You forgot a prefix!");
    Mythical.settings.set(message.guild.id, args[1], "prefix");
    message.reply("Prefix has been changed to `" + args[1] + "`");
  }
};

exports.help = {
  name: "settings",
  description: "Allows Developers to change MBL's management.",
  usage: "m!Help"
};

exports.conf = {
  Aliases: ["s"]
};