async function channels(Mythical) {
  console.log("Soul Coven (Bot) Fetching Helper Role Members.");

  let guild = Mythical.guilds.cache.get("734953770961600593");
  let users = guild.roles.cache.get("751626683924086874").members.map(g=>g.id);
  
  Mythical.helpers = users;
  
let channel = Mythical.channels.cache.get("755823114012721313")
let Discord = require("discord.js")

let embed = new Discord.MessageEmbed()
.setTitle("How many helpers?")
.setDescription(`There are: **${Mythical.helpers.length}** helpers`)
.setColor(Mythical.Color)

channel.messages.fetch({around: "757044265728606319", limit: 1})
  .then(messages => {
    messages.first().edit(embed);
  });
  
}

module.exports = channels;