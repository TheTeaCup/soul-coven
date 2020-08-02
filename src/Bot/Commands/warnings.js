const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports.run = async (Koala, message, args) => { // eslint-disable-line no-unused-vars
  
  if(!args[0]) {
    return message.channel.send("Please supply a \`Mention\` or an \`ID\`.");
  };
  
  const Target = message.mentions.members.first() || Koala.users.cache.get(args[0])
  
  if (!Target) {
    return message.channel.send("Please supply a \`Mention\` or an \`ID\`.");
  };
  
 // console.log(Target.id)
  const warnReasons = await Quick.get(`warnreasons.${Target.id}`);
  const warnCount = Quick.get(`userWarnings_${Target.id}`);
 
 try {
  
  const warnEmbed = new Discord.MessageEmbed()
  .setTitle(`Warnings from ${Target.tag}`)
  .setColor(Koala.Color)
  .setDescription(`\`Warning Amount:\` ${warnCount}\n\n\`Warnings:\`\n\n${warnReasons.join("\n")}`);
  
  if (warnCount){
    return message.channel.send(warnEmbed);
  } else{
    return message.channel.send("This user does not have any \`warnings\`.");
  };
} catch (e) {
 return message.channel.send("This user does not have any \`warnings\`. ");
}
};

exports.help = {
  name: "warns",
  description: "Get a users warnings.",
  usage: "k!Warns"
};

exports.conf = {
  Aliases: [ "warnings" ] 
};