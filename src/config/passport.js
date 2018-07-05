const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

const User = require("./../db/queryBuilders/admin");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      const user = User.getById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
