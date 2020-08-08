const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const markdownIt = require("markdown-it");

let newsTemplate = {
  ID: "news-id",
  name: "news name",
  image: "news image",
  desc: "news desc",
  type: "news type",
  editor: "news editor"
};

Router.get("/", async (req, res) => {
  let Page = "News";
  let all = Coven.news.get("news");
  let e = req.query.e;
  let m;
  if (e) {
    m = `The news: \'${req.query.name}\' could not be found.`;
  }

  res.render("News/all.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    all,
    e,
    m
  });
});

Router.get("/create", checkAuth, async (req, res) => {
  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "You do not have authorization to view this page."
    });

  res.render("News/new-news.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "New News",
    title: "",
    id: "",
    image: "",
    desc: "",
    type: ""
  });
});

Router.post("/create", checkAuth, async (req, res) => {
  let data = req.body;

  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      title: "401",
      code: 401,
      message: "You do not have authorization to view this page."
    });

  let Data = {
    ID: data.brack.toLowerCase(),
    name: data.title,
    image: data.image,
    desc: data.fulldesc,
    editor: req.user.id,
    type: data.type
  };

  Coven.news.push("news", Data);

  Coven.channels.cache
    .get("735347186090377265")
    .send(
      `**-** [**\`User\`**: <@${req.user.id}>] Just made a new post! \n <https://soulcoven.me/news/${data.brack}/>`
    );

  res.redirect("/news/" + data.brack);
});

Router.get("/:ID", async (req, res) => {
  let newsTitle = req.params.ID;
  let all = Coven.news.get("news");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/news?e=nf&name=" + newsTitle);
  console.log(info);

  let Page = info.name;
  let Image = info.image;
  let Desc = info.desc;
  let Editor = info.editor;

  res.render("News/view.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    Image,
    Desc: markdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: false
    }).render(Desc),
    path: req.path,
    Editor,
    ID: newsTitle,
    info
  });
});

Router.get("/:ID/edit", checkAuth, async (req, res) => {
  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "You do not have authorization to view this page."
    });

  let newsTitle = req.params.ID;
  let all = Coven.news.get("news");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/news?e=nf&name=" + newsTitle);

  let Page = info.name;
  let Image = info.image;
  let Desc = info.desc;
  let Editor = info.editor;

  res.render("News/new-news.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "New News",
    title: info.name,
    id: newsTitle,
    image: info.image,
    desc: Desc,
    type: info.type
  });
});

Router.post("/:ID/edit", checkAuth, async (req, res) => {
  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "You do not have authorization to view this page."
    });

  let newsTitle = req.params.ID;
  let data = req.body;
  let all = Coven.news.get("news");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  var filtered = all.filter(function(el) {
    return el.ID != `${newsTitle}`;
  }); // remove
  let info = array[0];

  if (!info) return res.redirect("/news?e=nf&name=" + newsTitle);

  Coven.news.set("news", filtered);

  let Data = {
    ID: data.brack.toLowerCase(),
    name: data.title,
    image: data.image,
    desc: data.fulldesc,
    editor: info.editor,
    type: data.type
  };

  await Coven.news.push("news", Data);

  Coven.channels.cache
    .get("735347186090377265")
    .send(
      `**-** [**\`User\`**: ${
        Coven.users.cache.get(req.user.id).tag
      }] Just edited: \n <https://soulcoven.me/news/${data.brack}/>`
    );

  res.redirect("/news/" + newsTitle);
});

Router.get("/:ID/remove", checkAuth, async (req, res) => {
  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: "You do not have authorization to view this page."
    });

  let newsTitle = req.params.ID;
  let all = Coven.news.get("news");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/news?e=nf&name=" + newsTitle);

  var filtered = all.filter(function(el) {
    return el.ID != `${newsTitle}`;
  }); // remove
  Coven.news.set("news", filtered);

  res.redirect("/news?s=deleted&name=" + newsTitle);
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
