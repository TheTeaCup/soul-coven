async function channels(Mythical) {
  console.log("Soul Coven (Bot) Editing Channels.");

  let guilds = Mythical.guilds.cache.get("734953770961600593");
  let channel = Mythical.channels.cache.get("735320241076174899"); //member count channel
  let users = Number(guilds.memberCount);
  channel.edit({ name: `members: ${users.toLocaleString()}` });

  let channel2 = Mythical.channels.cache.get("735305678511538327"); // welcome-log
  channel2.setTopic(`**Total Members**: ${users.toLocaleString()}`);

  let channel3 = Mythical.channels.cache.get("751849947334443008"); // boost count channel
  channel3.edit({ name: `boosters: ${guilds.premiumSubscriptionCount}` });
}

module.exports = channels;
