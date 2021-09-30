import {home, comment, group} from "./../services/index";
import memberModel from './../models/member.model';
import groupModel from './../models/group.model';
import facultieModel from './../models/facultie.model';
import userModel from './../models/user.model';

let getHome = async function(req, res) {
    let postArr = await home.getHome(req, res, req.user._id);
    for(let i = 0; i < postArr.length; i++){
        let comments = await comment.getComment(req, res, postArr[i]._id)
        postArr[i].commentList = comments;
    }
    if(req.user.role == "admin"){
        let faculties = await facultieModel.findAll();
        // console.log(faculties);
        res.render("./admin/member", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            postArr: postArr,
            facultieArr: faculties
        });
    }else{
        res.render("./student/index", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            postArr: postArr
        });
    }
};

let getGroup = async function(req, res){
    // console.log(req.params.facultyId);
    let groupArr = await groupModel.getGroup(req.params.facultyId);
    // console.log(groupArr);
    res.status(200).send({"data": groupArr});
};

let getMember = async function(req, res){
    // console.log(req.params.facultyId);
    let memberArr = await memberModel.getMember(req.params.groupId);
    // console.log(groupArr);
    res.status(200).send({"data": memberArr});
};

let addMember = async function(req, res){
    // console.log(req.params.facultyId);
    let email = await memberModel.findByEmail(req.params.email);
    // console.log(email);
    if(email){
        res.status(200).send({"data": "Tài khoản email đã tồn tại"});
    }else{
        let member = await memberModel.addMember(req.params.email, req.params.groupId, req.params.roleId);
        // console.log(groupArr);
        res.status(200).send({"data": "Thêm tài khoản mới thành công"});
    }
};

let editMember = async function(req, res){
    // console.log(req.params.facultyId);
    // let email = await memberModel.findByEmail(req.params.email);
    // console.log(email);
    // if(email){
        // res.status(200).send({"data": "Tài khoản email đã tồn tại"});
    // }else{
        await memberModel.editMember(req.params.email);
        let group = await groupModel.findById(req.params.groupId);
        console.log(group.groupName);
        await userModel.findByEmailAndUpdate1(req.params.email, group.groupName);
        let member = await memberModel.addMember(req.params.email, req.params.groupId, req.params.roleId);
        // console.log(groupArr);
        res.status(200).send({"data": "Cập nhật tài khoản thành công"});
    // }
};

let addFaculty = async function(req, res){
    let faculty = await facultieModel.findByName(req.params.facultyName);
    if(faculty){
        res.status(200).send({"data": "Viện đã tồn tại"});
    }else{
        await facultieModel.addFaculty(req.params.facultyName);
        res.status(200).send({"data": "Thêm viện mới thành công"});
    } 
};

let addGroup = async function(req, res){
    let group = await groupModel.findByName(req.params.groupName);
    if(group){
        res.status(200).send({"data": "Lớp đã tồn tại"});
    }else{
        await groupModel.addGroup(req.params.facultyId, req.params.groupName);
        res.status(200).send({"data": "Thêm lớp mới thành công"});
    } 
};

module.exports = {
  getHome: getHome,
  getGroup: getGroup,
  getMember: getMember,
  addMember: addMember,
  editMember: editMember,
  addFaculty: addFaculty,
  addGroup: addGroup
};