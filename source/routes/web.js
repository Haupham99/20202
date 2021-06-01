import express from "express";
import {admin, home, auth, profile, user, personal, friend, chat, comment, notification, group} from "./../controllers/index";
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

    router.get("/forgot-password", auth.checkLoggedOut, auth.getForgotPassword);
    router.post("/forgot-password", auth.checkLoggedOut, auth.postForgotPassword);
    router.get("/:email/reset/:token", auth.getResetPassword);
    router.post("/:email/reset/:token", auth.postResetPassword);

    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    router.post("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar);

    router.get("/change-password", auth.checkLoggedIn, profile.getChangePassword);

    router.post("/change-password", auth.checkLoggedIn, user.updatePassword);
    
    // Chat

    router.get("/chat", auth.checkLoggedIn, chat.getChat);
    router.get("/chat/:userId/:friendId", auth.checkLoggedIn, chat.getConversation);
    router.post("/chat/:userId/:userUsername/:userAvatar/:friendId/:friendUsername/:friendAvatar/:text", chat.postChat);

    // End Chat

    // Group
    router.get("/group", auth.checkLoggedIn, group.getGroup);
    router.post("/group/post-post", auth.checkLoggedIn, group.postPost);
    router.get("/member", auth.checkTeacher, group.getMember);
    router.get("/member-request", group.getMemberRequest);
    router.post("/accept-member/:userId", group.postAcceptMember);
    router.post("/refuse-accept-member/:userId", group.postRefuseAcceptMember);
    router.post("/cancel-member/:userId", group.postCancelMember);
    
    // Admin
    router.get("/manage-group/:identify", admin.getMemberByIdentify);
    router.get("/manage-member-request/:identify", admin.getMemberRequestByIdentify);
    router.get("/manage-member-request-all", admin.getMemberRequestAll);
    router.post("/resend-request/:userId", admin.postResendRequest);
    
    // router.get("/manage-group", auth.checkLoggedIn, admin.getGroup);

    // router.get("/profile", async function (req, res) {
    //     res.setHeader("Content-Type", "text/html");
    //     res.render("./student/profile");
    // });

    router.get("/profile", auth.checkLoggedIn, profile.getProfile);
    
    // Notification
    router.get("/notification", auth.checkLoggedIn, notification.getNotification);

    // Friend
    router.get("/friend", auth.checkLoggedIn, friend.getFriend);
    router.get("/friend-request/:userId", friend.getFriendRequest);
    router.get("/friend-suggest/:userId", friend.getFriendSuggest);
    router.post("/send-friend-request/:userId/:contactId", friend.postFriendRequest);
    router.post("/accept-friend/:userId/:contactId", friend.postAcceptFriend);
    router.post("/refuse-accept-friend/:userId/:contactId", friend.postRefuseAcceptFriend);
    router.post("/cancel-friend/:userId/:contactId", friend.postCancelFriend);

    // Comment
    router.post("/comment/:postId/:userId/:comment", comment.postComment);
    router.post("/comment/:postId/:userId/:comment/:groupId", comment.postComment);

    // Personal Page
    router.get("/personal", auth.checkLoggedIn, personal.getPersonal);
    router.post("/personal/post-post", auth.checkLoggedIn, personal.postPost);
    router.post("/personal/post/:postId/:userId/:userIdPost/:like", personal.likePost);
    router.get("/:email", auth.checkLoggedIn, personal.getPersonalById);

    // Notification
    router.get("/notification/:userId", notification.getNotification);
    router.post("/notification/:senderId/:senderUsername/:senderAvatar/:receiverId/:receiverUsername/:receiverAvatar/:content", notification.postNotification);
    router.post("/notification/read/:notificationId", notification.postReadNotification);

    return app.use("/", router);
};

module.exports = initRoutes;