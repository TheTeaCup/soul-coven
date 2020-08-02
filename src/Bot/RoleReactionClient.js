const { MessageEmbed, Emoji, MessageReaction } = require("discord.js");
const CONFIG = require("../settings.json");

module.exports = Mythical => {
  let client = Mythical;
  console.log("[Coven] (Bot) Role reaction enabled.");

  let guild = Mythical.guilds.cache.get("734953770961600593");

  // Function to generate the role messages, based on your settings
  function generateMessages() {
    return CONFIG.roles.map((r, e) => {
      return {
        role: r,
        message: `React below to get the **"${r}"** role!`, //DONT CHANGE THIS,
        emoji: CONFIG.reactions[e]
      };
    });
  }

  // Function to generate the embed fields, based on your settings and if you set "const embed = true;"
  function generateEmbedFields() {
    return CONFIG.roles.map((r, e) => {
      return {
        emoji: CONFIG.reactions[e],
        role: r
      };
    });
  }

  // Handles the creation of the role reactions. Will either send the role messages separately or in an embed
  Mythical.on("message", message => {
    // Make sure bots can't run this command
    if (message.author.bot) return;

    // Make sure the command can only be ran in a server
    if (!message.guild) return;

    // We don't want the bot to do anything further if it can't send messages in the channel
    if (
      message.guild &&
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;

    if (
      message.author.id !== CONFIG.yourID ||
      message.content.toLowerCase() !== CONFIG.setupCMD
    )
      return;

    if (CONFIG.deleteSetupCMD) {
      const missing = message.channel
        .permissionsFor(message.guild.me)
        .missing("MANAGE_MESSAGES");
      // Here we check if the bot can actually delete messages in the channel the command is being ran in
      if (missing.includes("MANAGE_MESSAGES"))
        throw new Error(
          "I need permission to delete your command message! Please assign the 'Manage Messages' permission to me in this channel!"
        );
      message.delete().catch(O_o => {});
    }

    const missing = message.channel
      .permissionsFor(message.guild.me)
      .missing("MANAGE_MESSAGES");
    // Here we check if the bot can actually add recations in the channel the command is being ran in
    if (missing.includes("ADD_REACTIONS"))
      throw new Error(
        "I need permission to add reactions to these messages! Please assign the 'Add Reactions' permission to me in this channel!"
      );

    if (!CONFIG.embed) {
      if (!CONFIG.initialMessage || CONFIG.initialMessage === "")
        throw "The 'initialMessage' property is not set in the config.js file. Please do this!";

      message.channel.send(CONFIG.initialMessage);

      const messages = generateMessages();
      for (const { role, message: msg, emoji } of messages) {
        if (!message.guild.roles.find(r => r.name === role))
          throw `The role '${role}' does not exist!`;

        message.channel
          .send(msg)
          .then(async m => {
            const customCheck = message.guild.emojis.find(
              e => e.name === emoji
            );
            if (!customCheck) await m.react(emoji);
            else await m.react(customCheck.id);
          })
          .catch(console.error);
      }
    } else {
      if (!CONFIG.embedMessage || CONFIG.embedMessage === "")
        throw "The 'embedMessage' property is not set in the config.js file. Please do this!";
      if (!CONFIG.embedFooter || CONFIG.embedMessage === "")
        throw "The 'embedFooter' property is not set in the config.js file. Please do this!";

      const roleEmbed = new MessageEmbed()
        .setDescription(CONFIG.embedMessage)
        .setFooter(CONFIG.embedFooter);

      if (CONFIG.embedColor) roleEmbed.setColor(CONFIG.embedColor);

      if (CONFIG.embedThumbnail && CONFIG.embedThumbnailLink !== "")
        roleEmbed.setThumbnail(CONFIG.embedThumbnailLink);
      else if (CONFIG.embedThumbnail && message.guild.icon)
        roleEmbed.setThumbnail(message.guild.iconURL);

      const fields = generateEmbedFields();
      if (fields.length > 25)
        throw "That maximum roles that can be set for an embed is 25!";

      for (const { emoji, role } of fields) {
        if (!guild.roles.cache.find(r => r.name === role))
          throw `The role '${role}' does not exist!`;

        const customEmote = client.emojis.cache.find(e => e.name === emoji);

        if (!customEmote) roleEmbed.addField(emoji, role, true);
        else roleEmbed.addField(customEmote, role, true);
      }

      message.channel.send(roleEmbed).then(async m => {
        for (const r of CONFIG.reactions) {
          const emoji = r;
          const customCheck = client.emojis.cache.find(e => e.name === emoji);

          if (!customCheck) await m.react(emoji);
          else await m.react(customCheck.id);
        }
      });
    }
  });

  // This makes the events used a bit more readable
  const events = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove"
  };

  // This event handles adding/removing users from the role(s) they chose based on message reactions
  client.on("raw", async event => {
    if (!events.hasOwnProperty(event.t)) return;

    let guild = client.guilds.cache.get("734953770961600593");

    const { d: data } = event;
     //console.log(data)
    
    
    const user = client.users.cache.get(data.user_id);
    const channel = client.channels.cache.get(data.channel_id);

    const message = await channel.messages.fetch(data.message_id);
    const member = guild.members.cache.get(user.id);

    const emojiKey = data.emoji.id
      ? `${data.emoji.name}:${data.emoji.id}`
      : data.emoji.name;
    // console.log(message)
    let reaction = message.reactions.cache.get(emojiKey);

    if (!reaction) {
      // Create an object that can be passed through the event like normal
      const emoji = new Emoji(client.guilds.cache.get(data.guild_id), data.emoji);
      reaction = new MessageReaction(
        message,
        emoji,
        1,
        data.user_id === client.user.id
      );
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (
      message.author.id === client.user.id &&
      (message.content !== CONFIG.initialMessage ||
        (message.embeds[0] && embedFooterText !== CONFIG.embedFooter))
    ) {
      if (!CONFIG.embed && message.embeds.length < 1) {
        const re = `\\*\\*"(.+)?(?="\\*\\*)`;
        const role = message.content.match(re)[1];

        if (member.id !== client.user.id) {
          const guildRole = message.guild.roles.cache.find(r => r.name === role);
          if (event.t === "MESSAGE_REACTION_ADD")
            member.roles.remove(guildRole.id),
              member.send(`Removed the role **${guildRole.name}** to you`);
          else if (event.t === "MESSAGE_REACTION_REMOVE")
            member.roles.add(guildRole.id),
              member.send(`Added the role **${guildRole.name}** to you`);
        }
      } else if (CONFIG.embed && message.embeds.length >= 1) {
        const fields = message.embeds[0].fields;

        for (const { name, value } of fields) {
          if (member.id !== client.user.id) {
            const guildRole = message.guild.roles.cache.find(r => r.name === value);
            if (
              name === reaction.emoji.name ||
              name === reaction.emoji.toString()
            ) {
              if (event.t === "MESSAGE_REACTION_ADD")
                member.roles.add(guildRole.id),
                  member.send(`Added the role **${guildRole.name}** to you`);
              else if (event.t === "MESSAGE_REACTION_REMOVE")
                member.roles.remove(guildRole.id),
                  member.send(`Removed the role **${guildRole.name}** to you`);
            }
          }
        }
      }
    }
  });

  process.on("unhandledRejection", err => {
    const msg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
 //  console.error("Unhandled Rejection", msg);
  });
};