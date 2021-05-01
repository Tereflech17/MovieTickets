'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');
const methodOverride = require('method-override');
const fs  = require('fs'),
      path = require('path');
// app.use(morgan(':date[iso] :remote-addr - :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent'));

// require routes from routes directory
const movieRoutes = require('./server/routes/movie');
const ticketRoutes = require('./server/routes/ticket');
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

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(morgan(getCustomMorganFormat()));
app.use(morgan(getCustomMorganFormat(), { stream: httpLogStream }));



app.use("/api", movieRoutes);
app.use("/api/movietickets/", ticketRoutes);
module.exports = app;