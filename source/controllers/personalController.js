import {personal} from "./../services/index";

let getPersonal = async function(req, res) {
    let postArr = await personal.getPost(req, req.user._id)
    res.render("./student/personal", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        postArr: postArr
    });
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

module.exports = {
    getPersonal: getPersonal,
    postPost: postPost
};