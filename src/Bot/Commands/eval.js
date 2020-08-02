const Discord = require("discord.js");

exports.run = async (Mythical, message, args) => {
  if (!Mythical.Developers.includes(message.author.id)) {
    return undefined;
  }

  if (!args[0]) {
    return message.channel
      .send("Please provide code to **`Evaluate`**.")
      .then(msg => msg.delete({ timeout: 5000 }));
  }

  const Code = args.join(" ");
  try {
    let Evaled = eval(Code);

    if (typeof Evaled !== "string");
    Evaled = require("util").inspect(Evaled);

    const EvalEmbed = new Discord.MessageEmbed()
      .setTitle("**Evaluation**")
      .setColor(Mythical.Color)
      .addField("**Input**", `\`\`\`js\n${Code}\n\`\`\``)
      .addField(
        "**Output**",
        `\`\`\`js\n${clean(Evaled).replace(Mythical.token, "MBL")}\n\`\`\``
      )
      .setFooter(`Evaluated by ${message.author.tag}.`);

    if (Evaled.length > 800) {
      console.log(clean(Evaled).replace(Mythical.token, "MBL"));

      return message.channel.send(
        "Output was too big, please check the console."
      );
    } else {
      return message.channel.send(EvalEmbed);
    }
  } catch (err) {
    const ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**Evaluation**")
      .setColor(Mythical.Color)
      .addField("**Input**", `\`\`\`js\n${Code}\n\`\`\``)
      .addField("**Output**", `\`\`\`js\n${clean(err)}\n\`\`\``)
      .setFooter(`Evaluated by ${message.author.tag}.`);

    return message.channel.send(ErrorEmbed);
  }

  function clean(text) {
    if (typeof text === "string") {
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  }
};

exports.help = {
  name: "eval",
  description: "Evaluate some code in javascript.",
  usage: "m!Eval <Value>"
};

exports.conf = {
  Aliases: []
};