const express = require('express');
import ConnectDB from './config/connectDB';
import initRoutes from './routes/web';
import connectFlash from 'connect-flash';
import configSession from './config/session';
import configViewEngine from './config/viewEngine';
import passport from 'passport';
const path = require('path');
const app = express();
//Connect to MongoDB
ConnectDB();

//Config session
configSession(app);

app.use(express.static("./source/static"));
configViewEngine(app);
const viewPath = path.join(__dirname, './views');
app.set('views', viewPath);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const fs = require('fs');

// Enable flash messages
app.use(connectFlash());

// Config passport
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

const server = require("http").Server(app);
let port = 9999;
console.log("MONITOR Started on: http://localhost:" + port + "/login");
server.listen(port);