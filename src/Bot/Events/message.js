const Discord = require("discord.js");
const pronounify = require('../Handlers/pronouns.js');


module.exports = (Mythical, message) => {
    
  if (message.guild === null) {
 /*  return message.reply(`Please say commands in a channel, so the bot knows which instance you're from.
    You can say the following:
    \`list available pronouns   \` -- Get a list of available pronoun sets
    \`my pronouns are IDENTIFIER\` -- Set your pronouns to IDENTIFIER`); */
  } else {
    pronounify.listPronouns(message);
    pronounify.addPronouns(message);
    pronounify.setPronouns(message);
  }
    
  if (
    message.author.bot ||
    !message.author ||
    message.channel.type !== "text"
  ) {
    return undefined;
  }

  if (message.content == "<@!735313029016846487>") {
    const embed2 = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setDescription(`Need Help? My prefix is: **c!**`);

    message.channel.send(embed2);
  }

  let Prefix = "c!";
  if (message.content.indexOf(Prefix) !== 0) {
    return undefined;
  }

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let Command = args.shift().toLowerCase();

  let MythicalCommand;
  if (Mythical.Commands.has(Command)) {
    MythicalCommand = Mythical.Commands.get(Command);
  } else if (Mythical.Aliases.has(Command)) {
    MythicalCommand = Mythical.Commands.get(Mythical.Aliases.get(Command));
  } else {
    return; //Not a command
  }
  
  let channels = Mythical.AllowedChannels.get("channels");
  if(!Mythical.Staff.includes(message.author.id)) {
      if(!channels.includes(message.channel.id)) {
          message.delete();
          return message.channel.send(`${message.author} Sorry but you're not allowed to do bot commands in this channel.`)
          .then(msg => msg.delete({ timeout: 5000 }));
      }
  } 

  MythicalCommand.run(Mythical, message, args);
};