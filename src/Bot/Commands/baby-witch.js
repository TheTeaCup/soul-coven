const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let info = Mythical.db.get(message.author.id);

  let guild = Mythical.guilds.cache.get("734953770961600593");
  let member = guild.members.cache.get(message.author.id);
  let role = guild.roles.cache.get("736245013670920292"); //baby-witch
  
  let level;
  let group;

    if (info) {
      level = info.level;
      group = info.group;
    }

  if(member.roles.cache.has(role.id)) {
    
    member.roles.remove(role, "User requested");
    let awaiter = await message.channel
      .send(`${message.author} Removing you from the baby-witch channel please wait...`)
      .then(m => {
        setTimeout(
          () => m.edit(`${message.author} You have left: ` + "baby-witch"),
          2500
        );
      });
      
    let data = {
      ID: message.author.id,
      group: group || "",
      level: level || "",
      rank: ""
    };
    
    Mythical.db.set(message.author.id, data);

        
  } else {
    
    member.roles.add(role, "User requested");
    let awaiter = await message.channel
      .send(`${message.author} Adding you to the baby-witch channel please wait...`)
      .then(m => {
        setTimeout(
          () => m.edit(`${message.author} You have Joined: ` + "baby-witch"),
          2500
        );
      });
      
    let data = {
      ID: message.author.id,
      group: group || "",
      level: level || "",
      rank: "baby-witch"
    };
    
    Mythical.db.set(message.author.id, data);
    
  };
};

exports.help = {
  name: "baby-witch",
  description: "Updates an unset moderator action.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: [ "baby" ]
};