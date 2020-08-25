const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const Discord = require("discord.js");

Router.get("/:ID", async (req, res) => {
  let ID = req.params.ID;
  if (!ID)
    return res.status(404).render("error.ejs", {
      title: "404",
      code: 404,
      message: "No Guild ID was given.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });
  let guild = Coven.guilds.cache.get(ID);
  if (!guild)
    return res.status(404).render("error.ejs", {
      title: "404",
      code: 404,
      message: "No Guild was found.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });

  let data = Coven.profile.filter(p => p.guild === ID).array();
  let d = data.sort((a, b) => b.level - a.level);
  let Page = `${guild.name} - LeaderBoard`;

  if (!data)
    return res.status(404).render("error.ejs", {
      title: "404",
      code: 404,
      message: "No Guild was found.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });

  if (!d)
    return res.status(404).render("error.ejs", {
      title: "404",
      code: 404,
      message: "No Guild was found.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });

  res.render("leaderboard.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    d,
    guild,
    ID
  });
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