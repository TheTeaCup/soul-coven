const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  if (!Mythical.Developers.includes(message.author.id)) {
    return message.channel.send(
      "Sorry but this command is lock to the `High Council`!"
    );
  }

 let channels = Mythical.AllowedChannels.get("channels");
 
 if(channels.includes(message.channel.id)) {
     
     Mythical.AllowedChannels.remove("channels", message.channel.id);
     return message.channel.send("Commands are not allowed in this channel now.");
     
 } else {
     
     Mythical.AllowedChannels.push("channels", message.channel.id);
     return message.channel.send("Commands are allowed in this channel now.");
     
 }

};

exports.help = {
  name: "commands",
  description: "Change a users permissions.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: ["c", "channels"]
};