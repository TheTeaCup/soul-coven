const { MessageEmbed } = require("discord.js");
const fileTypeRe = /\.(jpe?g|png|gif)$/i;

exports.run = async (client, msg, args) => {
  if (client.Developers.includes(msg.author.id)) {
  } else {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.channel
        .send("**| You don't have `ADMINISTRATOR` perms.**")
        .then(m => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
  }

  msg.channel
    .send(
      `What would you like to do? respond with the underlined text.\n\n__disableembed__ - (**Disables embed and enables normal mode instead**)\n__setchannel__ - (**set the channel where welcome messages should be sent in**)\n__setmessage__ - (**set the message youd like them to receive when they join**)\n__setdm__ - (**allows you to set it to dm the users that join instead of sending in a channel**)\n\n***__Things that you can type which will replace into other stuff__***\n{user} will @user\n{members} will show membercount\n{usertag} will say the users tag\n{userid} will show the users id\n{servername} will show the servers name\n\n\`This message will be deleted in 30 seconds\`.`
    )
    .then(m => {
      setTimeout(() => {
        m.delete();
      }, 30000);
    });

  let choice = await msg.channel.awaitMessages(
    res => res.author.id === msg.author.id,
    {
      max: 1,
      time: 30000
    }
  );

  if (!choice.size)
    return msg.channel
      .send(
        `I did not get a correct response, make sure you wrote one of the options I provided. The prefix ! should not be used while choosing an option.`
      )
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 8000);
      });

  if (choice.first().content.toLowerCase() === "setchannel") {
    msg.channel.send(
      "Please reply with either the `name` `id` or `#channel` to set."
    );
    let channelContent = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    let channel =
      msg.guild.channels.cache.get(
        channelContent.first().content.toLowerCase()
      ) ||
      msg.guild.channels.cache.find(
        c => c.name === channelContent.first().content.toLowerCase()
      ) ||
      channelContent.first().mentions.channels.first();

    msg.channel
      .send(
        `Successfully updated welcome logging to ${client.channels.cache.get(
          channel.id
        )} :thumbsup:`
      )
      .then(m =>
        setTimeout(() => {
          m.delete();
        }, 6000)
      );
    client.settings.set(msg.guild.id, channel.id, "welcomechannel");
  } else if (choice.first().content.toLowerCase() === "setmessage") {
    msg.channel
      .send(
        "Would you like the message to be embedded or just normal. type `normal` or `embed`"
      )
      .then(m => m.delete({ timeout: 30000 }));
    let messageChoice = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    if (!messageChoice.size)
      return msg
        .reply("Did not get a response within 30 seconds.")
        .then(m => m.delete({ timeout: 5000 }));
    if (messageChoice.first().content.toLowerCase() === "embed") {
      let embed = new MessageEmbed();
      msg.channel
        .send(
          "Please provide me with a valid title, it can not exceed **256** characters. (if none then type `none`)"
        )
        .then(m => m.delete({ timeout: 30000 }));
      let title = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 30000
        }
      );
      if (!title.size)
        return msg
          .reply("did not get a valid title within 30 seconds.")
          .then(m => m.delete({ timeout: 5000 }));
      if (title.first().content.length > 256)
        return msg
          .reply("title can not exceed `256` characters, please try again.")
          .then(m => m.delete({ timeout: 5000 }));
      if (title !== "none") embed.setTitle(title.first().content);

      msg.channel
        .send(
          "Now provide me with a valid description, it can not exceed **2048** characters. (if none then type `none`)"
        )
        .then(m => m.delete({ timeout: 120000 }));
      let description = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 120000
        }
      );
      if (!description.size)
        return msg
          .reply("did not get a valid description within 120 seconds.")
          .then(m => m.delete({ timeout: 5000 }));
      if (description.first().content.length > 2048)
        return msg
          .reply(
            "description can not exceed `2048` characters, please try again."
          )
          .then(m => m.delete({ timeout: 5000 }));
      if (description !== "none")
        embed.setDescription(description.first().content);

      msg.channel
        .send(
          "Now provide me with a valid image **URL**. (if none then type `none`)"
        )
        .then(m => m.delete({ timeout: 60000 }));
      let image = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 60000
        }
      );
      if (!image.size)
        return msg
          .reply("did not get a valid description within 120 seconds.")
          .then(m => m.delete({ timeout: 5000 }));
      let testing = false;
      if (image.first().content === "none") {
        testing = true;
      } else if (image.first().content !== "none") {
        testing = false;
        embed.setImage(image.first().content);
      }
      if (!fileTypeRe.test(image.first().content) && !testing)
        return msg
          .reply("that was not a valid URL, please specify a valid URL.")
          .then(m => m.delete({ timeout: 5000 }));

      msg.channel
        .send(
          "Now provide me with a valid color, either HEX color or just a normal name of a color, for random color type `RANDOM`."
        )
        .then(m => m.delete({ timeout: 30000 }));
      let color = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 30000
        }
      );
      if (!color.size)
        return msg
          .reply("did not get a valid color within 30 seconds. ")
          .then(m => m.delete({ timeout: 5000 }));

      embed.setColor(color.first().content);

      msg.channel
        .send(
          "Now provide me with a valid footer, it can not exceed **2048** characters. (if none then type `none`)"
        )
        .then(m => m.delete({ timeout: 60000 }));
      let footer = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 60000
        }
      );
      if (!footer.size)
        return msg
          .reply("did not get a valid footer within 60 seconds.")
          .then(m => m.delete({ timeout: 5000 }));
      if (footer.first().content.length > 2048)
        return msg
          .reply("footers can not exceed `2048` characters, please try again.")
          .then(m => m.delete({ timeout: 5000 }));
      if (footer.first().content !== "none")
        embed.setFooter(footer.first().content);

      client.settings.set(
        msg.guild.id,
        footer.first().content,
        "welcomemessage.1.footer"
      );
      client.settings.set(
        msg.guild.id,
        description.first().content,
        "welcomemessage.1.description"
      );
      client.settings.set(
        msg.guild.id,
        image.first().content,
        "welcomemessage.1.image"
      );
      client.settings.set(
        msg.guild.id,
        color.first().content,
        "welcomemessage.1.color"
      );
      client.settings.set(
        msg.guild.id,
        title.first().content,
        "welcomemessage.1.title"
      );
      client.settings.set(msg.guild.id, true, "welcomemessage.1.embed");
      msg.channel.send(embed);
      return;
    } else if (messageChoice.first().content.toLowerCase() === "normal") {
      msg.channel.send(
        "Please respond to this message with the message youd like the users to get when they join the server."
      );
      let joinMessage = await msg.channel.awaitMessages(
        res => res.author.id === msg.author.id,
        {
          max: 1,
          time: 60000
        }
      );

      if (!joinMessage.size)
        return msg.reply("did not get a valid response within 60 seconds.");
      if (joinMessage.first().content.length > 2048)
        return msg.channel.send("Message can not exceed 2048 characters.");

      client.settings.set(
        msg.guild.id,
        joinMessage.first().content,
        "welcomemessage.0.message"
      );
      msg.reply("Successfully updated the message :thumbsup:");
      return;
    }
  } else if (choice.first().content.toLowerCase() === "disableembed") {
    if (client.settings.get(msg.guild.id, "welcomemessage.1.embed")) {
      client.settings.set(msg.guild.id, false, "welcomemessage.1.embed");
      msg.reply("Disabled embed welcome message.");
      return;
    } else if (!client.settings.get(msg.guild.id, "welcomemessage.1.embed")) {
      client.settings.set(msg.guild.id, true, "welcomemessage.1.embed");
      msg.reply("Enabled embed welcome message.");
      return;
    }
  } else if (choice.first().content.toLowerCase() === "setdm") {
    if (client.settings.get(msg.guild.id, "welcomechannel") !== "dm") {
      client.settings.set(msg.guild.id, "dm", "welcomechannel");
      msg.channel.send("Enabled the welcome messages to be sent in DMs.");
      return;
    } else if (client.settings.get(msg.guild.id, "welcomechannel") === "dm") {
      client.settings.set(msg.guild.id, "none", "welcomechannel");
      msg.channel.send("Disabled the welcome messages to be sent in DMs.");
      return;
    }
  }
};

exports.help = {
  name: "welcome",
  usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
};

exports.conf = {
  Aliases: ["w"]
};