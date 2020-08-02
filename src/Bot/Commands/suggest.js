const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
    
  let channel = Mythical.channels.cache.get("735682554719633518");
    
  let suggestion = args.join(" ");
  if(!suggestion)return message.channel.send("Please provide feedback. Example: `c!Suggestion add something cool :)`");
  
  message.channel.send(`${message.author} Your Feedback Has Been sent! <#735682554719633518>`);
    
  let embed = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setTitle("Feed Back!")
    .setThumbnail(message.author.avatarURL())
    .setDescription(`${suggestion}`)
    .setFooter(`Feedback sent by ${message.author.tag}`)
  return channel.send(embed).then(async msg => {
      // reaction
      msg.react("735686606094204958") //yes
      msg.react("735686638600192141") // no
  });
  
};

exports.help = {
  name: "suggest",
  description: "Allows Developers to change MBL's management.",
  usage: "m!suggest"
};

exports.conf = {
  Aliases: [ "suggestion" ]
};