const Discord = require("discord.js");
let groups = ["group-1", "group-2", "group-3", "group-4", "group-5"];

exports.run = async (Mythical, message, args) => {
  let info = Mythical.db.get(message.author.id);

  let guild = Mythical.guilds.cache.get("734953770961600593");
  let member = guild.members.cache.get(message.author.id);
  let group1 = guild.roles.cache.get("736021441060929646");
  let group2 = guild.roles.cache.get("736021447314505788");
  let group3 = guild.roles.cache.get("736021451320328216");
  let group4 = guild.roles.cache.get("736021455707439267");
  let group5 = guild.roles.cache.get("736021459272466582");

  let random = groups[Math.floor(Math.random() * groups.length)];

  if (!args[0]) {
    return message.channel.send(
      "You can do either, `c!Group Join` or `c!Group Leave`"
    );
  }

  if (args[0].toLowerCase() === "leave") {
    if (!info.group) {
      return message.channel.send(
        `Sorry, ${message.author} But you're not in a group, if you wish to join a group do: \`c!Group Join\``
      );
    }

    let role = info.group;

    if (role === "group-1") {
      member.roles.remove(group1, "User requested to leave a group!");
    }

    if (role === "group-2") {
      member.roles.remove(group2, "User requested to leave a group!");
    }

    if (role === "group-3") {
      member.roles.remove(group3, "User requested to leave a group!");
    }

    if (role === "group-4") {
      member.roles.remove(group4, "User requested to leave a group!");
    }

    if (role === "group-5") {
      member.roles.remove(group5, "User requested to leave a group!");
    }

    let level;
    let rank;
    let type = [];

    if (info) {
      level = info.level;
      rank = info.rank;
      let tyar = info.type;
      const isArray = tyar instanceof Array;
      if(isArray) {
        info.type.map(g => type.push(g));
       } else {
        type.push(info.type);
      }
    }

    let data = {
      ID: message.author.id,
      group: "",
      level: level || "",
      rank: rank || "",
      type: type || []
    };

    Mythical.db.set(message.author.id, data);

    let awaiter = await message.channel
      .send(`${message.author} Removing you from ${role} please wait...`)
      .then(m => {
        setTimeout(
          () => m.edit(`${message.author} You have left: ` + role),
          2500
        );
      });
  }

  if (args[0].toLowerCase() === "join") {
    if (info) {
      if (info.group) {
        return message.channel.send(
          `Sorry, ${message.author} But you're already in a group, if you wish to leave your group do: \`c!Group Leave\``
        );
      }
    }

    if (random === "group-1") {
      member.roles.add(group1, "User requested to join a group!");
    }

    if (random === "group-2") {
      member.roles.add(group2, "User requested to join a group!");
    }

    if (random === "group-3") {
      member.roles.add(group3, "User requested to join a group!");
    }

    if (random === "group-4") {
      member.roles.add(group4, "User requested to join a group!");
    }

    if (random === "group-5") {
      member.roles.add(group5, "User requested to join a group!");
    }

    let level;
    let rank;
    let type = [];

    if (info) {
      level = info.level;
      rank = info.rank;
      let tyar = info.type;
      const isArray = tyar instanceof Array;
      if(isArray) {
        info.type.map(g => type.push(g));
       } else {
        type.push(info.type);
      }
    }

    let data = {
      ID: message.author.id,
      group: random,
      level: level || "",
      rank: rank || "",
      type: type || ""
    };

    Mythical.db.set(message.author.id, data);

    let awaiter = await message.channel
      .send(`${message.author} Getting you a group to join please wait...`)
      .then(m => {
        setTimeout(
          () => m.edit(`${message.author} You have joined: ` + random),
          2500
        );
      });
  }
};

exports.help = {
  name: "group",
  description: "Updates an unset moderator action.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: []
};
