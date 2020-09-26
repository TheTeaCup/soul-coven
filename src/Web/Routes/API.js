const Router = require("express").Router();
const passport = require("passport");
const Discord = require("discord.js");
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const fetch = require("node-fetch");


/**
 * Main API route
 */
Router.get("/", async (req, res) => {
  res.json({
    api: "n/a"
  });
});


Router.get("/user", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.isAuthenticated() ? req.user : null });
  } else {
    return res.json({ user: null });
  }
});

Router.get("/flash", async (req, res) => {
    res.send(req.flash());
})


Router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/404" }),
  (req, res) => {
    //console.log(`Testing: ` + req.query.state);
    //  addUser(req.user);
    if (Coven.Developers.includes(req.user.id)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    
    let red = req.query.state;
    if(!red) red = "/me"
    res.redirect(red);
    
    let info = Coven.settings.get(req.user.id)
if (info) {
    let data = {
        ID: req.user.id,
        lastLogin: Date.now()
    }
    Coven.settings.set(req.user.id, data)
} else {
    let data = {
        ID: req.user.id,
        lastLogin: Date.now()
    }  
    Coven.settings.set(req.user.id, data)
}

    let UserLoginEmbed = new Discord.MessageEmbed()
      .setColor(Coven.Color)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.gif`
      )
      .setDescription(
        `${req.user.username}#${req.user.discriminator} Just logged in!`
      );
    //Coven.channels.get("595314158958805003").send(UserLoginEmbed)
  }
);

Router.use("*", (req, res) => {
  res
    .status(404)
    .json({ error: true, status: 404, message: "Endpoint not found" });
});

Router.use("*", (err, req, res) => {
  res
    .status(404)
    .json({ error: true, status: 404, message: "Endpoint not found" });
});

module.exports = Router;

/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.backURL = req.url;

    res.redirect("/login?redirect=/me");
  }
}