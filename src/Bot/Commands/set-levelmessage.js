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
    return msg.channel.send(
      "Please specify what message should be sent when somebody levels up, you can use {level} and the level will show, {user} and the user will be tagged."
    );

  let text = args.join(" ");

  if (text.length > 1800)
    return msg.channel.send(
      "Sorry, the message can not be longer than 1800 characters."
    );

  client.settings.set(msg.guild.id, text, "message");
  msg.channel.send("Level Message was updated! 👍");
};

exports.help = {
  name: "set-levelmessage",
  usage:
    "!set-levelmessage <message> (max 1800 characters)\n{user} for user & {level} for level."
};

exports.conf = {
  Aliases: []
};