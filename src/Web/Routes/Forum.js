const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const markdownIt = require("markdown-it");
const JsSearch = require("js-search");

let images = [
  "https://astrology.mythicalbots.xyz/default",
  "https://mythicalbots.xyz/images/user.png",
  "https://mythicalbots.xyz/images/error.png",
  "https://soulcoven.me/images/eye.png",
  "https://soulcoven.me/images/lips.png"
];

let forumTemplate = {
  ID: "example-thing",
  name: "i am example",
  type: "information", // can be more than just info
  user: "user-id",
  desc: "what is it?",
  image: "n.a",
  published: Date.now(),
  lastEdit: Date.now(),
  comments: [],
  upvotes: "number", // use these two to get more information
  downvotes: "number",
  views: "number",
  hidden: "true/false"
};

Router.get("/", async (req, res) => {
  let Page = "Forum";
  try {
    let all = Coven.forum.get("forums");
    let types = Coven.forum.get("forum-types");
    let e = req.query.e;
    let m;
    if (e) {
      m = `The news: \'${req.query.name}\' could not be found.`;
    }

    res.render("Forum/all.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      all,
      types,
      Page,
      e,
      m
    });
  } catch (e) {
    res.status(500).render("error.ejs", {
      Coven,
      user: req.isAuthenticated() ? req.user : null,
      message: e
    });
  }
});

Router.get("/search", checkAuth, async (req, res) => {
  let Page = "Forum Search";
  let all = Coven.forum.get("forums");
  let searchQ = req.query.q;

  var search = new JsSearch.Search("id");
  search.addIndex("ID");
  search.addIndex("name");
  search.addIndex("type");

  search.addDocuments(all);
  let searched = search.search(req.query.q);

  res.render("Forum/search.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    Page,
    searched,
    searchQ
  });
});

Router.get("/new", checkAuth, async (req, res) => {
  let Page = "New Forum Post";

  res.render("Forum/create-post.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    Page,
    name: "",
    type: "",
    Desc: "",
    image: ""
  });
});

Router.post("/new", checkAuth, async (req, res) => {
  let data = req.body;
  let user = req.isAuthenticated() ? req.user : null;
  console.log(data);
  let image;

  if (data.image) {
    if (data.image === "/user") {
      image = "https://mythicalbots.xyz/bot/" + user.id + "/avatar";
    } else {
      image = data.image;
    }
  } else {
    image = images[Math.floor(Math.random() * images.length)];
  }

  let key = Math.random()
    .toString(36)
    .substring(7);

  let Data = {
    ID: key,
    name: data.name,
    type: data.type,
    user: user.id,
    desc: data.desc,
    image: image,
    published: Date.now(),
    lastEdit: Date.now(),
    comments: [],
    upvotes: "0",
    downvotes: "0",
    views: "1",
    hidden: false
  };

  Coven.forum.push("forums", Data);

  return res.redirect("/forum/" + key);
});

Router.get("/:ID", async (req, res) => {
  let newsTitle = req.params.ID;
  let all = Coven.forum.get("forums");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);
  console.log(info);

  let Page = info.name;
  let Image = info.image;
  let Desc = info.desc;
  let Editor = info.user;

  res.render("Forum/view.ejs", {
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
  let newsTitle = req.params.ID;
  let all = Coven.forum.get("forums");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);
  console.log(info);

  let allowed = [];
  allowed.push(info.user);
  Coven.Staff.map(g => allowed.push(g));

  if (!allowed.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      title: "401",
      code: 401,
      message: "You do not have authorization to view this page.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });

  let Page = info.name;
  let Image = info.image;
  let Desc = info.desc;
  let Editor = info.user;

  res.render("Forum/create-post.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page: "Forum Edit",
    name: Page,
    type: info.type,
    Desc: Desc,
    image: info.image
  });
});

