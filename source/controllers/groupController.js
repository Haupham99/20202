import {group, comment} from "./../services/index";
import memberModel from './../models/member.model';
import groupModel from './../models/group.model';
import multer from 'multer';
import {app} from "./../config/app";

let getGroup = async function (req, res) {
    let postArr = await group.getPostByGroupId(req, res);
    let memberArr = await group.getMember(req, res)
    for(let i = 0; i < postArr.length; i++){
      let comments = await comment.getComment(req, res, postArr[i]._id)
      postArr[i].commentList = comments;
    }
    let memberData = await memberModel.findByEmail(req.user.email);
    let groupData = await groupModel.findById(memberData.groupId);
    // console.log(groupData);
    if(req.user.role == "user"){
        res.render("./student/group", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            postArr: postArr,
            groupAvatar: groupData.avatar
        });
    }else if(req.user.role == "teacher"){
        res.render("./teacher/group", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            postArr: postArr,
            groupAvatar: groupData.avatar
        });
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

let storageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.avatar_directory);
    },
    filename: (req, file, callback) => {
        let math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transErrors.avatar_type, null);
        }

        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null, avatarName);
    }
});

let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {fileSize: app.avatar_limit_size}
}).single("avatar");

let updateAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if(error){
            console.log(error);
            return;
        }
        try {
            // console.log(group);
            var updateGroupItem = {
                avatar: req.params.fileName,
                updateAt: Date.now(),
            };
            // console.log(updateGroupItem);
            // Update group
            let userUpdate = await group.updateGroup(req.params.groupName, req.params.fileName);
            // req.flash("success", transSuccess.avatar_updated);
            return res.redirect("/group");
        } catch (error) {
            console.log(error);
            // return res.status(500).send(error);
            // req.flash("errors", transErrors.avatar_update_failed);
            return res.redirect("/group");
        }
    });
};

module.exports = {
    getGroup: getGroup,
    postPost: postPost,
    getMember: getMember,
    getMemberRequest: getMemberRequest,
    postAcceptMember: postAcceptMember,
    postRefuseAcceptMember: postRefuseAcceptMember,
    postCancelMember: postCancelMember,
    updateAvatar: updateAvatar
};