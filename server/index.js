const express = require("express");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./stragtegy");
const request = require("request");
const { clientID } = require("../config.js");
const app = express();

app.use(
  session({
    secret: "@nyth!ng y0u w@nT",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log(user);

  done(
    null,
    user

    // clientID: _json.clientID,
    // email: _json.email,
    // name: _json.name,
    // fallowers_url: _json.fallowers_url
  );
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  `/login`,
  passport.authenticate("auth0", {
    successRedirect: "/followers",
    falureRedirect: "/login",
    falureFlash: true,
    connection: "github"
  })
);

app.get("/followers", (req, res, next) => {
  if (req.user) {
    let fr = {
      url: `https://api.github.com/users/${req.user.nickname}/followers`,
      headers: {
        "User-Agent": clientID //dfasdfad
      }
    };
    request(fr, function(error, resp, body) {
      res.status(200).send(body);
      console.log(body);
    });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
