const express = require('express');
// import express from "express";
// import initAPIs from './routes/api.js'
import ConnectDB from './config/connectDB';
import ContactModel from './models/contact.model';
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
const path = require('path');
// const connectDB = require("./config/connectDB");
// const stringify = require('node-stringify');
const app = express();
//Connect to MongoDB
ConnectDB();
const rateLimit = require('express-rate-limit');
const cfg = require('./libs/config');


const authen = require('./libs/authen');
console.log(authen);

// connectDB();

app.use(express.static("./source/static"));
// app.set("view engine", "ejs");
// app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// app.set("views", "./views");
// const layoutPath = path.join(__dirname, './views/layouts');
app.engine('handlebars', exphbs({defaultLayout: './layout'}));
app.engine('handlebars', exphbs({
    section: express_handlebars_sections()  // CONFIGURE 'express_handlebars_sections'
 
    // properties used by express-handlebars configuration ...
}));
const viewPath = path.join(__dirname, './views');
app.set('views', viewPath);
// app.set('view options', {layout: 'layout'});
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const fs = require('fs');

// let fileContents = fs.readFileSync('./source/views/429.ejs', 'utf8');

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


const server = require("http").Server(app);
// let port = cfg.app["port"];
let port = 9999
console.log("MONITOR Started on: http://localhost:" + port);
server.listen(port);

app.get("/test-database", async function (req, res){
    try {
        let item = {
            userId: "123456789",
            contactId: "2342348959"
        };
        let contact = await ContactModel.createNew(item);
        res.send(contact);
    } catch (error) {
        console.log(error);
    }
})

app.get("/", async function (req, res) {
    res.render("./login/login", {layout: false});
});

app.get("/index", async function (req, res) {
    const level = await authen.IsAuthenticated(req.cookies["dG9rZW4"]);
    res.render("index");
});

// app.get("/chat", async function (req, res) {
//     res.render("chat", {layout: false});
// });

app.get("/chat", async function (req, res) {
    res.render("chat");
});

app.get("/group-class", async function (req, res) {
    res.render("group-class");
});

app.get("/notification", async function (req, res) {
    res.render("notification");
});

app.get("/profile", async function (req, res) {
    res.render("profile");
});

app.get("/login", async function (req, res) {
    const username = await authen.IsAuthenticated(req.cookies["dG9rZW4"]);
    if (username) {
        res.redirect("/")
    }
    res.render("./login/login", {layout: false});
});

app.get("/logout", function (req, res) {
    res.cookie("dG9rZW4", "");
    res.redirect("/");
});

app.post("/login", function (req, res) {
    console.log(req.body.pwd);
    let token = authen.GeneralJWT(req.body.pwd);
    if (token) {
        res.cookie("dG9rZW4", token, {
            maxAge: 1 * 60 * 6000 * cfg.authen['expiresIn']
        }); //token được encode thành dG9rZW4
        
        res.redirect("/index");
        
    } else {
        res.redirect("/login");
    }
})

app.get("/verify2FA", async function (req, res) {
    res.render("./login/verify2FA", {layout: false});
});

// app.get("*", function(req, res){
//     res.render("support");
// });