const Auth0Strategy = require("passport-auth0");

const { domain, clientID, clientSecret } = require("../config");

module.exports = new Auth0Strategy(
  {
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    scope: "profile openid",
    callbackURL: "/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
