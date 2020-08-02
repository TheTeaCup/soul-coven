async function channels(Mythical) {
  console.log("Soul Coven (Bot) Editing Channels.");
  
    let guilds = Mythical.guilds.cache.get("734953770961600593");
    let channel = Mythical.channels.cache.get("735320241076174899"); //member count channel
    let users = Number(guilds.memberCount)
    channel.edit({ name: `Members: ${users.toLocaleString()}` });

    let channel2 = Mythical.channels.cache.get("735305678511538327"); // welcome-log
    channel2.setTopic(
      `**Total Members**: ${users.toLocaleString()}`
    );
}

module.exports = channels;
