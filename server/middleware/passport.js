const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "1083376600564-1uvl9arvm58a5f98ho2ijatehjn5vd6i.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://www.example.com/auth/user/google/callback"
  },
  () => {
    
  }

//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
));