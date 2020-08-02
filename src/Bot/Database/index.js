/* Database */
const enmap = require("enmap");
//const enmapSQLite = require("enmap-sqlite");

module.exports = Mythical => {
  console.log("[Coven] (Bot) Database Up!");
  
  Mythical.db = new enmap({ name: "database" });
  
  Mythical.AllowedChannels = new enmap({ name: "channels" });
  
  Mythical.types = new enmap({ name: "types" });
  
 }