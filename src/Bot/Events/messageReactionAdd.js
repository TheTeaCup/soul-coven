const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (bot, reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if (!message) return;
  if (user.bot) return;

  if (message.guild.id === settings.guild) {
    let already = new Discord.MessageEmbed()
      .setColor(bot.Color)
      .setAuthor(`⛔ | uh oh`)
      .setDescription(`You can only have one ticket open at a time.`);

    let success = new Discord.MessageEmbed()
      .setColor(bot.Color)
      .setTitle(`🎟️ | Ticket System`)
      .setDescription(
        `Please explain the reason for your request. A member of the team will take care of your ticket shortly.`
      );

    let split = "";
    let usr = user.id.split(split);
    for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

    if (
      message.embeds.length === 1 &&
      message.embeds[0].title === "Ticket System" &&
      message.embeds[0].description ===
        "React with :tickets: to create a ticket."
    ) {
      if (reaction.emoji.name === "🎟️") {
        if (
          !message.guild.channels.cache.find(
            c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`
          )
        ) {
          let role = message.guild.roles.cache.find(
            r => r.name === "Moderator"
          );
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
            reaction.users.remove(user.id);
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
                },
                {
                  allow: permsToHave,
                  id: "751626683924086874"
                }
              ],
              parent: categoria.id,
              reason: `user needs help`,
              topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | To close: click the trash can.`
            })
            .then(channel => {
              channel
                .send(`${user}`, { embed: success })
                .then(m => m.react(`🗑️`));
              db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, {
                user: user.id
              });
            });
          reaction.users.remove(user.id);
          return;
        } else {
          reaction.users.remove(user.id);
          message
            .reply({ embed: already })
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
      } else {
        reaction.users.remove(user.id);
      }
    }

    // ========================= //

    if (
      message.embeds[0].description ===
      "Please explain the reason for your request. A member of the team will take care of your ticket shortly."
    ) {
      if (!reaction.emoji.id️) {
        message.channel.send("deleting ticket...");
        setTimeout(function() {
          message.channel.delete();
          db.delete(`ticket.${message.channel.name}`);
        }, 5000);
      }
    }
  }
};
