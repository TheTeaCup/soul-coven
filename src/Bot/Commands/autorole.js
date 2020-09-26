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

  let role =
    msg.guild.roles.cache.find(r => r.name == args.join(" ")) ||
    msg.mentions.roles.first() ||
    msg.guild.roles.cache.get(args[0]);

  if (!role) return msg.reply("I could not find that role.");

  let index = client.settings
    .get(msg.guild.id, "welcomeroles")
    .findIndex(r => r === role.id);
  if (client.settings.get(msg.guild.id, "welcomeroles").includes(role.id)) {
    msg.reply("removed the role from being added on join.");
    client.settings.delete(msg.guild.id, `welcomeroles.${index}`);
    return;
  }

  msg.channel.send(
    `${msg.author.tag}, added role ${msg.guild.roles.cache
      .get(role.id)
      .toString()} to be added on join.`
  );
  client.settings.push(msg.guild.id, role.id, "welcomeroles");
  return;
};

exports.help = {
  name: "autorole",
  usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
};

exports.conf = {
  Aliases: ["auto-role"]
};