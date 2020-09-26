const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const Discord = require("discord.js");

Router.get("/", checkAuth, async (req, res) => {
  let Page = "Me";
  const perms = Discord.Permissions;
  let error = req.query.e;
  let guild = req.query.guild_id;

  res.render("Me/index.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    perms,
    error,
    guild
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
    .get("740590334899126412")
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
    .get("740590334899126412")
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

/* Guild Settings Changer */

Router.get("/:ID/edit", checkAuth, async (req, res) => {
  let s = req.params.ID;
  if (!s) return res.redirect("/me?e=no_id");
  let server = Coven.guilds.cache.get(s);
  if (!server) return res.redirect("/me?e=no_server");

  const isManaged =
    server && !!server.member(req.user.id)
      ? server.member(req.user.id).permissions.has("MANAGE_GUILD")
      : false;
  if (!isManaged && !req.session.isAdmin)
    res.redirect("/me?e=not_allowed&guild_id=" + s);

  let settings = Coven.settings.get(s);
  let st = req.query.s;
  let e = req.query.e;

  res.render("Me/server-edit.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    guild: server,
    settings,
    st,
    e
  });
});

Router.post("/:ID/edit", checkAuth, async (req, res) => {
  let s = req.params.ID;
  if (!s) return res.redirect("/me?e=no_id");
  let server = Coven.guilds.cache.get(s);
  if (!server) return res.redirect("/me?e=no_server");

  const isManaged =
    server && !!server.member(req.user.id)
      ? server.member(req.user.id).permissions.has("MANAGE_GUILD")
      : false;
  if (!isManaged && !req.session.isAdmin)
    res.redirect("/me?e=not_allowed&guild_id=" + s);

  let prefix = req.body.prefix;
  if (!prefix) return res.redirect("/me/" + s + "/edit?e=no_prefix");

  Coven.settings.set(s, prefix, "prefix");

  res.redirect("/me/" + s + "/edit?s=prefix_changed");
});

Router.get("/:ID/edit/leaderboard", checkAuth, async (req, res) => {
  let s = req.params.ID;
  if (!s) return res.redirect("/me?e=no_id");
  let server = Coven.guilds.cache.get(s);
  if (!server) return res.redirect("/me?e=no_server");

  const isManaged =
    server && !!server.member(req.user.id)
      ? server.member(req.user.id).permissions.has("MANAGE_GUILD")
      : false;
  if (!isManaged && !req.session.isAdmin)
    res.redirect("/me?e=not_allowed&guild_id=" + s);

  let q = req.query.q;
  if (!q) res.redirect("/me");

  if (q === "true") {
    Coven.settings.set(s, true, "levelsystem");
  } else {
    Coven.settings.set(s, false, "levelsystem");
  }

  res.redirect("/me/" + s + "/edit?s=levelsystem_" + q);
});

Router.get("/pen-pal/", checkAuth, async (req, res) => {
  let Page = "Pen-Pal";
  let user = req.isAuthenticated() ? req.user : null;

  res.render("Me/pen-pal.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page
  });
});

Router.get("/pen-pal/apply", checkAuth, async (req, res) => {
  let Page = "Pen-Pal Application";
  let user = req.isAuthenticated() ? req.user : null;

  let app = Coven.pen.get(user.id);
  if (app) return res.redirect("/me/pen-pal/" + app.id + "/status");

  res.render("Me/pen-pal-app.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    add: "",
    dob: "",
    looks: "",
    rel: "",
    location: "",
    any: "",
    about: ""
  });
});

Router.post("/pen-pal/apply", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let data = req.body;
  console.log(data);

  let key = Math.random()
    .toString(36)
    .substring(7);

  Coven.users.fetch(user.id).then(use => {
    let inf = {
      user: {
        name: use.tag,
        id: use.id
      },
      address: data.add,
      id: key,
      dob: data.age,
      looking: data.what,
      type: data.rel,
      location: data.location,
      extra: data.extra || "none",
      match: false,
      status: "pending",
      matcher: "null#0000",
      matchedW: [],
      matchWhy: "",
      about: data.about
    };

    Coven.pen.set(user.id, inf);
    res.redirect("/me/pen-pal?s=app_submitted");

    Coven.channels.cache
      .get("755611644830154782")
      .send(
        "**New Pen-Pal Application:** \n User: <@" +
          user.id +
          "> \n Application: <https://soulcoven.me/me/pen-pal/" +
          key +
          "/status>"
      );
  });
});

Router.get("/pen-pal/:ID/status", checkAuth, async (req, res) => {
  let Page = "Staff Application";
  let user = req.isAuthenticated() ? req.user : null;
  let ID = req.params.ID;

  let all = Coven.pen;
  let array = all.filter(function(el) {
    return el.id === `${ID}`;
  });

  let after = array.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal?e=no_app");

  res.render("Me/pen-pal-status.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    app
  });
});

Router.get("/pen-pal/:ID/delete", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let ID = req.params.ID;

  let all = Coven.pen;
  let array = all.filter(function(el) {
    return el.id === `${ID}`;
  });

  let after = array.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal?e=no_app");

  let allowed = [];
  allowed.push(app.user.id);
  Coven.Developers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  Coven.pen.delete(app.user.id);

  Coven.channels.cache
    .get("755611644830154782")
    .send(
      "**New Pen-Pal Application Deleted:** \n By: <@" +
        user.id +
        "> App Owner: <@" +
        app.user.id +
        ">"
    );

  res.redirect("/me/pen-pal?s=deleted");
});

