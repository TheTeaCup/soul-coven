/* Database */
const enmap = require("enmap");

module.exports = Mythical => {
  console.log("[Coven] (Bot) Database Up!");
  
  Mythical.db = new enmap({ name: "database" });
  
  Mythical.AllowedChannels = new enmap({ name: "channels" });
  
  Mythical.types = new enmap({ name: "types" });
  
  Mythical.applications = new enmap({ name: "staff-apps" });
  
  Mythical.settings = new enmap({ name: "user-settings" });
  
  Mythical.forum = new enmap({ name: "forums" });
  
  Mythical.news = new enmap({ name: "news" });
  
 };
