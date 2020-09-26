const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const Discord = require("discord.js");
const sitemap = require("sitemap");

Router.get("/", async (req, res) => {
  let Page = "Home";
  let Message;
  let MessageDefined;

  // Ques
  let Query = req.query.q;
  let from = req.query.utm_source;

  if (from === "BotBlock") {
    console.log("[Website] User from Bot Block");
  }

  if (Query === "SUCCESSFULY_LOGGEDOUT") {
    (Message = "You are now logged out."), (MessageDefined = 1);
  }

  if (Query === "SENT_FEEDBACK") {
    (Message = "Your FeedBack was submitted!"), (MessageDefined = 1);
  }

  res.render("index.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    Message,
    MessageDefined,
    path: req.path
  });
});

Router.get("/login", (req, res) => {
  let redirect = req.query.redirect;
  if (!redirect) redirect = "/me";
  //console.log(redirect)
  res.redirect(
    "https://discord.com/api/oauth2/authorize?client_id=735313029016846487&redirect_uri=https%3A%2F%2Fsoulcoven.me%2Fapi%2Fcallback&response_type=code&scope=guilds%20identify&prompt=none&state=" +
      redirect
  );
});

Router.get("/logout", function(req, res) {
  req.session.destroy(() => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  });
});

Router.get("/discord", (req, res) => {
  res.redirect("https://discord.gg/EXQ2hUj");
});

Router.get("/default", (req, res) => {
  res.redirect("/images/pent.png");
});

Router.get("/feedback", async (req, res) => {
  let Page = "Feedback";
  let ErrorMessage = null;
  let Error = req.query.error;
  if (Error === "not_msg") ErrorMessage = "no_message";
  res.render("feedback.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    ErrorMessage,
    path: req.path,
    pageType: { bot: false }
  });
});

Router.post("/feedback/post/suggestion", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  if (req.body.suggestion) {
    let channel = Coven.channels.cache.get("735682554719633518");

    let embed = new Discord.MessageEmbed()
      .setColor(Coven.Color)
      .setTitle("Feed Back - Suggestion")
      .setThumbnail(`https://mythicalbots.xyz/bot/${user.id}/avatar`)
      .setDescription(`${req.body.suggestion}`)
      .setFooter(`Feedback sent by ${user.username}#${user.discriminator}`);
    channel.send(embed).then(async msg => {
      // reaction
      msg.react("735686606094204958"); //yes
      msg.react("735686638600192141"); // no
    });

    res.redirect("/?s=suggestion_submitted");
  } else {
    res.redirect("/feedback?error=not_msg");
  }
});

Router.post("/feedback/post/bug", checkAuth, async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null;
  if (req.body.bug) {
    let channel = Coven.channels.cache.get("735682554719633518");

    let embed = new Discord.MessageEmbed()
      .setColor(Coven.Color)
      .setTitle("Feed Back - Bug")
      .setThumbnail(`https://mythicalbots.xyz/bot/${user.id}/avatar`)
      .setDescription(`${req.body.bug}`)
      .setFooter(`Feedback sent by ${user.username}#${user.discriminator}`);
    channel.send(embed).then(async msg => {
      // reaction
      msg.react("735686606094204958"); //yes
      msg.react("735686638600192141"); // no
    });

    res.redirect("/?s=bug_submitted");
  } else {
    res.redirect("/feedback?error=not_msg");
  }
});

Router.get("/terms", async (req, res) => {
  let Page = "Terms Of Service";

  res.render("terms.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page
  });
});

Router.get("/sitemap.xml", async (req, res) => {
  const forum = Coven.forum.get("forums");
  const news = Coven.news.get("news");
  
  try {

  const sm = sitemap.createSitemap({
    hostname: "https://soulcoven.me/",
    cacheTime: 1000 * 60 * 10,
    urls: [
      {
        url: "/",
        changefreq: "hourly",
        priority: 0.9
      },
      {
        url: "/news",
        changefreq: "hourly",
        priority: 0.9
      },
      {
        url: "/forum",
        changefreq: "hourly",
        priority: 0.9
      },
      {
        url: "/terms",
        changefreq: "weekly",
        priority: 0.9
      },
      ...forum.map(page => ({
        url: "/forum/" + page.ID,
        changefreq: "daily",
        priority: 1
      })),
      ...news.map(page => ({
        url: "/news/" + page.ID,
        changefreq: "daily",
        priority: 1
      }))
    ]
  });

  res.set("Content-Type", "application/xml").send(sm.toString());
  
  } catch(e) {
    return res.status(500).render("error.ejs", {
      title: "401",
      code: 401,
      message: e,
      Coven,
      user: req.isAuthenticated() ? req.user : null
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