Router.get("/pen-pal/:ID/edit", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let ID = req.params.ID;

  let all = Coven.pen;
  let array = all.filter(function(el) {
    return el.id === `${ID}`;
  });

  let after = array.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal?e=no_app");

  let allowed = [];
  allowed.push(app.user.id);
  Coven.Developers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  res.render("Me/pen-pal-app.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "pen-pal application",
    add: app.address,
    dob: app.dob,
    looks: app.looking,
    rel: app.type,
    location: app.location,
    any: app.extra,
    about: app.about || ""
  });
});

Router.post("/pen-pal/:ID/edit", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let ID = req.params.ID;
  let data = req.body;
  console.log(data);

  let all = Coven.pen;
  let array = all.filter(function(el) {
    return el.id === `${ID}`;
  });

  let after = array.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal?e=no_app");

  let allowed = [];
  allowed.push(app.user.id);
  Coven.Developers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  Coven.users.fetch(app.user.id).then(use => {
    let inf = {
      user: {
        name: use.tag,
        id: use.id
      },
      address: data.add,
      id: ID,
      dob: data.age,
      looking: data.what,
      type: data.rel,
      location: data.location,
      extra: data.extra || "none",
      match: app.match,
      status: app.status,
      matcher: app.matcher,
      matchedW: app.matchedW,
      matchWhy: app.matchWhy || "",
      about: data.about || ""
    };

    Coven.channels.cache
      .get("755611644830154782")
      .send(
        "**New Pen-Pal Application Edited:** \n By: <@" +
          user.id +
          "> App Owner: <@" +
          app.user.id +
          "> \n Application: <https://soulcoven.me/me/pen-pal/" +
          ID +
          "/status>"
      );

    Coven.pen.set(user.id, inf);
    res.redirect("/me/pen-pal?s=app_edited");
  });
});

Router.get("/pen-pal/all", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;

  let allowed = [];
  Coven.Staff.map(g => allowed.push(g));
  Coven.helpers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  let all = Coven.pen;

  res.render("Me/all-apps.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "pen-pal all",
    all
  });
});

Router.get("/pen-pal/match", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  let e = req.query.e;
  let s = req.query.s;

  let allowed = [];
  Coven.Staff.map(g => allowed.push(g));
  Coven.helpers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  let all = Coven.pen;

  res.render("Me/pen-match-form.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "pen-pal match",
    all,
    e,
    s
  });
});

Router.post("/pen-pal/match", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;

  let allowed = [];
  Coven.Staff.map(g => allowed.push(g));
  Coven.helpers.map(g => allowed.push(g));

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  let all = Coven.pen;
  let data = req.body;
  console.log(data);

  // user 1
  let array1 = all.filter(function(el) {
    return el.id === `${data.u1}`;
  });

  let after = array1.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal/match?e=user_1_no_app");

  // user 2
  let array2 = all.filter(function(el) {
    return el.id === `${data.u2}`;
  });

  let after2 = array2.map(g => g);

  let app2 = after2[0];
  if (!app2) return res.redirect("/me/pen-pal/match?e=user_2_no_app");

  if (!data.why) return res.redirect("/me/pen-pal/match?e=no_reason");
  
  if(app.match) return res.redirect("/me/pen-pal/match?e=already_matched");
  if(app2.match) return res.redirect("/me/pen-pal/match?e=already_matched");

  //user 1
  let inf = {
    user: app.user,
    address: app.address,
    id: app.id,
    dob: app.dob,
    looking: app.looking,
    type: app.type,
    location: app.location,
    extra: app.extra,
    match: true,
    status: "matched",
    matcher: {
      id: user.id,
      name: user.username + "#" + user.discriminator
    },
    matchedW: {
      id: app2.user.id,
      name: app2.user.name
    },
    matchWhy: data.why,
    about: app.about
  };

  Coven.pen.set(app.user.id, inf);

  //user 2
  let inf2 = {
    user: app2.user,
    address: app2.address,
    id: app2.id,
    dob: app2.dob,
    looking: app2.looking,
    type: app2.type,
    location: app2.location,
    extra: app2.extra,
    match: true,
    status: "matched",
    matcher: {
      id: user.id,
      name: user.username + "#" + user.discriminator
    },
    matchedW: {
      id: app.user.id,
      name: app.user.name
    },
    matchWhy: data.why,
    about: app2.about
  };

  await Coven.pen.set(app2.user.id, inf2);

  res.redirect("/me/pen-pal/match?s=matched");

  Coven.channels.cache
    .get("755611644830154782")
    .send(
      "**New Pen-Pal Application Match:** \n By: <@" +
        user.id +
        "> \n User 1: <@" +
        app.user.id +
        "> \n User 2: <@" +
        app2.user.id +
        "> \n Check your match page for more information!"
    );
});

Router.get("/pen-pal/:ID/match", checkAuth, async (req, res) => {
  let Page = "Pen-Pal Match";
  let user = req.isAuthenticated() ? req.user : null;
  let ID = req.params.ID;

  let all = Coven.pen;
  let array = all.filter(function(el) {
    return el.id === `${ID}`;
  });

  let after = array.map(g => g);

  let app = after[0];
  if (!app) return res.redirect("/me/pen-pal?e=no_app");
  
  if(!app.match) return res.redirect("/me/pen-pal?e=no_match");
  
  let matchInf = app.matchedW;
  let array2 = all.filter(function(el) {
    return el.user.id === `${app.matchedW.id}`;
  });

  let m = array2.map(g => g);

  let match = m[0];
  if (!match) return res.redirect("/me/pen-pal?e=no_match_found");
  
  let allowed = [];
  Coven.Staff.map(g => allowed.push(g));
  Coven.helpers.map(g => allowed.push(g));
  allowed.push(app.user.id)

  if (!allowed.includes(user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "Unauthorized"
    });

  res.render("Me/pen-pal-match.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    app,
    matchInf,
    match
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