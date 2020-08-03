const express = require("express");
const app = express();
var Server = require("http").createServer(app);

const passport = require("passport");
const session = require("express-session");
const strategy = require("passport-discord").Strategy;
const MongoStore = require("connect-mongo")(session);

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var minifyHTML = require("express-minify-html");
const JsSearch = require("js-search");
const bodyParser = require("body-parser");
const path = require("path");

console.log("Soul Coven (Web) Site is starting...");

const Coven = require("../Bot/CovenClient.js");


const MainRoute = require("./Web/Routes/Main.js");
/*
const APIRoute = require("./Web/Routes/APIRoute.js");
const MeRoute = require("./Web/Routes/MeRoute.js");
const UserRoute = require("./Web/Routes/UserRoute.js");
const SignsRoute = require("./Web/Routes/SignsRoute.js");
const AdminRoute = require("./Web/Routes/AdminRoute.js");
const NewsRoute = require("./Web/Routes/NewsRoute.js");
const GalleryRoute = require("./Web/Routes/GalleryRoute.js");
*/

/*
 *
 * Start of Routes
 *
 */
app.set("views", "src/Views");
app.use(express.static(process.cwd() + "/src/Views/CSS"));
app.engine("html", require("ejs").renderFile);
app.use("/images", express.static(process.cwd() + "/src/Images/"));

/* Login functions */
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new strategy(
    {
      clientID: "735313029016846487",
      clientSecret: settings.secret,
      callbackURL: "http://154.27.68.232:1267/api/callback",
      scope: ["identify"]
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

app.use(
  session({
    store: new MongoStore({
      url:
        settings.mongo
    }),
    secret: "FROPT",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet({ frameguard: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Put here so that it doesnt get editied by the HTML shortener
//app.use("/api", APIRoute);
app.use(require("express-minify")());
app.use(
  minifyHTML({
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  })
);

app.use((req, res, next) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST");

      console.log(
        (req.headers["cf-connecting-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.ip) +
          " [" +
          req.method +
          "] " +
          req.url
      );

      next();
    });

/**
 * Routes
 */
app.use("/", MainRoute);
/*
app.use("/me", MeRoute);
app.use("/user", UserRoute);
app.use("/signs", SignsRoute);
app.use("/admin", AdminRoute);
app.use("/news", NewsRoute);
app.use("/gallery", GalleryRoute); */


app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow:");
});

app.set("json spaces", 4);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views/"));
app.use("/css", express.static(path.join(__dirname, "Web/Views/CSS")));
app.use("/js", express.static(path.join(__dirname, "Web/Views/JS")));

/* Get page status codes */
app.use(function(err, req, res, next) {
  // treat as 404
  if (
    err.message &&
    (~err.message.indexOf("not found") ||
      ~err.message.indexOf("Cast to ObjectId failed"))
  ) {
    return next();
  }

  console.error(err.stack);

  if (err.stack.includes("ValidationError")) {
    res.status(422).render("error.ejs", {
      user: req.isAuthenticated() ? req.user : null,
      Website: "/login",
      message:"Validatoin Error"
    });
    return;
  }

  // error page
  res.status(500).render("error.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Website: req.originalUrl,
    status: "500",
    message: err.message
  });
});

// assume 404 since no middleware responded
app.use(function(req, res) {
  const payload = {
    url: req.originalUrl,
    main: `/`,
    site: `Soul Coven`,
    error: "Not found"
  };
  res.status(404).render("error.ejs", {
    Coven,
    user: req.isAuthenticated() ? req.user : null,
    issue: payload.error,
    Website: payload.main,
    message: "Page Not Found"
  });
});

/**
 * Let our application listen to a specific port
 */
const Listener = Server.listen(settings.PORT, () => {
  console.log(
    `[ Website ] Application is listening on port: ${Listener.address().port}.`
  );
});
