import {personal} from "./../services/index";
import UserModel from './../models/user.model';

let getPersonal = async function(req, res) {
    let postArr = await personal.getPost(req, req.user._id)
    res.render("./student/personal", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        postArr: postArr
    });
};

let getPersonalById = async function(req, res){
    try {
        let email = req.params.email + "@gmail.com";
        let userByEmail = await UserModel.findByEmail(email);
        let postArr = await personal.getPost(req, userByEmail._id);
        res.render("./student/personal-by-email", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            userByEmail: userByEmail,
            postArr: postArr,
            user: req.user
        });
    } catch (error) {

    }
};

let postPost = async function(req, res) {
    let data = req.body;
    try {
        let post = await personal.postPost(req, req.user._id, data);
        if(post){
            req.post = post;
            // res.status("200").send({"message": "Success"});
            return res.redirect("/personal");
        }
    } catch (error) {
        console.log(error);
        // res.status("500").send({"message": "Failed"});
        return res.redirect("/personal");
    }
};

let likePost = async (req, res) => {
    try {
        let post = await personal.likePost(req, res);
        if(post){
            req.post = post;
            res.status("200").send({"message": "Success", "likes": post.likes + 1});
        }
    } catch (error) {
        console.log(error);
        res.status("500").send({"message": "Failed"});
    }
};

module.exports = {
    getPersonal: getPersonal,
    postPost: postPost,
    likePost: likePost,
    getPersonalById: getPersonalById
};