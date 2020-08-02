exports.run = async (Mythical, message, args) => {
  if (!Mythical.Staff.includes(message.author.id))
    return;
    
  let msg = args.join(" ");
  if (!msg) return message.channel.send("I need something to say!");

  message.delete({ reason: "Delete command after use" });

  await message.channel.send(`${msg}`);
};

exports.help = {
  name: "say",
  description: "Updates an unset moderator action.",
  usage: "say <args>"
};

exports.conf = {
  Aliases: []
};