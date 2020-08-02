const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  let guild = Mythical.guilds.cache.get("734953770961600593");
  let member = guild.members.cache.get(message.author.id);
  let roles = guild.roles.cache;
  let types = roles.filter(function(number) {
    return number.name.endsWith("-witch");
  });

  let data = [];
  types.map(role => data.push(role.name));

  if (!args[0]) {
    message.channel
      .send("Here are the types of witches: \n " + data.join("\n"))
      .then(
        message.channel.send(
          "To get a role do: `c!type WITCH-TYPE` Ex: `c!type green-witch` \n Don't see your type? well open a ticket and we'll add it!"
        )
      );
    return;
  }

  try {
    if (data.includes(args[0].toLowerCase())) {
      let arg = args[0];
      let defined = arg.toLowerCase();
      let toAdd = roles.find(element => element.name === defined);
      if (!toAdd) return message.channel.send("**Error:** Role was not found.");
      let info = Mythical.db.get(member.id);

      let level;
      let group;
      let rank;

      if (info) {
        level = info.level;
        group = info.group;
        rank = info.rank;
      }
      
      if(info){
          if(info.type) {
         let they = roles.find(element => element.name === info.type);
         member.roles.remove(they.id)
          }
      }

      if (member.roles.cache.has(toAdd.id)) {
        member.roles.remove(toAdd.id).then(() => {
          message.channel.send(`I removed: **${toAdd.name}** to you.`);
        });

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: "",
          rank: rank || ""
        };

        Mythical.db.set(member.id, data);
      } else {
        member.roles.add(toAdd.id).then(() => {
          message.channel.send(`I added: **${toAdd.name}** to you.`);
        });

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: toAdd.name,
          rank: rank || ""
        };

        Mythical.db.set(member.id, data);
      }
    } else {
      message.channel.send(
        "The role you entered: " +
          args[0] +
          " was not found, if you want to add the role please open a ticket! <#736263969484046367>"
      );
    }
  } catch (e) {
    return message.channel.send("Error: " + e);
  }
};

exports.help = {
  name: "type",
  description: "Change a users permissions.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: ["t"]
};