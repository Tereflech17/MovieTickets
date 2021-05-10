'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session =  require('express-session');
const methodOverride = require('method-override');
const SamlStrategy = require('passport-saml');
const passport = require('passport');
const fs  = require('fs'),
      path = require('path');
require('dotenv').config();


// passport.serializeUser((user, done) => {
//     done(null, user)
// });

// passport.deserializeUser((user, done) => {
//     done(null, user)
// });

// const samlStrategy = new SamlStrategy.Strategy(
//   {
//     callbackUrl: process.env.CALLBACK_URL,
//     entryPoint: process.env.ENTRY_POINT,
//     issuer: process.env.ISSUER,
//     identifierFormat: null,
//     decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf-8'),
//     privateCert: fs.readFileSync(__dirname + '/cert/key.pem', 'utf-8'),
//     cert: fs.readFileSync(__dirname + '/cert/cert_idp.pem', 'utf-8'),
//     validateInResponseto: false,
//     disableRequestAuthnContext: true
//   }, ( (profile, done) => {
//       return done(null, profile);
//   })); 

//   passport.use(samlStrategy);
 

// require routes from routes directory

const apiRoutes = require('./server/routes/restRoute');

//custom log format
const getCustomMorganFormat = () =>
  JSON.stringify({
    timestamp: ":date[iso]",
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    else {
          res.send('login failed');
    }
}

// app.get('/', ensureAuthenticated, (req, res) => {
//       res.send('Authenticated');
// });

// app.get('/login', 
//     passport.authenticate('saml', {failureRedirect: '/login/fail'}),
//     ((req, res) => {
//       res.redirect('https://shibboleth.main.ad.rit.edu/idp/profile/SAML2/Redirect/SSO');
//     })
// );

// app.post('/login/callback', 
//     passport.authenticate('saml', {failureRedirect: '/login/fail'}),
//     ((req, res) => {
//       res.send("something happened!!!!")
//     }));

// app.get('/login/fail', ((req, res) => {
//     res.status(401).send('Login Failed');
// }));

// app.get('/Shibboleth.sso/Metadata', ((req, res) => {
//     res.type('application/xml');
//     res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/cert/cert.pem', 'utf-8')));
// }));




app.use("/api", apiRoutes);
module.exports = app;