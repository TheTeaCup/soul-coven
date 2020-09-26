const Discord = require("discord.js");
const { caseNumber } = require("../Handlers/caseNumber.js");
const { parseUser } = require("../Handlers/parseUser.js");

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
  message.guild.member(user).ban({
    reason: `Banned by: ${message.author.tag}`,
    days: 7
  });

  const reason =
    args.splice(1, args.length).join(" ") ||
    `Awaiting moderator's input. Use c!reason ${caseNum} reason.`;
  const embed = new Discord.MessageEmbed()
    .setColor("#dd2d44")
    .setTitle(`Ban | Case #${caseNum}`)
    .setTimestamp()
    .addField("Target", `${user.tag} (<@${user.id}>)`, true)
    .addField("Moderator", `${message.author.tag}`, true)
    .addField("Reason", `${reason}`)
    .setFooter(`Case ${caseNum}`);
  return Mythical.channels.cache.get(modlog.id).send({ embed });
};

exports.help = {
  name: "ban",
  description: "Bans the mentioned user.",
  usage: "ban [mention] [reason]"
};

exports.conf = {
  Aliases: []
};