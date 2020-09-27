const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");
const Discord = require("discord.js");

let dataExample = {
  user: {
    id: "",
    name: ""
  },
  blocked: [],
  friends: [],
  messages: [],
  current: []
};

Router.get("/", checkAuth, async (req, res) => {
  let Page = "Chat - Home";
  // Ques
  let s = req.query.s;
  let e = req.query.e;

  let user = req.isAuthenticated() ? req.user : null;
  if (!user) return res.redirect("/login?redirect=/chat");

  let data = {
    user: {
      id: user.id,
      name: user.username + "#" + user.discriminator
    },
    blocked: [],
    friends: [],
    messages: [],
    current: []
  };

  let info = Coven.chat.get(user.id);
  if (!info) Coven.chat.set(user.id, data);

  res.render("Chat/index.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    s,
    e,
    type: "main",
    info
  });
});

let currentExample = {
  id: "",
  users: [],
  messages: [
    {
      id: "",
      message: "",
      from: {
          id: "",
          name: ""
      },
      deleted: false
    }
  ]
};

Router.get("/new", checkAuth, async (req, res) => {
  let Page = "Chat - New";
  // Ques
  let s = req.query.s;
  let e = req.query.e;
  let reqUser = req.query.user;

  let user = req.isAuthenticated() ? req.user : null;
  if (!user) return res.redirect("/login?redirect=/chat");

  let data = {
    user: {
      id: user.id,
      name: user.username + "#" + user.discriminator
    },
    blocked: [],
    friends: [],
    messages: [],
    current: []
  };

  let info = Coven.chat.get(user.id);
  if (!info) Coven.chat.set(user.id, data);

  res.render("Chat/new.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    s,
    e,
    info,
    reqUser
  });
});

Router.get("/:ID", checkAuth, async (req, res) => {
  let Page = "Chat - User";
  // Ques
  let s = req.query.s;
  let e = req.query.e;
  let searchQ = req.params.ID;
  if (!searchQ) return res.redirect("/chat?e=no_chat");

  let user = req.isAuthenticated() ? req.user : null;
  if (!user) return res.redirect("/login?redirect=/chat");

  let info = Coven.chat.get(user.id);
  if (!info) return res.redirect("/chat?e=no_chats");

  let allChats = info.current;

  let chatIn = allChats.filter(function(el) {
    return el.id === `${searchQ}`;
  });

  let chat = chatIn[0];

  if (!chat) return res.redirect("/chat?e=no_chat");
  console.log(chat);

  res.render("Chat/index.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Coven,
    Page,
    s,
    e,
    type: "user"
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