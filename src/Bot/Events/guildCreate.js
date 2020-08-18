const Discord = require("discord.js");
//var send = require("quick.hook");

module.exports = async (Mythical, guild) => {
  console.log(
    `The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag}`
  );
  const logsServerJoin2 = Mythical.channels.cache.get(settings.server-log);
  let a = "Welcome!";

  const embed = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setAuthor(
      `i Joined ${guild.name}`,
      "https://images-ext-1.discordapp.net/external/3vb7X0yysUyIs3XxOs6s0X-gB6PH8PG80rFbv_7iQeI/https/dlnbots.github.io/images/join.png"
    )
    .setThumbnail(guild.iconURL)
    //.setURL("https://bumperbot.ml/info/" + guild.id )
    .addField(`${guild.name}`, `I am now in \`${Mythical.guilds.cache.size}\``)
    .addField(
      "Member Info",
      `**Total Users Count:** \`${guild.memberCount}\`\n\n**Member Count:** \`${
        guild.members.cache.filter(member => !member.user.bot).size
      }\`\n**Bot Count:** \`${
        guild.members.cache.filter(member => member.user.bot).size
      }\``,
      true
    )
    .addField(
      "Server Info",
      `**Owner:** \`${guild.owner.user.tag}\`\n**Host Region:** \`${guild.region}\`\n**Verification Level:** \`${guild.verificationLevel}\`\n**Server ID:** \`${guild.id}\``,
      true
    )
    .setTimestamp();
  logsServerJoin2.setTopic(
    `Bot Stats: Users ${Mythical.users.cache.size} || Guilds ${Mythical.guilds.cache.size}`
  );

  let Data = {
    ID: guild.id,
    prefix: "a!",
    modinvites: "false",
    modlang: "false",
    leveling: "false",
    levellog: "",
    modlog: ""
  }

  Mythical.settings.set(guild.id,Data);

  logsServerJoin2.send(embed);
};