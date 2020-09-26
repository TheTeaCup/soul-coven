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
  if (!args[0])
    return msg.channel.send("You forgot to give me the name of a channel.");
  let channel =
    msg.guild.channels.cache.find(c => c.name === args[0]) ||
    msg.mentions.channels.first();
  if (!channel)
    return msg.channel.send(
      "I could not find a channel with the name of `" + args[0] + "`"
    );

  client.settings.set(msg.guild.id, channel.id, "channel");
  msg.channel.send(
    "Successfully updated level ups to be sent in " + channel + " 👍"
  );
};

exports.help = {
  name: "set-levelchannel",
  usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
};

exports.conf = {
  Aliases: []
};