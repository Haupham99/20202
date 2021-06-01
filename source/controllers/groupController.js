import {group, comment} from "./../services/index";

let getGroup = async function (req, res) {
    let postArr = await group.getPostByGroupId(req, res);
    let memberArr = await group.getMember(req, res)
    for(let i = 0; i < postArr.length; i++){
      // console.log(postArr[i]._id);
      let comments = await comment.getComment(req, res, postArr[i]._id)
      // console.log(comments);
      postArr[i].commentList = comments;
      // console.log(postArr[i].commentList);
    }
    if(req.user.role == "user"){
        if(req.user.joinedGroup == false){
            res.render("./student/groupNone", {
                errors: req.flash("errors"),
                success: req.flash("success"),
                user: req.user,
            });
        }else{
            res.render("./student/group", {
                errors: req.flash("errors"),
                success: req.flash("success"),
                user: req.user,
                postArr: postArr
            });
        }
    }else if(req.user.role == "teacher"){
        if(req.user.joinedGroup == true){
            res.render("./teacher/group", {
                errors: req.flash("errors"),
                success: req.flash("success"),
                user: req.user,
                postArr: postArr
            });
        }else{
            res.render("./teacher/groupNone", {
                errors: req.flash("errors"),
                success: req.flash("success"),
                user: req.user,
            });
        }
    }else if(req.user.role == "admin"){
        res.render("./admin/member", {
          errors: req.flash("errors"),
          success: req.flash("success"),
          user: req.user,
          memberArr: memberArr
        });
    }
};

let postPost = async function(req, res) {
  let data = req.body;
  try {
      let post = await group.postPost(req, req.user._id, data);
      if(post){
          req.post = post;
          // res.status("200").send({"message": "Success"});
          return res.redirect("/group");
      }
  } catch (error) {
      console.log(error);
      // res.status("500").send({"message": "Failed"});
      return res.redirect("/group");
  }
};

let getMember = async function(req, res) {
  let memberArr = await group.getMember(req, res)
  res.render("./teacher/member", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user,
    memberArr: memberArr
  });
};

let getMemberRequest = async function(req,res) {
    let memberArr = await group.getMemberRequest(req, res);
    res.status(200).send({"data": memberArr});
};

let postAcceptMember = async function(req, res) {
    let member = await group.postAcceptMember(req, res);
    res.status(200).send({"message": "accept success"});
};

let postRefuseAcceptMember = async function(req, res) {
    let member = await group.postRefuseAcceptMember(req, res);
    res.status(200).send({"message": "refuse success"});
};

let postCancelMember = async function(req, res) {
    let member = await group.postCancelMember(req, res);
    res.status(200).send({"message": "cancel success"});
};

module.exports = {
    getGroup: getGroup,
    postPost: postPost,
    getMember: getMember,
    getMemberRequest: getMemberRequest,
    postAcceptMember: postAcceptMember,
    postRefuseAcceptMember: postRefuseAcceptMember,
    postCancelMember: postCancelMember
};