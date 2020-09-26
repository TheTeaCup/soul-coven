const { MessageEmbed } = require("discord.js");

exports.run = (client, msg, args) => {
    
if (client.settings.get(msg.guild.id, "levelsystem") === false) {
    return msg.channel.send("Leveling System has been disabled in this server.");
}
    
  let embed = new MessageEmbed()
    .setColor(client.Color)
    .setTitle(`${msg.guild.name} - Leader Board`)
    .setDescription(
      `[Click Here](https://soulcoven.me/leaderboard/${msg.guild.id}) For the link to this servers leader board!`
    );
  msg.channel.send(embed);
};

exports.help = {
  name: "leaderboard",
  usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
};

exports.conf = {
  Aliases: []
};