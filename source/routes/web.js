import express from "express";
import {home, auth, profile} from "./../controllers/index";
import UserModel from './../models/user.model';
import {authValid} from './../validation/index';
import passport from "passport";
import initPassportLocal from './../controllers/passportController/local';
// import authen from './../libs/authen';
initPassportLocal();
let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */

let initRoutes = (app) => {
    // router.get("/test-database", async function (req, res){
    //     try {
    //         let item = {
    //             username: "Quản trị viên 1",
    //             // class: "KHMT-02-K62",
    //             email: "anhhau40033@gmail.com",
    //             role: "admin"
    //         };
    //         let user = await UserModel.createNew(item);
    //         res.send(user);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    
    router.get("/index", auth.checkLoggedIn, home.getHome);
    
    router.get("/register", auth.checkLoggedOut, auth.getRegister);

    router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);

    router.get("/verify/:token", auth.verifyAccount);

    router.get("/login", auth.checkLoggedOut, auth.getLogin);
    
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/index",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    
    router.get("/chat", async function (req, res) {
        res.setHeader("Content-Type", "text/html");
        res.render("./student/chat");
    });
    
    router.get("/group-class", async function (req, res) {
        res.setHeader("Content-Type", "text/html");
        res.render("./student/group-class");
    });
    
    router.get("/notification", async function (req, res) {
        res.setHeader("Content-Type", "text/html");
        res.render("./student/notification");
    });
    
    // router.get("/profile", async function (req, res) {
    //     res.setHeader("Content-Type", "text/html");
    //     res.render("./student/profile");
    // });

    router.get("/profile", auth.checkLoggedIn, profile.getProfile);
    
    return app.use("/", router);
};

module.exports = initRoutes;