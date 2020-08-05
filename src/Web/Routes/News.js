const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");

Router.get("/", checkAuth, async (req, res) => {
  let Page = "News";

  
  res.render("error.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    message: "This page is still under construction."
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