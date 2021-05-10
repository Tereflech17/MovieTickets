'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session =  require('express-session');
const methodOverride = require('method-override');
const SamlStrategy = require('passport-saml');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport');
const fs  = require('fs'),
      path = require('path');
require('dotenv').config();



 

// require routes from routes directory
const apiRoutes = require('./server/routes/restRoute');


/**
 * create a custom morgon token for user id 
 * separately for logging
 */

morgan.token('user-id', ((req, res) => {
      return req.user;
}));
//custom log format
const getCustomMorganFormat = () =>
  JSON.stringify({
    timestamp: ":date[iso]",
    user_id: ":user-id",
    method: ":method",
    url: ":url",
    http_version: ":http-version",
    response_time: ":response-time",
    status: ":status",
    content_length: ":res[content-length]",
    headers_count: "req-headers-length",
});



//create new stream with file name access.log
const httpLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: 'a',
}); 
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(morgan(getCustomMorganFormat()));
app.use(morgan(getCustomMorganFormat(), { stream: httpLogStream }));

//PASSPORT configuration
app.use(session({
  secret: 'Rusty',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
   (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
     return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
        done(null, user.id);
});

passport.deserializeUser((obj, done) => {
      done(null, obj);
});

app.get('/', (req, res) => {
  res.send('Login Failed please login again')
})
//Auth routes
app.get('/login', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), 
 (req, res) => {
     res.redirect('/api/movies');
    
});


//logout route
app.get('/logout', (req, res) => {
 req.logout();
 res.redirect('/login');
});





app.use("/api", apiRoutes);
module.exports = app;