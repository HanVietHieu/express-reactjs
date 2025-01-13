const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Cấu hình chiến lược Google
passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Lưu hoặc tìm người dùng trong cơ sở dữ liệu
    return done(null, profile);
  }
));

// Lưu thông tin người dùng vào session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
