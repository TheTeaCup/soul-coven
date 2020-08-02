const Discord = require("discord.js");
const { caseNumber } = require("../Handlers/caseNumber.js");
const { parseUser } = require("../Handlers/parseUser.js");
const ms = require("ms");

exports.run = async (Mythical, message, args) => {
  if (!Mythical.Staff.includes(message.author.id))
    return message.channel.send("Sorry but to use this command you must be a staff member!");
    
try {
  const user = message.mentions.users.first();
  if (!user) return message.channel.send(`Sorry you didn't mention a User.`);
  parseUser(message, user);

  const modlog = Mythical.channels.cache.get("735305448449638472");
  if (!modlog) return message.reply("I cannot find a mod-log channel");
  const caseNum = await caseNumber(Mythical, modlog);

  const muteRole = Mythical.guilds.cache
    .get("734953770961600593")
    .roles.cache.get("735306087137280020");
  if (!muteRole)
    return message.reply("I cannot find a mute role").catch(console.error);
    
    let time = args[1];
    if(!time)return message.channel.send("I need a time.");

  const reason =
    args.splice(2, args.length).join(" ") ||
    `Awaiting moderator's input. Use c!reason ${caseNum} reason.`;

  const embed = new Discord.MessageEmbed()
    .setColor("#fac10b")
    .setTitle(`Mute | Case #${caseNum}`)
    .setTimestamp()
    .addField("Target", `${user.tag} (<@${user.id}>)`, true)
    .addField("Moderator", `${message.author.tag}`, true)
    .addField("Reason", `${reason}`)
    .addField("Mute Time", `${time}`)
    .setFooter(`Case ${caseNum}`);

  const embed2 = new Discord.MessageEmbed()
    .setColor("#07de05")
    .setTitle(`Unmute | Case #${caseNum}`)
    .setTimestamp()
    .addField("Target", `${user.tag} (<@${user.id}>)`, true)
    .addField("Moderator", `${message.author.tag}`, true)
    .addField("Reason", `Times up!`)
    .setFooter(`Case ${caseNum}`);

  if (
    !message.guild
      .member(Mythical.user)
      .hasPermission("MANAGE_ROLES")
  )
    return message
      .reply("I do not have the correct permissions.")
      .catch(console.error);
      
  setTimeout(function(){
  message.channel.send(`${user} has been un-muted`);
    message.guild
      .member(user)
      .roles.remove(muteRole)
      .then(() => {
        Mythical.channels.cache
          .get(modlog.id)
          .send(embed2)
          .catch(console.error);
      });
  }, ms(time));

  if (message.guild.member(user).roles.cache.has(muteRole.id)) {
     message.channel.send(`${user} has been un-muted`);
    message.guild
      .member(user)
      .roles.remove(muteRole)
      .then(() => {
        Mythical.channels.cache
          .get(modlog.id)
          .send(embed2)
          .catch(console.error);
      });
  } else {
 message.channel.send(`${user} has been muted`);
    message.guild
      .member(user)
      .roles.add(muteRole)
      .then(() => {
        Mythical.channels.cache
          .get(modlog.id)
          .send({ embed })
          .catch(console.error);
      });
  }
} catch (e){
    return message.channel.send(`I ran into a error: \n ${e}`)
}
};

exports.help = {
  name: "mute",
  description: "mutes or unmutes a mentioned user",
  usage: "mute [mention] [reason]"
};

exports.conf = {
  Aliases: []
};