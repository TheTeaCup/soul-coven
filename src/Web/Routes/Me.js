const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");

Router.get("/", checkAuth, async (req, res) => {
  let Page = "Me";

  res.render("Me/index.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page
  });
});

Router.get("/staff-application", checkAuth, async (req, res) => {
  let Page = "Staff Application";
  let user = req.isAuthenticated() ? req.user : null;

  let app = Coven.applications.get(user.id);
  if (app) return res.redirect("/me/staff-application/" + app.id + "/view");

  res.render("Me/staff-application.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page
  });
});

Router.post("/staff-application", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let data = req.body;

  let key = Math.random()
    .toString(36)
    .substring(7);

  // main server
  Coven.channels.cache
    .get("740309767658143974")
    .send(
      "**New Staff Application:** \n User: <@" +
        user.id +
        "> \n Application: <https://soulcoven.me/me/staff-application/" +
        key +
        "/view>"
    )
    .then(async msg => {
      // reaction
      msg.react("735686606094204958"); //yes
      msg.react("735686638600192141"); // no
    });

  // smaller server
  Coven.channels.cache
    .get("740590269308600452")
    .send(
      "**New Staff Application:** \n User: <@" +
        user.id +
        "> \n Application: <https://soulcoven.me/me/staff-application/" +
        key +
        "/view>"
    )
    .then(async msg => {
      // reaction
      msg.react("735686606094204958"); //yes
      msg.react("735686638600192141"); // no
    });

  Coven.applications.set(key, user.id);

  console.log(data);

  let info = {
    id: key,
    info: data.info,
    type: data.type,
    time: data.tz,
    change: data.change,
    why: data.what,
    sw: data.sw,
    able: data.help,
    status: "pending"
  };

  await Coven.applications.set(user.id, info);

  res.redirect("/me/staff-application/" + key + "/view");
});

Router.get("/staff-application/:ID/view", async (req, res) => {
  let Page = "Viewing Staff Application";
  let user = req.isAuthenticated() ? req.user : null;
  let key = req.params.ID;

  let inf = Coven.applications.get(key);
  if (!inf)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  let app = Coven.applications.get(inf);
  if (!app)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  let age = app.info;
  let type = app.type;
  let tz = app.time;
  let change = app.change;
  let why = app.why;
  let sw = app.sw;
  let helping = app.able;
  let status = app.status || "pending";

  res.render("Me/staff-application-view.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    age,
    type,
    tz,
    change,
    why,
    sw,
    helping,
    inf,
    key,
    status
  });
});

Router.get("/staff-application/:ID/reject", async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let key = req.params.ID;

  let inf = Coven.applications.get(key);
  if (!inf)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  let app = Coven.applications.get(inf);
  if (!app)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  // main server
  Coven.channels.cache
    .get("740336479624232981")
    .send(
      "**Staff Application Rejected:** \n User: <@" +
        inf +
        "> \n Please inform user. \n Rejected by: <@" +
        user.id +
        ">"
    );

  // smaller server
  Coven.channels.cache
    .get("740590269308600452")
    .send(
      "**Staff Application Rejected:** \n User: <@" +
        inf +
        "> \n Please inform user. \n Rejected by: <@" +
        user.id +
        ">"
    );

  let data = app;
  let info = {
    id: key,
    info: data.info,
    type: data.type,
    time: data.time,
    change: data.change,
    why: data.why,
    sw: data.sw,
    able: data.able,
    status: "rejected"
  };

  await Coven.applications.set(inf, info);

  res.redirect("/me/staff-application/" + key + "/view");
});

Router.get("/staff-application/:ID/approve", async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let key = req.params.ID;

  let inf = Coven.applications.get(key);
  if (!inf)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  let app = Coven.applications.get(inf);
  if (!app)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  // main server
  Coven.channels.cache
    .get("740336479624232981")
    .send(
      "**Staff Application Approved:** \n User: <@" +
        inf +
        "> \n Please inform user. \n Approved by: <@" +
        user.id +
        ">"
    );

  // smaller server
  Coven.channels.cache
    .get("740590269308600452")
    .send(
      "**Staff Application Approved:** \n User: <@" +
        inf +
        "> \n Please inform user. \n Approved by: <@" +
        user.id +
        ">"
    );

  let data = app;
  let info = {
    id: key,
    info: data.info,
    type: data.type,
    time: data.time,
    change: data.change,
    why: data.why,
    sw: data.sw,
    able: data.able,
    status: "approved"
  };

  await Coven.applications.set(inf, info);

  res.redirect("/me/staff-application/" + key + "/view");
});

Router.get("/staff-application/:ID/remove", async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let key = req.params.ID;

  let inf = Coven.applications.get(key);
  if (!inf)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });

  let app = Coven.applications.get(inf);
  if (!app)
    return res.status(404).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "No Staff Application Found"
    });
    
    Coven.applications.delete(key);

  // main server
  Coven.channels.cache
    .get("740336479624232981")
    .send(
      "**Staff Application Deleted:** \n User: <@" +
        inf +
        "> \n Please inform user. \n Deleted by: <@" +
        user.id +
        ">"
    );
    
   await Coven.applications.delete(inf);
  res.redirect("/me?q=application_delted&user=" + inf);
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