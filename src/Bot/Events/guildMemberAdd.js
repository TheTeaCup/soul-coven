const Discord = require("discord.js");

module.exports = async (Mythical, member) => {
  if (member.guild.id === settings.guild) {
    // Check if it's soul coven.

    let data = {
      ID: member.user.id,
      group: "",
      level: "",
      rank: ""
    };

    Mythical.db.set(member.user.id, data);

    console.log(`New member! User: ${member.user.tag} (${member.user.id})`);

    const botRole = member.guild.roles.cache.get("735315694354301018"); // Get all the roles by id.
    const blankRole = member.guild.roles.cache.get("736017005672530141");
    const memberRole = member.guild.roles.cache.get("735264917577269321");
    let channel2 = Mythical.channels.cache.get("735305678511538327"); // welcome-log

    if (member.user.bot) {
      // Check if the user is a bot or not.
      if (!botRole) {
        // If there is no botRole, return.
        return;
      }

      member.roles
        .add(botRole, "Auto assigned role")
        .catch(e => console.log(e)); // Add the bot role to the bot.

      channel2.send("More bot friends! Welcome " + member.user);
    } else {
      /*if (!blankRole) {
        // If there is no blankRole, return.
        return;
      }*/

      /*  channel2.send(
        `Welcome ${member.user} to ${member.guild.name}! \n Please read the pinned messages in: <#735278587929821194> \n Introduce your self in <#735291074091679855> \n And get some roles in: <#735306323163611217>`
      ); */

      let channelEmbed = new Discord.MessageEmbed()
        .setColor("#cd00cd")
        .setTitle("Welcome to Soul Coven!")
        .setDescription(
          `
      hi **${member.user.tag}**, you are our ${getNumberWithOrdinal(
            member.guild.memberCount
          ).toLocaleString()}
      Please visit the following channels for:
      Introductions: <#735291074091679855>
      Rules: <#735309636051271770>
      Roles: <#735306323163611217>
      Tabel of Contents: <#759172408694407239>
      `
        )
        .setThumbnail(member.user.avatarURL());

      channel2.send(`<@${member.user.id}>`, { embed: channelEmbed });

      let Roles = [];
      Roles.push(blankRole);
      Roles.push(memberRole);
      member.roles.add(Roles, "Auto assigned role").catch(e => console.log(e)); // Adds the roles to the user.
      addInv(Mythical, member);
    }
  } else {
    if (member.user.bot) return;
    let client = Mythical;
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
  }
};

async function addInv(client, member) {
  let inviteField = "Unknown";
  // Check which invite was used.
  const guildInvites = await member.guild.fetchInvites();
  // Existing invites
  const ei = client.invites;
  // Update cached invites
  client.invites = guildInvites;
  // Discover which invite was used
  const invite = guildInvites.find(i => {
    if (!ei.has(i.code)) {
      // This is a new code, check if it's used.
      return i.uses > 0;
    }
    // This is a cached code, check if it's uses increased.
    return ei.get(i.code).uses < i.uses;
  });
  // If invite isn't valid, that most likely means the vanity URL was used so default to it.
  if (invite) {
    // Inviter
    const inviter = client.users.cache.get(invite.inviter.id);
    inviteField = `${invite.code} from ${inviter.tag} (${inviter.id}) with ${invite.uses}`;
  } else {
    // Vanity URL was used
    inviteField = "Vanity URL";
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("User Joined")
    .setColor(client.Color)
    .setThumbnail(
      "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/mail-128.png"
    )
    .setDescription(`**${member.user.tag}**\`(${member.user.id})\` has joined!`)
    .addField(
      "User Info",
      `**Creation:** \`${member.user.createdAt.toDateString()}\`\n**Bot:** \`${
        member.user.bot ? "Yes" : "No"
      }\``
    )
    .addField("**Invite Used**", inviteField, true);

  client.channels.cache.get("735321294580482088").send(embed);
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}