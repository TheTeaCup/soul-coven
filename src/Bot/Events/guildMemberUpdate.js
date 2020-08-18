const Discord = require("discord.js");

module.exports = async (client, oldMember, newMember) => {
if (member.guild.id === settings.guild-id) {
  if (oldMember.nickname !== newMember.nickname) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
      .setTimestamp()
      .setColor("#00e5ff")
      .setFooter(`ID: ${newMember.id}`)
      .addField(
        "**Nickname Update**",
        `**Before:**${
          oldMember.nickname
            ? oldMember.nickname.replace(/(\*|~|_|`|<|\|)/g, "\\$1")
            : oldMember.user.username.replace(/(\*|~|_|`|<|\|)/g, "\\$1")
        }
**+After:**${
          newMember.nickname
            ? newMember.nickname.replace(/(\*|~|_|`|<|\|)/g, "\\$1")
            : newMember.user.username.replace(/(\*|~|_|`|<|\|)/g, "\\$1")
        }`
      );

    oldMember.guild.channels.cache.get("735503490830434354").send(embed);
  }
}
};