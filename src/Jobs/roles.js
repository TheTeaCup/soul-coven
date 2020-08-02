module.exports = async Mythical => {
  let Guild = Mythical.guilds.cache.get("734953770961600593");

  let Bot = Guild.roles.cache.get("735315694354301018");
  let Witchling = Guild.roles.cache.get("735264917577269321");
  let Base = Guild.roles.cache.get("736017005672530141");

  try {
    Guild.members.cache.map(member => {
    // console.log(member)
     let ID = member.user.id
     let info = Mythical.db.get(ID)
      if (member.user.bot) {
        // bot functions
        
        let bRoles = [];
        bRoles.push(Bot);
         
        member.roles.add(bRoles, "Automatic Role Updates")
      } else {
        // user functions
        
        let uRoles = [];
        uRoles.push(Witchling);
        uRoles.push(Base);
        
      //  member.roles.add(uRoles, "Automatic Role Updates")
      }
    });
  } catch (e) {
      console.log(`[Jobs Error (SetRoles) ] - Error: \n ${e}`);
      Mythical.channels.cache.get("735347186090377265").send(`[Jobs Error ( SetRoles ) ] - Error: \n ${e}`)
  }
};
