/*const blapi = require("blapi");
const wump = require("wumpfetch");*/

async function BotList(Mythical) {
  console.log("Astrology (Bot) Server Count is being sent to BotList's.");
/*
  let keys = {
    "discordextremelist.xyz":
      "DELAPI_2e354cfdafab4d8beaec0b9a3d19568d-675167375858991115",
    "botlist.space":
      "a2cdef59ae9dbd13666f56f539348548840dd07c30eea03fe8928fb73fd32653d37e19130fd0b7809081d6d19100c48e",
    "botsfordiscord.com":
      "0d0998c0d9489453f589c018610eee7c40ff52f110a6cb04b2e4be650077931e2b4fad254d11c2ce34d6e0f46183a863836df66e6e520f95e7e1d8e2e24a0ed5",
    "arcane-center.xyz":
      "3fbe5dc0ce219bf46a33f408f03872d35acd49bd394cecdfc0b44c42484d2c55fe584b7deb4420c4f2d6ee54c7d1d9569801c8d256a0aedec11968b63d903aac",
    "top.gg":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTE2NzM3NTg1ODk5MTExNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4NjIyOTg1fQ.w1YzlYZ79REcQKtZhwHkyiba7iAcESgKuCHyXTtMAL0",
    "mythicalbots.xyz": "e3.peEp0t62o0pCVCyPUEsaHTLBHFM.8EzEGLwheFt16iqYz4g",
    "glennbotlist.xyz": "XA-79213291503440128e2440dd87e70aa3"
  };

  // blapi.setLogging(true);
  blapi.handle(Mythical, keys, 60);

  // for lists without botblock

  try {
    const res = await wump(
      `https://discordlistology.com/api/v1/bots/675167375858991115/stats`,
      {
        method: "POST",
        headers: {
          Authorization:
            "41bdd206a569e31dd36a51fe8952afe3b5c9b3bc74e9f470da908dc5897ff56e01270011fbde9f027034e9b62b68b5c2c84f626cf1f368bef587149bbffb958645cc67bb4610d68c59ebbec8a09d03a16177b1a7d96222a281685dcddcf85464197e9e8ac7f3821e25b1b1efcf63ba4df3de2c9171491ba7dcfd40e5fed5b3f27b7bacdc8a3fbc7d89e807b6c1e12b9650c41e64aa3a5c58c65ee8ec5a1c5b081af179773763b7920f21ef867638299ad0c5d1eba1a188e1df9bcb596c9c965a8cf025d59c28a2c45976dd4c7c6bb8a7fb8b0cbf61413fa92888ad504140e6fc2e8d52ea0a92932b7f94c99fa75992bc07669cf54c498fd63fbd9119eaa9e7a127179347f060a4310076bfcb69ac0c72f90477132c795ae25c746af43b850b3580d416422e565ac9c81cebc7838fcc195629c9f553eab22b58f08d17cd2cd81892fd28a72927dc5a0d18a3c63e108e196e57da27f5d810c54e98c1fb8cb2d722602737718718701b2858c77fe0f4d251f70d344ecc741b8790a2a194d06791cd461148949f39bf08cf7f5161c1f13f864330861ddf54c3018b7cf6a27f78b95d0bf7b94299bec81bda27d9d735fd4504f565fe19567272d619870dcb322306725c0bd93f2c09e747"
        },
        data: { "servers": Mythical.guilds.cache.size }
      }
    ).send();

   // console.log(res.json());
  } catch (e) {
    console.log(
      `Astrology (Bot) We ran into an issue while sending bot stats. \n Error: ${e}`
    );
  }

 try {
    const res = await wump(
      `https://bots.discordlabs.org/v2/bot/675167375858991115/stats`,
      {
        method: "POST",
        headers: {
          Authorization:
            ""
        },
        data: { "token": "discordlabs.org-Up3MQgalvjmAZ044yJjQ",
               "server_count": Mythical.guilds.cache.size }
      }
    ).send();

    //console.log(res.json());
  } catch (e) {} */
  
  
 /* Statcord Things */
let initalPost = await Mythical.Statcord.autopost();

if (initalPost) {
    console.log(initalPost);
}


}
module.exports = BotList;