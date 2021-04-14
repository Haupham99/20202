import express from "express";
import {home, auth} from "./../controllers/index";
import UserModel from './../models/user.model';
import {authValid} from './../validation/index';

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */

let initRoutes = (app) => {
    router.get("/test-database", async function (req, res){
        try {
            let item = {
                username: "Quản trị viên 1",
                // class: "KHMT-02-K62",
                email: "anhhau40033@gmail.com",
                role: "admin"
            };
            let user = await UserModel.createNew(item);
            res.send(user);
        } catch (error) {
            console.log(error);
        }
    });
    
    router.get("/", async function (req, res) {
        res.render("./login/login");
    });
    
    router.get("/index", home.getHome);
    
    router.get("/chat", async function (req, res) {
        res.render("./student/chat");
    });
    
    router.get("/group-class", async function (req, res) {
        res.render("./student/group-class");
    });
    
    router.get("/notification", async function (req, res) {
        res.render("./student/notification");
    });
    
    router.get("/profile", async function (req, res) {
        res.render("./student/profile");
    });
    
    router.get("/register", auth.getRegister);

    router.post("/register", authValid.register, auth.postRegister);

    router.get("/verify/:token", auth.verifyAccount);

    router.get("/login", auth.getLogin);
    
    router.post("/login", auth.postLogin);

    router.get("/logout", auth.getLogout);
    
    router.get("/verify2FA", async function (req, res) {
        res.render("./login/verify2FA");
    });

    return app.use("/", router);
};

module.exports = initRoutes;