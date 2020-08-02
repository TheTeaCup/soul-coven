const fs = require("fs");

function EventHandler(Mythical) {
  fs.readdir("./src/Bot/Events/", (err, files) => {
    if (err) {
     return console.log(
        `[ MBL ] Found an error while loading Mythical's Commands.\n${err.stack}`
      );
    }

    files.forEach(file => {
      if (!file.endsWith(".js")) {
        return undefined;
      }

      const event = require(`../Events/${file}`);
      let eventName = file.split(".")[0];

      Mythical.on(eventName, event.bind(null, Mythical));
      delete require.cache[require.resolve(`../Events/${file}`)];
    });
  });
}

module.exports = EventHandler;