Router.post("/:ID/edit", checkAuth, async (req, res) => {
  try {
    let newsTitle = req.params.ID;
    let all = Coven.forum.get("forums");
    let array = all.filter(function(el) {
      return el.ID === `${newsTitle}`;
    });
    let data = req.body;

    let info = array[0];

    if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);
    console.log(info);

    let allowed = [];
    allowed.push(info.user);
    Coven.Staff.map(g => allowed.push(g));

    if (!allowed.includes(req.user.id))
      return res.status(401).render("error.ejs", {
        title: "401",
        code: 401,
        message: "You do not have authorization to view this page.",
        Coven,
        user: req.isAuthenticated() ? req.user : null
      });

    var filtered = all.filter(function(el) {
      return el.ID != `${newsTitle}`;
    }); // remove

    Coven.forum.set("forums", filtered);

    let image;
    let status = false;
    if (info.hidden) {
      status = info.hidden;
    }

    if (data.image) {
      if (data.image === "/user") {
        image = "https://mythicalbots.xyz/bot/" + info.user + "/avatar";
      } else {
        image = data.image;
      }
    } else {
      image = images[Math.floor(Math.random() * images.length)];
    }

    let Data = {
      ID: info.ID,
      name: data.name,
      type: data.type,
      user: info.user,
      desc: data.desc,
      image: image,
      published: info.published,
      lastEdit: Date.now(),
      comments: info.comments,
      upvotes: info.upvotes,
      downvotes: info.downvotes,
      views: info.views,
      hidden: status
    };

    await Coven.forum.push("forums", Data);

    return res.redirect("/forum/" + newsTitle);
  } catch (e) {
    return res.status(500).render("error.ejs", {
      title: "401",
      code: 401,
      message: e,
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });
  }
});

Router.get("/:ID/remove", checkAuth, async (req, res) => {
  let newsTitle = req.params.ID;
  let all = Coven.forum.get("forums");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });

  let info = array[0];

  if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);
  console.log(info);

  let allowed = [];
  allowed.push(info.user);
  Coven.Staff.map(g => allowed.push(g));

  if (!allowed.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      title: "401",
      code: 401,
      message: "You do not have authorization to view this page.",
      Coven,
      user: req.isAuthenticated() ? req.user : null
    });

  var filtered = all.filter(function(el) {
    return el.ID != `${newsTitle}`;
  }); // remove

  Coven.forum.set("forums", filtered);
  res.redirect("/forum?s=deleted&n=" + newsTitle);
});

let commentTemplate = {
  title: "",
  userID: "",
  userTag: "",
  desc: "",
  ID: ""
};

Router.get("/:ID/comment", checkAuth, async (req, res) => {
  let newsTitle = req.params.ID;
  let all = Coven.forum.get("forums");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let info = array[0];

  if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);

  let Page = info.name;
  let Image = info.image;
  let Desc = info.desc;
  let Editor = info.user;

  res.render("Forum/comment.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    path: req.path,
    Editor,
    ID: newsTitle,
    info,
    title: "",
    desc: ""
  });
});

Router.post("/:ID/comment", checkAuth, async (req, res) => {
  let newsTitle = req.params.ID;
  let all = Coven.forum.get("forums");
  let array = all.filter(function(el) {
    return el.ID === `${newsTitle}`;
  });
  let data = req.body;

  let info = array[0];

  if (!info) return res.redirect("/forum?e=nf&name=" + newsTitle);
  let comments = info.comments;

  let key = Math.random()
    .toString(36)
    .substring(7);

  var filtered = all.filter(function(el) {
    return el.ID != `${newsTitle}`;
  }); // remove

  Coven.forum.set("forums", filtered);

  let comment = {
    title: data.name,
    userID: req.user.id,
    userTag: req.user.username + "#" + req.user.discriminator,
    desc: data.desc,
    ID: key
  };

  let status = false;
  if (info.hidden) {
    status = info.hidden;
  }

  comments.push(comment);

  let Data = {
    ID: info.ID,
    name: info.name,
    type: info.type,
    user: info.user,
    desc: info.desc,
    image: info.image,
    published: info.published,
    lastEdit: Date.now(),
    comments: comments,
    upvotes: info.upvotes,
    downvotes: info.downvotes,
    views: info.views,
    hidden: status
  };

  await Coven.forum.push("forums", Data);
  
  res.redirect("/forum/" + newsTitle);
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

