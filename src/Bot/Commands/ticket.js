const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (Mythical, message, args) => {
  if (message.guild.id !== settings.guild)
    return message.channel.send(
      "Sorry this command is only allowed in `The Witches Of The Soul` Discord server"
    );

  let already = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setAuthor(`⛔ | uh oh`)
    .setDescription(`You can only have one ticket open at a time.`);

  let success = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setTitle(`🎟️ | Ticket System`)
    .setDescription(
      `Please explain the reason for your request. A member of the team will take care of your ticket shortly.`
    );

  let user = message.author;

  let split = "";
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  if (
    !message.guild.channels.cache.find(
      c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`
    )
  ) {
    let role = message.guild.roles.cache.find(r => r.name === "Moderator");
    if (!role) {
      message.guild.roles.create({
        data: { name: "Ticket Support", permissions: 0 },
        reason: "Le staff a besoin de ce rôle pour voir les tickets."
      });
      message.channel
        .send(
          `S'il vous plaît, veuillez réagir une nouvelle fois au message de création de ticket.`
        )
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
      return;
    }
    let categoria = message.guild.channels.cache.find(
      c => c.name == "support tickets" && c.type == "category"
    );

    let permsToHave = [
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "ADD_REACTIONS"
    ];

    message.guild.channels
      .create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, {
        permissionOverwrites: [
          {
            deny: "VIEW_CHANNEL",
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          }
        ],
        parent: categoria.id,
        reason: `user needs help`,
        topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | To close: click the trash can.`
      })
      .then(channel => {
        channel.send(`${user}`, { embed: success }).then(m => m.react(`🗑️`));
        db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, {
          user: user.id
        });
      });
      message.reply("Ticket created!");
    return;
  } else {
    message
      .reply({ embed: already })
      .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
  }
};

exports.help = {
  name: "ticket",
  description: "opens a ticket for you.",
  usage: "ban [mention] [reason]"
};

exports.conf = {
  Aliases: ["t"]
};
