import express from "express";
import {home, auth} from "./../controllers/index";

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */

let initRoutes = (app) => {
    // router.get("/test-database", async function (req, res){
    //     try {
    //         let item = {
    //             userId: "123456789",
    //             contactId: "2342348959"
    //         };
    //         let contact = await ContactModel.createNew(item);
    //         res.send(contact);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    
    router.get("/", async function (req, res) {
        res.render("./login/login", {layout: false});
    });
    
    router.get("/index", home.getHome);
    
    // app.get("/chat", async function (req, res) {
    //     res.render("chat", {layout: false});
    // });
    
    router.get("/chat", async function (req, res) {
        res.render("chat");
    });
    
    router.get("/group-class", async function (req, res) {
        res.render("group-class");
    });
    
    router.get("/notification", async function (req, res) {
        res.render("notification");
    });
    
    router.get("/profile", async function (req, res) {
        res.render("profile");
    });
    
    router.get("/login", auth.getLoginRegister);
    
    router.get("/logout", auth.getLogout);
    
    router.post("/login", auth.postLogin);
    
    router.get("/verify2FA", async function (req, res) {
        res.render("./login/verify2FA", {layout: false});
    });

    return app.use("/", router);
};

module.exports = initRoutes;