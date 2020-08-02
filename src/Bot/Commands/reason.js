const Discord = require("discord.js");

async function embedSan(embed) {
  embed.message ? delete embed.message : null;
  embed.footer ? delete embed.footer.embed : null;
  embed.provider ? delete embed.provider.embed : null;
  embed.thumbnail ? delete embed.thumbnail.embed : null;
  embed.image ? delete embed.image.embed : null;
  embed.author ? delete embed.author.embed : null;
  embed.fields
    ? embed.fields.forEach(f => {
        delete f.embed;
      })
    : null;
  return embed;
}

exports.run = async (Mythical, message, args) => {
   if (!Mythical.Staff.includes(message.author.id))
    return message.channel.send("Sorry but to use this command you must be a staff member!");


  const modlog = Mythical.channels.cache.get("735305448449638472");
  const caseNumber = args.shift();
  const newReason = args.join(" ");

  await modlog.messages.fetch({ limit: 100 }).then(messages => {
    const caseLog = messages
      .filter(
        m =>
          m.author.id === Mythical.user.id &&
          m.embeds[0] &&
          m.embeds[0].type === "rich" &&
          m.embeds[0].footer &&
          m.embeds[0].footer.text.startsWith("Case") &&
          m.embeds[0].footer.text === `Case ${caseNumber}`
      )
      .first();
    modlog.messages.fetch(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);

      embed.fields.map(g => {
        if (
          g.value ===
          `Awaiting moderator's input. Use m!reason ${caseNumber} reason.`
        ) {
          g.value = newReason;
        }
      });
      logMsg.edit({ embed });
    });
  });
};

exports.help = {
  name: "reason",
  description: "Updates an unset moderator action.",
  usage: "reason <case number> <new reason>"
};

exports.conf = {
  Aliases: []
};