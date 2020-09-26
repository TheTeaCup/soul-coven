const { MessageEmbed } = require("discord.js");

exports.run = (client, msg, args) => {
  if (client.Developers.includes(msg.author.id)) {
  } else {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.channel
        .send("**| You don't have `ADMINISTRATOR` perms.**")
        .then(m => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
  }
  let check = client.settings.get(msg.guild.id, "levelsystem");
  if (check === false) {
    msg.reply("enabled the level system. :thumbsup:");
    client.settings.set(msg.guild.id, true, "levelsystem");
  } else if (check === true) {
    msg.reply("disabled the level system. :thumbsup:");
    client.settings.set(msg.guild.id, false, "levelsystem");
  }
};

exports.help = {
  name: "level-system",
  usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
};

exports.conf = {
  Aliases: []
};