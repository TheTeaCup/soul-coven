const Coven = require("./Bot/CovenClient.js");
global.settings = require("./settings.json");
const Quick = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");

require("./Web/index.js");

Coven.on("message", async message => {
  // eslint-disable-line
  if (message.channel.type != "text") return;

  if (message.channel.id === "737183757592821800") return; //nsfw channel
  if (message.guild.id === "740394516640563244") return; //not needed

  const SwearWords = [
    "nigger",
    "nigga",
    "cunt",
    "fag",
    "faggot",
    "dick",
    "cock",
    "pussy",
    "slut",
    "bastard"
  ];

  const AutoModAll = "yes";
  if (Coven.Staff.includes(message.author.id)) {
    return;
  }

  if (AutoModAll === "yes") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      return;
    }
    if (Coven.Staff.includes(message.author.id)) {
      return;
    }

    if (SwearWords.some(Word => message.content.toLowerCase().includes(Word))) {
      message.delete().catch(O_o => {});
      message.channel.send("No swearing please!");

      let warns = Quick.get(`userWarnings_${message.author.id}`);
      if (warns) {
        warns = Number(warns) + 1;
      } else {
        warns = 1;
      }

      Quick.set(`userWarnings_${message.author.id}`, warns);
      Quick.push(`warnreasons.${message.author.id}`, "Swearing");
    }

    if (
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+/.test(
        message.content.toLowerCase()
      )
    ) {
      if (message.channel.id === "744001687307550721") return; // ad channel
      message.delete().catch(O_o => {});

      let warns = Quick.get(`userWarnings_${message.author.id}`);
      if (warns) {
        warns = Number(warns) + 1;
      } else {
        warns = 1;
      }

      Quick.set(`userWarnings_${message.author.id}`, warns);
      Quick.push(`warnreasons.${message.author.id}`, "Invite");
      message.channel.send("No invite links!");
    }

    /* if (/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/.test(message.content.toLowerCase())){
        message.delete().catch(O_o => {});
        
        Quick.add(`userWarnings_${message.author.id}`, 1)
        Quick.push(`warnreasons.${message.author.id}`, "Link Detection.");
        
        Coven.channels.cache.get('735347186090377265').send(`**${message.author.tag}(${message.author.id})** tried sending the following in **${message.guild.name}**:\n${message.content}\n\n**Deleted the content and gave this user a warning.**`);
      }; */
  }
});

let cooldown = new Set();

