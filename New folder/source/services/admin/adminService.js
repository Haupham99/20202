import postModel from './../../models/post.model';
import userModel from './../../models/user.model';

let getMemberByIdentify = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let identify = req.params.identify;
        // console.log(groupId);
        // let postArr = await postModel.findByGroupId(groupId);
        // console.log(postArr.length);
        let memberArr = await userModel.findByIdentify(identify);
        let memberArr1 = [];
        memberArr.forEach((member) => {
            memberArr1.push({'avatar': member["avatar"], 'coverAvatar': member['coverAvatar'],
            'group': member['group'], 'username': member['username'], 'email': member['email'],
            'role': member['role'], 'id': member['id'] });
        });
        // console.log(memberArr1);
        let teacherArr = memberArr1.filter((member) => {
            member['role'] == 'teacher';
        });
        let userArr = memberArr1.filter((member) => {
            member['role'] == 'user';
        });
        resolve(memberArr1);
    });
};

let getMemberRequestByIdentify = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let identify = req.params.identify;
        // console.log(groupId);
        // let postArr = await postModel.findByGroupId(groupId);
        // console.log(postArr.length);
        let memberArr = await userModel.findMemberRequestByIdentify(identify);
        let memberArr1 = [];
        memberArr.forEach((member) => {
            memberArr1.push({'avatar': member["avatar"], 'coverAvatar': member['coverAvatar'],
            'group': member['group'], 'username': member['username'], 'email': member['email'],
            'role': member['role'], 'id': member['id'] });
        });
        resolve(memberArr1);
    });
};

let getMemberRequestAll = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let identify = req.params.identify;
        // console.log(groupId);
        // let postArr = await postModel.findByGroupId(groupId);
        // console.log(postArr.length);
        let memberArr = await userModel.findMemberRequestAll(identify);
        let memberArr1 = [];
        memberArr.forEach((member) => {
            memberArr1.push({'avatar': member["avatar"], 'coverAvatar': member['coverAvatar'],
            'group': member['group'], 'username': member['username'], 'email': member['email'],
            'role': member['role'], 'id': member['id'] });
        });
        resolve(memberArr1);
    });
};

let postResendRequest = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let userId = req.params.userId;
        let result = await userModel.postResendRequest(userId);
        resolve(result);
    });
};

module.exports = {
    getMemberByIdentify: getMemberByIdentify,
    getMemberRequestByIdentify: getMemberRequestByIdentify,
    getMemberRequestAll: getMemberRequestAll,
    postResendRequest: postResendRequest
};

