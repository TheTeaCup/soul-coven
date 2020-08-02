const fs = require("fs");

function CommandHandler(Mythical) {
  fs.readdir("./src/Bot/Commands/", (err, files) => {
    if (err) {
     return console.log(
        `[ MBL ] Found an error while loading Mythical's Commands.\n${err.stack}`
      );
    }

    let jsfiles = files.filter(f => f.split(".").pop() == "js");

    if (jsfiles.length <= 0) {
      console.log("[ MBL ] No Commands to load.");
    }

    jsfiles.forEach(f => {
      let props = require(process.cwd() + `/src/Bot/Commands/${f}`);

      Mythical.Commands.set(props.help.name, props);
      props.conf.Aliases.forEach(Alias => {
        Mythical.Aliases.set(Alias, props.help.name);
      });
    });
  });
}

module.exports = CommandHandler;