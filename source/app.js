const express = require('express');
import ConnectDB from './config/connectDB';
import initRoutes from './routes/web';
import connectFlash from 'connect-flash';
import configSession from './config/session';
import configViewEngine from './config/viewEngine';
const path = require('path');
const app = express();
//Connect to MongoDB
ConnectDB();

//Config session
configSession(app);

const rateLimit = require('express-rate-limit');

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

// UI Rate Limit
const uiLimiter = rateLimit({
    // windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // limit each IP to 3 requests per windowMs
    message: "API UILimiter"
});

// UI Rate Limit
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 3 requests per windowMs
    message: "API Reate Limit"
});

// only apply to requests that begin with /api/
app.use("./login/login", uiLimiter);

// Enable flash messages
app.use(connectFlash());

// Init all routes
initRoutes(app);

const server = require("http").Server(app);
let port = 9999;
console.log("MONITOR Started on: http://localhost:" + port);
server.listen(port);