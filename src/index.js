const Coven = require("./Bot/CovenClient.js");
global.settings = require("./settings.json");
const Quick = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const xp = require("../xp.json");

require("./Web/index.js");

Coven.on("message", async message => {
  // eslint-disable-line
  if (message.channel.type != "text") return;
  
  if(message.channel.id === "737183757592821800")return; //nsfw channel
  
  const SwearWords = [
    "nigger",
    "nigga",
    "cunt",
    "fag",
    "faggot",
    "dick",
    "cock",
    "pussy",
    "slut",
    "bastard",
  ];

  const AutoModAll = "yes";
  if (Coven.Staff.includes(message.author.id)) {
    return;
  }

  if (AutoModAll === "yes") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      return;
    }
    if (Coven.Staff.includes(message.author.id)) {
      return;
    }

        if (SwearWords.some(Word => message.content.toLowerCase().includes(Word))){
        message.delete().catch(O_o => {});
        message.channel.send("No swearing please!");
        
        let warns = Quick.get(`userWarnings_${message.author.id}`);
        if(warns) {
            warns = Number(warns) + 1
        } else {
            warns = 1
        };
      
        Quick.set(`userWarnings_${message.author.id}`, warns);
        Quick.push(`warnreasons.${message.author.id}`, "Swearing");
      };  

    if (
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+/.test(
        message.content.toLowerCase()

      )
    ) {
      message.delete().catch(O_o => {});
      
        let warns = Quick.get(`userWarnings_${message.author.id}`);
        if(warns) {
            warns = Number(warns) + 1
        } else {
            warns = 1
        }

       Quick.set(`userWarnings_${message.author.id}`, warns);
       Quick.push(`warnreasons.${message.author.id}`, "Invite");
      message.channel.send("No invite links!");
    }

    /* if (/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/.test(message.content.toLowerCase())){
        message.delete().catch(O_o => {});
        
        Quick.add(`userWarnings_${message.author.id}`, 1)
        Quick.push(`warnreasons.${message.author.id}`, "Link Detection.");
        
        Coven.channels.cache.get('735347186090377265').send(`**${message.author.tag}(${message.author.id})** tried sending the following in **${message.guild.name}**:\n${message.content}\n\n**Deleted the content and gave this user a warning.**`);
      }; */
  }
});

  Coven.on("message", async msg => {
  if (msg.author.bot) return;
  const addXp = Math.floor(Math.random() * 14);
  if (!xp[msg.author.id]) {
    xp[msg.author.id] = {
      xp: 0,
      level: 1,
      totalXp: 0
    };
  }
  xp[msg.author.id].xp = xp[msg.author.id].xp + addXp;
  xp[msg.author.id].totalXp = xp[msg.author.id].xp;
  let level = xp[msg.author.id].level * 40;
  if (xp[msg.author.id].xp >= level) {
    xp[msg.author.id].xp = 0;
    xp[msg.author.id].level++;
    msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Level up!")
        .setColor(Cove.Color)
        .setDescription(
          `Congratulations! ${msg.author.username} you have leveled up to level ${xp[msg.author.id].level}!`
        )
    );
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), err => {
    if (err) console.log(err);
  });
});

Coven.login(settings.TOKEN);