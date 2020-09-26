const Discord = require("discord.js");

module.exports = async (Mythical, member) => {
  if (member.guild.id === settings.guild) {
    // Check if it's soul coven.

    console.log(`member left! User: ${member.user.tag} (${member.user.id})`);

    const botRole = member.guild.roles.cache.get("735315694354301018"); // Get all the roles by id.
    const blankRole = member.guild.roles.cache.get("736017005672530141");
    const memberRole = member.guild.roles.cache.get("735264917577269321");
    let channel2 = Mythical.channels.cache.get("735305678511538327"); // welcome-log

      let channelEmbed = new Discord.MessageEmbed()
        .setColor("#cd00cd")
        .setTitle("Welcome to Soul Coven!")
        .setDescription(
          `
      awe, **${member.user.tag}** left, we now have ${(
            member.guild.memberCount
          ).toLocaleString()} members
      Hopefully they come back :)
      `
        )
        .setThumbnail(member.user.avatarURL());

      channel2.send({ embed: channelEmbed });

  } else {
  /*  if (member.user.bot) return;
    let client = Mythical;
    let roleArray = client.settings.get(member.guild.id, "welcomeroles");
    if (roleArray.length > 0) {
      for (let d = 0; d < roleArray.length; d++) {
        member.roles.add(roleArray[d]);
      }
    }
    let { MessageEmbed } = require("discord.js");
    let array = client.settings.get(member.guild.id, "welcomemessage");
    let channel = client.settings.get(member.guild.id, "welcomechannel");

    let embed = new MessageEmbed();
    if (array[1].title !== "none")
      embed.setTitle(
        array[1].title
          .replaceAll("{usertag}", member.user.tag)
          .replaceAll("{members}", member.guild.memberCount)
          .replaceAll("{userid}", member.user.id)
          .replaceAll("{servername}", member.guild.name)
      );
    if (array[1].description !== "none")
      embed.setDescription(
        array[1].description
          .replaceAll("{user}", member.user)
          .replaceAll("{usertag}", member.user.tag)
          .replaceAll("{members}", member.guild.memberCount)
          .replaceAll("{userid}", member.user.id)
          .replaceAll("{servername}", member.guild.name)
      );
    if (array[1].image !== "none") embed.setImage(array[1].image);
    if (array[1].footer !== "none")
      embed.setFooter(
        array[1].footer
          .replaceAll("{usertag}", member.user.tag)
          .replaceAll("{members}", member.guild.memberCount)
          .replaceAll("{userid}", member.user.id)
          .replaceAll("{servername}", member.guild.name)
      );
    embed.setColor(array[1].color);

    if (channel === "dm") {
      if (array[1].embed === true) {
        member.send(embed);
        return;
      } else if (array[1].embed === false) {
        member.send(array[0].message);
        return;
      }
    }
    if (!member.guild.channels.cache.get(channel)) return;

    if (array[1].embed === true) {
      client.channels.cache.get(channel).send(embed);
      return;
    } else if (array[1].embed === false) {
      client.channels.cache.get(channel).send(
        array[0].message
          .replaceAll("{user}", member.user)
          .replaceAll("{usertag}", member.user.tag)
          .replaceAll("{members}", member.guild.memberCount)
          .replaceAll("{userid}", member.user.id)
          .replaceAll("{servername}", member.guild.name)
      );
      return;
    } */
  }
};



String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}