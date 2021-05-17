import {home, comment} from "./../services/index";

let getHome = async function(req, res) {
    let postArr = await home.getHome(req, res, req.user._id);
    for(let i = 0; i < postArr.length; i++){
        // console.log(postArr[i]._id);
        let comments = await comment.getComment(req, res, postArr[i]._id)
        // console.log(comments);
        postArr[i].commentList = comments;
        // console.log(postArr[i].commentList);
    }
    res.render("./student/index", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        postArr: postArr
    });
};

module.exports = {
  getHome: getHome
};