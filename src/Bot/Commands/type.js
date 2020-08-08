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

  let info = Mythical.db.get(member.id);

  let level;
  let group;
  let rank;
  let type = [];

  if (info) {
    level = info.level;
    group = info.group;
    rank = info.rank;
    type.push(info.type);
  }

  if (!args[0]) {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("Witch Type - Self Role")
      .setDescription(
        `For a list off all the witches: \`c!type list\` \n To join/leave a type: \`c!type WITCH-TYPE\` Ex: \`c!type green-witch\` `
      )
      .addField(
        "The current witch type(s) you're in",
        `You're in: ${type.join("\n")}`
      );
    return message.channnel.send(embed);
  }

  if (args[0].toLowerCase() === "list") {
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

      if (info) {
        /* if(info.type) {
         let they = roles.find(element => element.name === info.type);
         member.roles.remove(they.id)
          } */
      }

      if (member.roles.cache.has(toAdd.id)) {
        member.roles.remove(toAdd.id).then(() => {
          message.channel.send(`I removed: **${toAdd.name}** to you.`);
        });

        var filtered = type.filter(function(el) {
          return el != `${toAdd.name}`;
        });

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: filtered,
          rank: rank || ""
        };

        Mythical.db.set(member.id, data);
      } else {
        member.roles.add(toAdd.id).then(() => {
          message.channel.send(`I added: **${toAdd.name}** to you.`);
        });

        type.push(toAdd.name);

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: type,
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

  let info = Mythical.db.get(member.id);

  let level;
  let group;
  let rank;
  let type = [];

  if (info) {
    level = info.level;
    group = info.group;
    rank = info.rank;
    type.push(info.type);
  }

  if (!args[0]) {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("Witch Type - Self Role")
      .setDescription(
        `For a list off all the witches: \`c!type list\` \n To join/leave a type: \`c!type WITCH-TYPE\` Ex: \`c!type green-witch\` `
      )
      .addField(
        "The current witch type(s) you're in",
        `You're in: ${type.join("\n")}`
      );
    return message.channnel.send(embed);
  }

  if (args[0].toLowerCase() === "list") {
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

      if (info) {
        /* if(info.type) {
         let they = roles.find(element => element.name === info.type);
         member.roles.remove(they.id)
          } */
      }

      if (member.roles.cache.has(toAdd.id)) {
        member.roles.remove(toAdd.id).then(() => {
          message.channel.send(`I removed: **${toAdd.name}** to you.`);
        });

        var filtered = type.filter(function(el) {
          return el != `${toAdd.name}`;
        });

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: filtered,
          rank: rank || ""
        };

        Mythical.db.set(member.id, data);
      } else {
        member.roles.add(toAdd.id).then(() => {
          message.channel.send(`I added: **${toAdd.name}** to you.`);
        });

        type.push(toAdd.name);

        let data = {
          ID: member.id,
          group: group || "",
          level: level || "",
          type: type,
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
