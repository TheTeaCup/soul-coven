const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  if (!Mythical.Staff.includes(message.author.id)) {
    return message.channel.send(
      "Sorry but this command is lock to the `Staff Team`!"
    );
  }

  let Target = args[0];
  if (message.mentions.users.first()) {
    let t = message.mentions.users.first();
    Target = t.id;
  }
  if (!Target) return message.channel.send("Please give an user to edit.");

  let guild = Mythical.guilds.cache.get("734953770961600593");
  let member = guild.members.cache.get(Target);
  if (!member)
    return message.channel.send("The user you gave is not in this server.");

  let b = guild.roles.cache.get("736245013670920292"); // Baby-Witch
  let int = guild.roles.cache.get("735183730867437641"); // Intermediate Witch
  let ex = guild.roles.cache.get("735265030014107718"); // Experienced Witch
  let psy = guild.roles.cache.get("737923377506943016"); // Psychic Medium
  let info = Mythical.db.get(Target);

  let group;
  let rank;
  let type = [];

  if (info) {
    level = info.level;
    group = info.group;
    rank = info.rank;
    let tyar = info.type;
    const isArray = tyar instanceof Array;
    if(isArray) {
        info.type.map(g => type.push(g));
    } else {
        type.push(info.type);
    }
  }

  if (!args[1]) {
    let embed = new Discord.MessageEmbed()
      .setColor(Mythical.Color)
      .setTitle("User Changing Panel")
      .setDescription("Please specify what you'd like to change with a user.")
      .addField(
        "Wanna change their rank to `Baby-Witch`?",
        "Well do: `c!Edit @user/ID 1`"
      )
      .addField(
        "Wanna change their rank to `Intermediate Witch`?",
        "Well do: `c!Edit @user/ID 2`"
      )
      .addField(
        "Wanna change their rank to `Experienced Witch`?",
        "Well do: `c!Edit @user/ID 3`"
      )
      .addField("Wann change their rank to `Psychic Medium`","Well do: `c!Edit @user/ID 4`")
    return message.channel.send(embed);
  }

  if (args[1].toLowerCase() === "1") {
    if (member.roles.cache.has(b.id)) {
      member.roles.remove(b, "admin requested");
      message.channel.send(`Removed: <@${Target}> as a \`Baby Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: ""
      };

      Mythical.db.set(Target, data);
    } else {
      member.roles.add(b, "admin requested");
      message.channel.send(`Added: <@${Target}> as a \`Baby Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: "baby-witch"
      };

      Mythical.db.set(Target, data);
    }
  }

  if (args[1].toLowerCase() === "2") {
    if (member.roles.cache.has(int.id)) {
      member.roles.remove(int, "admin requested");
      message.channel.send(`Removed: <@${Target}> as a \`Intermediate Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: ""
      };

      Mythical.db.set(Target, data);
    } else {
      member.roles.add(int, "admin requested");
      message.channel.send(`Added: <@${Target}> as a \`Intermediate Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: "intermediate-witch"
      };

      Mythical.db.set(Target, data);
    }
  }

  if (args[1].toLowerCase() === "3") {
    if (member.roles.cache.has(ex.id)) {
      member.roles.remove(ex, "admin requested");
      message.channel.send(`Removed: <@${Target}> as a \`Experienced Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: ""
      };

      Mythical.db.set(Target, data);
    } else {
      member.roles.add(ex, "admin requested");
      message.channel.send(`Added: <@${Target}> as a \`Experienced Witch\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: "experienced-witch"
      };

      Mythical.db.set(Target, data);
    }
  }
  
  if (args[1].toLowerCase() === "4") {
    if (member.roles.cache.has(ex.id)) {
      member.roles.remove(psy, "admin requested");
      message.channel.send(`Removed: <@${Target}> as a \`Psychic Medium\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: ""
      };

      Mythical.db.set(Target, data);
    } else {
      member.roles.add(psy, "admin requested");
      message.channel.send(`Added: <@${Target}> as a \`Psychic Medium\``);

      let data = {
        ID: Target,
        group: group || "",
        level: level || "",
        type: type || [],
        rank: "psychic-medium"
      };

      Mythical.db.set(Target, data);
    }
  }
  
};

exports.help = {
  name: "edit",
  description: "Change a users permissions.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: ["e"]
};
