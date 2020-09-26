const Discord = require("discord.js");
const pronounify = require("../Handlers/pronouns.js");

module.exports = (Mythical, message) => {
  if (message.guild === null) {
    /*  return message.reply(`Please say commands in a channel, so the bot knows which instance you're from.
    You can say the following:
    \`list available pronouns   \` -- Get a list of available pronoun sets
    \`my pronouns are IDENTIFIER\` -- Set your pronouns to IDENTIFIER`); */
  } else {
    if (message.guild.id === settings.guild) {
      pronounify.listPronouns(message);
      pronounify.addPronouns(message);
      pronounify.setPronouns(message);
    }
  }

  if (
    message.author.bot ||
    !message.author ||
    message.channel.type !== "text"
  ) {
    return undefined;
  }

  let Prefix = Mythical.settings.get(message.guild.id, "prefix") || "c!";

  if (message.content == "<@!735313029016846487>") {
    const embed2 = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setDescription(`Need Help? My prefix is: **${Prefix}**`);

    message.channel.send(embed2);
  }

  if (message.content.indexOf(Prefix) !== 0) {
    return undefined;
  }

  console.log(
    `${message.guild.name}[${message.guild.id}] - ${message.author.tag} - ${message.content}`
  );

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let Command = args.shift().toLowerCase();

  let MythicalCommand;
  if (Mythical.Commands.has(Command)) {
    Mythical.Statcord.postCommand(Command, message.author.id);
    MythicalCommand = Mythical.Commands.get(Command);
  } else if (Mythical.Aliases.has(Command)) {
    Mythical.Statcord.postCommand(Command, message.author.id);
    MythicalCommand = Mythical.Commands.get(Mythical.Aliases.get(Command));
  } else {
    return; //Not a command
  }

  if (message.guild.id === settings.guild) {
    let channels = Mythical.AllowedChannels.get("channels");
    if (!Mythical.Staff.includes(message.author.id)) {
      if (!channels.includes(message.channel.id)) {
        message.delete();
        return message.channel
          .send(
            `${message.author} Sorry but you're not allowed to do bot commands in this channel.`
          )
          .then(msg => msg.delete({ timeout: 5000 }));
      }
    }
  }

  MythicalCommand.run(Mythical, message, args);
};