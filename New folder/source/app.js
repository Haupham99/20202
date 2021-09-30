const express = require('express');
import ConnectDB from './config/connectDB';
import initRoutes from './routes/web';
import connectFlash from 'connect-flash';
import session from './config/session';
import configViewEngine from './config/viewEngine';
import passport from 'passport';
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";
import configSocketIo from "./config/socketio";

const path = require('path');

// Init app
let app = express();

//Init Server
let server = http.createServer(app);
let io = socketio(server);

//Connect to MongoDB
ConnectDB();

//Config session
session.config(app);

app.use(express.static("./source/static"));
configViewEngine(app);
const viewPath = path.join(__dirname, './views');
app.set('views', viewPath);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

const fs = require('fs');

// Enable flash messages
app.use(connectFlash());

// Config passport
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

configSocketIo(io, passportSocketIo, cookieParser, session.sessionStore);

// Init all sockets
initSockets(io);

let port = 9999;
console.log("MONITOR Started on: http://localhost:" + port + "/login");
server.listen(port);