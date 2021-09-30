import postModel from './../models/post.model';
import userModel from './../models/user.model';

let getPostByGroupId = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let groupId = req.user.group;
        // console.log(groupId);
        let postArr = await postModel.findByGroupId(groupId);
        // console.log(postArr.length);
        resolve(postArr);
    });
};

let postPost = (req, userId, data) => {
    var formData = {email: req.user.email.split("@")[0], "userId": userId, "username": req.user.username, "groupId": req.user.group};
    Object.keys(data).forEach((key) => {
        formData[key] = data[key];
    });
    return new Promise(async (resolve, reject) =>{
        let post = await postModel.createNew(formData);
        resolve(post);
    });
};

let getMember = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let group = req.user.group;
        let memberArr = await userModel.findByGroup(group);
        resolve(memberArr);
    });
};

let getMemberRequest = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let group = req.user.group;
        let memberArr = await userModel.findRequestByGroup(group);
        resolve(memberArr);
    });
};

let postAcceptMember = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let userId = req.params.userId;
        // console.log(userId);
        let result = await userModel.acceptMember(userId);
        // console.log(result);
        resolve(result);
    });
};

let postRefuseAcceptMember = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        // console.log(userId);
        let userId = req.params.userId;
        let result = await userModel.refuseAcceptMember(userId);
        // console.log(friendArrId);
        resolve(result);
    });
};

let postCancelMember = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let userId = req.params.userId;
        let result = await userModel.cancelMember(userId);
        resolve(result);
    });
};

module.exports = {
    getPostByGroupId: getPostByGroupId,
    postPost: postPost,
    getMember: getMember,
    getMemberRequest: getMemberRequest,
    postAcceptMember: postAcceptMember,
    postRefuseAcceptMember: postRefuseAcceptMember,
    postCancelMember: postCancelMember
};

