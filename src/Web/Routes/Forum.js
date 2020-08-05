const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");

Router.get("/", async (req, res) => {
  let Page = "Forum";
  try {
  let all = Coven.forum.get("forums");

  res.render("Forum/all.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    all,
    Page
  });
  } catch (e) {
      res.status(500).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: e
    });
  }
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