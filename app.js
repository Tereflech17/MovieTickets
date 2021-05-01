'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');

// app.use(morgan(':date[iso] :remote-addr - :remote-user :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent'));


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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(getCustomMorganFormat()));

const movieRoutes = require('./server/routes/movie');
const ticketRoutes = require('./server/routes/ticket');

app.use("/api", movieRoutes);
app.use("/api/movietickets/", ticketRoutes);
module.exports = app;