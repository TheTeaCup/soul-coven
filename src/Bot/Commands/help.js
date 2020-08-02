const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setColor(Mythical.Color)
    .setTitle("Help Menu")
    .setDescription(
      "Hello and Welcome to Soul Coven! We are so happy you joined our server. \n This command is still under construction to come back later <3 \n Bot Info: I was created by <@338192747754160138>"
    )
    .addField("Wanna send feedback?","Well use the command `c!suggest`")
    .addField("Wanna see if you have any warnings?", "Well you can do, `c!Warns`")
    .addField("Wanna join a group?", "Well you can! do: `c!Group`")
    .addField("Are you a baby witch?", "If so do: `c!Baby-Witch` to get added to that channel")
    
  if(Mythical.Staff.includes(message.author.id)) {
      embed.addField("Staff Settings","`c!Mute <@user | id>` - **Mute a user** \n `c!Kick <@user | id>` - **Remove a user temporarily** \n `c!Ban <@user | id>` - **Permanently  remove a user** \n `c!Reason <case number` - **Give a reason for your action(s)** \n `c!Warn <@user | id> reason` - **Give a user  a warning** \n `c!Say <args>` - **Make the bot say something** \n `c!Edit <@user | id> <rank: 1,2,3>` - **Set a users rank** \n `c!Commands` - **Lock/un-lock a channel from using commands**")
  }
    
  return message.channel.send(embed);
};

exports.help = {
  name: "help",
  description: "Allows Developers to change MBL's management.",
  usage: "m!Help"
};

exports.conf = {
  Aliases: []
};