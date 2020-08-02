const Discord = require("discord.js");
var DanBotHosting = require("danbot-hosting");
const cron = require(`node-cron`);

module.exports = async Mythical => {
  console.log("[ Coven ] Connected to Discord.");
  
  const API = new DanBotHosting.Client("danbot-lljx2j", Mythical);
  
  let initalPost = await API.autopost();
 
  if (initalPost) {
    console.error(initalPost); // console the error
  }

  Mythical.user
    .setActivity(`Witches Soul · c!help`, {
      type: "WATCHING"
    })
    .catch(console.error);

  let guild = Mythical.guilds.cache.get("734953770961600593");

  // Save the current collection of guild invites.
  guild.fetchInvites().then(guildInvites => {
    Mythical.invites = guildInvites;
  });

  //Dashboard Owner Sync
  Mythical.appInfo = await Mythical.fetchApplication();

  setInterval(async () => {
    Mythical.appInfo = await Mythical.fetchApplication();
  }, 60000);
  
require("../RoleReactionClient.js")(Mythical);
//require("../ticket-manager.js")(Mythical);
require("../StarBoard.js")


// schedules

  cron.schedule("*/5 * * * *", function() { // channels
    require(process.cwd() + "/src/Jobs/channels.js")(Mythical);
  });
  
  cron.schedule("0 * * * *", function() { // roles
    console.log("Role updates!")
  //  require(process.cwd() + "/src/Jobs/roles.js")(Mythical);
  });


};