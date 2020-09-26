const Discord = require("discord.js");
//const Quick = require("quick.db");

module.exports = async (Mythical, guild) => {
  //Quick.delete(`dailyLog_${guild.id}`);
  Mythical.roleReaction.delete(`${guild.id}`);


  const logsServerLeave2 = Mythical.channels.cache.get(settings.server);
  console.log(
    `The bot has been left ${guild.name}, Owned by ${guild.owner.user.tag}`
  );
  const embed = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setAuthor(
      `I have left ${guild.name}`,
      "https://images-ext-1.discordapp.net/external/qBdcbDveLYsigBBmlqmQVyoRoxv--WLu0d_M3YkWiow/https/dlnbots.github.io/images/leave.png"
    )
    .setThumbnail(guild.iconURL)
    .addField(`${guild.name}`, `I am now in \`${Mythical.guilds.cache.size}\``)
    .setTimestamp();

  logsServerLeave2.setTopic(
    `Bot Stats: Users ${Mythical.users.cache.size} || Guilds ${Mythical.guilds.cache.size}`
  );
  logsServerLeave2.send(embed);
};