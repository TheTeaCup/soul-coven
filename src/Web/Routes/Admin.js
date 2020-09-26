const Router = require("express").Router();
const Coven = require(process.cwd() + "/src/Bot/CovenClient.js");

Router.use((req, res, next) => {
  if (!req.user) return checkAuth(req, res, next);

  if (!Coven.Staff.includes(req.user.id))
    return res.status(401).render("error.ejs", {
      title: "401",
      code: 401,
      message: "You do not have authorization to view this page.",
      Coven,
      user: req.isAuthenticated() ? req.user : null,
    });

  next();
});

Router.get("/", checkAuth, async (req, res) => {
  let Page = "Admin";

  res.render("Admin/index.ejs", {
    Coven,
    Page,
    user: req.isAuthenticated() ? req.user : null,
    pageType: { bot: false }
  });
});

Router.get("/restart", checkAuth, async (req, res) => {
  res.redirect("/?q=restarting");

  setTimeout(async function() {
    await process.exit();
  }, 3 * 1000);
});

Router.get("/forum", checkAuth, async (req, res) => {
  let Page = "Forum Settings";

  res.render("Admin/forum.ejs", {
    Coven,
    Page,
    user: req.isAuthenticated() ? req.user : null,
    pageType: { bot: false }
  });
});

Router.get("/forum/categories", checkAuth, async (req, res) => {
  let Page = "Forum Categories";
  let types = Coven.forum.get("forum-types");

  res.render("Admin/categories.ejs", {
    Coven,
    Page,
    user: req.isAuthenticated() ? req.user : null,
    pageType: { bot: false },
    tags: types
  });
});

Router.get("/forum/categories/add", checkAuth, async (req, res) => {
  let Page = "Forum Categories Add";
  let types = Coven.forum.get("forum-types");

  res.render("Admin/categories-add.ejs", {
    Coven,
    Page,
    user: req.isAuthenticated() ? req.user : null,
    pageType: { bot: false },
    tags: types
  });
});

Router.post("/forum/categories/add", async (req, res) => {
  if (!("library_name" in req.body)) return res.redirect("/admin/forum/categories?e=name");

  let lib = Coven.forum.get("forum-types");

  if (lib.includes(req.body.library_name))
    return res.redirect("/admin/forum/categories?e=already");

  Coven.forum.push("forum-types", req.body.library_name);

  res.redirect("/admin/forum/categories");
});

Router.get("/forum/categories/:id/delete", async (req, res) => {
  let lib = Coven.forum.get("forum-types");

  if (!lib.includes(req.params.id))
    return res.redirect("/admin/forum/categories?e=invalid");

  Coven.forum.remove("forum-types", req.params.id);

  res.redirect("/admin/forum/categories");
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