Coven.on("message", msg => {
  if (msg.channel.type == "dm") return;

  Coven.settings.ensure(msg.guild.id, {
    roles: [],
    prefix: "c!",
    messageroles: [],
    levelsystem: true,
    message: "Not set",
    channel: 0,
    xpgain: [{ first: 0, second: 30 }],
    noxproles: [],
    noxpchannels: [],
    userchannels: [],
    userchannelcreate: { category: "none", channel: "none" },
    antiinvite: false,
    roleschannel: "none",
    imagechannel: [],
    doublexproles: [],
    welcomeroles: [],
    welcomechannel: "none",
    welcomemessage: [
      { message: "none" },
      {
        title: "none",
        description: "none",
        image: "none",
        footer: "none",
        color: "none",
        embed: false
      }
    ]
  });

  if (msg.author.bot) return;

  Coven.profile.ensure(`${msg.guild.id}-${msg.author.id}`, {
    id: msg.author.id,
    guild: msg.guild.id,
    level: 0,
    levelpoints: 0,
    lastMessage: "none",
    name: msg.author.tag
  });

  if (!Coven.profile.has(`${msg.guild.id}-${msg.author.id}`, "lastMessage")) {
    Coven.profile.set(
      `${msg.guild.id}-${msg.author.id}`,
      "none",
      "lastMessage"
    );
  }

  let points = Math.floor(Math.random(0) * 30);
  let randomcooldown = Math.floor(Math.random() * 8000) + 5000;
  if (cooldown.has(`${msg.author.id}-${msg.guild.id}`)) {
    points = 0;
  } else if (
    Coven.profile.get(`${msg.guild.id}-${msg.author.id}`, "lastMessage") ===
    msg.content
  ) {
    points = 0;
  }

  Coven.profile.set(
    `${msg.guild.id}-${msg.author.id}`,
    msg.content,
    "lastMessage"
  );

  Coven.profile.set(`${msg.guild.id}-${msg.author.id}`, msg.author.tag, "name");

  if (Coven.settings.get(msg.guild.id, "levelsystem") === false) {
    points = 0;
  }
  Coven.profile.math(
    `${msg.guild.id}-${msg.author.id}`,
    "+",
    points,
    "levelpoints"
  );
  cooldown.add(`${msg.author.id}-${msg.guild.id}`);

  //client.profile.inc(`${msg.guild.id}-${msg.author.id}`, "levelpoints")

  setTimeout(() => {
    cooldown.delete(`${msg.author.id}-${msg.guild.id}`);
  }, randomcooldown);

  const curLevel = Math.floor(
    0.1 *
      Math.sqrt(
        Coven.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")
      ) +
      1
  );

  const { MessageEmbed } = require("discord.js");
  if (
    Coven.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") < curLevel
  ) {
    let message = Coven.settings.get(msg.guild.id, "message");
    let channel = Coven.settings.get(msg.guild.id, "channel");

    if (!channel) channel = msg.channel.id;
    if (message == "Not set")
      message = `{user} has leveled up to level **{level}**! `;
    if (Coven.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") === 0) {
      Coven.profile.set(`${msg.guild.id}-${msg.author.id}`, 1, "level");
    } else if (
      Coven.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") > 0
    ) {
      Coven.channels.cache
        .get(channel)
        .send(
          message.replace("{user}", msg.author).replace("{level}", curLevel)
        );
    }

    Coven.profile.set(`${msg.guild.id}-${msg.author.id}`, curLevel, "level");

  /*  let array = Coven.settings.get(msg.guild.id, "roles");

    let data = array.findIndex(obj => obj.level === curLevel);
    if (data < 0) return;

    msg.guild.member(msg.author).roles.add(array[data].role);
    msg.channel
      .send(
        "You leveled up to level **" +
          curLevel +
          "** and was rewarded with the role " +
          msg.guild.roles.get(array[data].role).toString() +
          " 👍"
      )
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      }); */
  }
});

let client = Coven;

client.on("guildMemberAdd", member => {
  if (member.user.bot) return;
  let roleArray = client.settings.get(member.guild.id, "welcomeroles");
  if (roleArray.length > 0) {
    for (let d = 0; d < roleArray.length; d++) {
      member.roles.add(roleArray[d]);
    }
  }
  let { MessageEmbed } = require("discord.js");
  let array = client.settings.get(member.guild.id, "welcomemessage");
  let channel = client.settings.get(member.guild.id, "welcomechannel");

  let embed = new MessageEmbed();
  if (array[1].title !== "none")
    embed.setTitle(
      array[1].title
        .replaceAll("{usertag}", member.user.tag)
        .replaceAll("{members}", member.guild.memberCount)
        .replaceAll("{userid}", member.user.id)
        .replaceAll("{servername}", member.guild.name)
    );
  if (array[1].description !== "none")
    embed.setDescription(
      array[1].description
        .replaceAll("{user}", member.user)
        .replaceAll("{usertag}", member.user.tag)
        .replaceAll("{members}", member.guild.memberCount)
        .replaceAll("{userid}", member.user.id)
        .replaceAll("{servername}", member.guild.name)
    );
  if (array[1].image !== "none") embed.setImage(array[1].image);
  if (array[1].footer !== "none")
    embed.setFooter(
      array[1].footer
        .replaceAll("{usertag}", member.user.tag)
        .replaceAll("{members}", member.guild.memberCount)
        .replaceAll("{userid}", member.user.id)
        .replaceAll("{servername}", member.guild.name)
    );
  embed.setColor(array[1].color);

  if (channel === "dm") {
    if (array[1].embed === true) {
      member.send(embed);
      return;
    } else if (array[1].embed === false) {
      member.send(array[0].message);
      return;
    }
  }
  if (!member.guild.channels.cache.get(channel)) return;

  if (array[1].embed === true) {
    client.channels.cache.get(channel).send(embed);
    return;
  } else if (array[1].embed === false) {
    client.channels.cache.get(channel).send(
      array[0].message
        .replaceAll("{user}", member.user)
        .replaceAll("{usertag}", member.user.tag)
        .replaceAll("{members}", member.guild.memberCount)
        .replaceAll("{userid}", member.user.id)
        .replaceAll("{servername}", member.guild.name)
    );
    return;
  }
});
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

Coven.login(settings.TOKEN);