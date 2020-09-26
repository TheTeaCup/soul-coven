const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let prefix = Mythical.settings.get(message.guild.id, "prefix") || "c!";

  if (message.guild.id === settings.guild) {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("Help Menu")
      .setDescription(
        "Hello and Welcome to Soul Coven! We are so happy you joined our server. I was created by <@338192747754160138>"
      )
      .addField("Wanna send feedback?", "Well use the command `c!suggest`")
      .addField(
        "Wanna see if you have any warnings?",
        "Well you can do, `c!Warns`"
      )
      .addField("Wanna join a group?", "Well you can! do: `c!Group`")
      .addField(
        "Are you a baby witch?",
        "If so do: `c!Baby-Witch` to get added to that channel"
      )
      .addField(
        "Wanna know your rank?",
        "If so do: `c!Rank` to get your information"
      )

      .addField(
        "Wanna see this servers Leader Board?",
        "If so do: `c!LeaderBoard` to get a link to it!"
      )
      .addField(
        "Need some help with something?",
        "Well then open a ticket! `c!Ticket`"
      )
      .addField(
        "Giveaway Commands",
        `
      
      **\`${prefix}Giveaway-Start\` - Start a giveaway.**
      **\`${prefix}Giveaway-End\` - End the giveaway.**
      **\`${prefix}Giveaway-ReRoll\` - Pick a new winner.**
      
      `
      );

    if (Mythical.Staff.includes(message.author.id)) {
      embed.addField(
        "Staff Settings",
        "`c!Mute <@user | id>` - **Mute a user** \n `c!Kick <@user | id>` - **Remove a user temporarily** \n `c!Ban <@user | id>` - **Permanently  remove a user** \n `c!Reason <case number` - **Give a reason for your action(s)** \n `c!Warn <@user | id> reason` - **Give a user  a warning** \n `c!Say <args>` - **Make the bot say something** \n `c!Edit <@user | id> <rank: 1,2,3>` - **Set a users rank** \n `c!Commands` - **Lock/un-lock a channel from using commands**"
      );
    }

    return message.channel.send(embed);
  } else {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("Help Menu")
      .setDescription(
        "Welcome to the public version of Soul Coven! \n We are a Online Coven for all types of witches to leanr and grow while on their spiritual path <3"
      )
      .addField(
        "Here are some of my commands!",
        `
      
      **\`${prefix}Stats\` - Show some stats about the bot.**
      **\`${prefix}Partners\` - Show some of our partners.** *not done*
      **\`${prefix}Invite\` - Get some links to invite me.**
      **\`${prefix}Rank\` - Found out your rank.**
      **\`${prefix}Level-System\` - Change your leveling system settings.**
      **\`${prefix}Set-LevelChannel\` - Change your leveling system channel.**
      **\`${prefix}Set-LevelMessage\` - Change your leveling system message.**
      **\`${prefix}Welcome\` - Change your welcoming settings.**
      **\`${prefix}Settings\` - Change your servers settings.**
      **\`${prefix}LeaderBoard\` - Gives a link to your servers Leaderboard.**

      
      `
      )
      .addField(
        "Giveaway Commands",
        `
      
      **\`${prefix}Giveaway-Start\` - Start a giveaway.**
      **\`${prefix}Giveaway-End\` - End the giveaway.**
      **\`${prefix}Giveaway-ReRoll\` - Pick a new winner.**
      
      `
      );
    return message.channel.send(embed);
  }
};

exports.help = {
  name: "help",
  description: "Allows Developers to change MBL's management.",
  usage: "m!Help"
};

exports.conf = {
  Aliases: []
};