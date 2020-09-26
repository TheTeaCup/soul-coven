const Discord = require("discord.js");
const { caseNumber } = require("../Handlers/caseNumber.js");
const { parseUser } = require("../Handlers/parseUser.js");
const Quick = require("quick.db");

exports.run = async (Mythical, message, args) => {
  if(message.guild.id !== settings.guild)return message.channel.send("Sorry this command is only allowed in `The Witches Of The Soul` Discord server")

  if (!Mythical.Staff.includes(message.author.id))
    return message.channel.send("Sorry but to use this command you must be a staff member!");

  const user = message.mentions.users.first();
  if (!user) return message.channel.send(`Sorry you didn't mention a User.`);
  parseUser(message, user);

  const modlog = Mythical.channels.cache.get("735305448449638472");
  if (!modlog) return message.reply("I cannot find a mod-log channel");
  const caseNum = await caseNumber(Mythical, modlog);

  if (message.mentions.users.size < 1)
    return message
      .reply("You must mention someone to ban them.")
      .catch(console.error);
 
  const reason =
    args.splice(1, args.length).join(" ")
    
    if(!reason)return message.channel.send("Give a warning");
    
        let warns = Quick.get(`userWarnings_${user.id}`);
        if(warns) {
            warns = Number(warns) + 1
        } else {
            warns = 1
        };
      
        Quick.set(`userWarnings_${user.id}`, warns);
        Quick.push(`warnreasons.${user.id}`, reason);
        
  message.channel.send(`Warned: ${user.tag}`)
    
  const embed = new Discord.MessageEmbed()
    .setColor("#FFCC00")
    .setTitle(`Warn | Case #${caseNum}`)
    .setTimestamp()
    .addField("Target", `${user.tag} (<@${user.id}>)`, true)
    .addField("Moderator", `${message.author.tag}`, true)
    .addField("Reason", `${reason}`)
    .setFooter(`Case ${caseNum}`);
  return Mythical.channels.cache.get(modlog.id).send({ embed });
};

exports.help = {
  name: "warn",
  description: "Warns the mentioned user.",
  usage: "warn [mention] [reason]"
};

exports.conf = {
  Aliases: ['w']
};