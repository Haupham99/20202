import contactModel from "./../models/contact.model";
import userModel from "./../models/user.model";

let getFriend = (req, res, userId) => {
    return new Promise(async (resolve, reject) =>{
        let friendArr = [];
        let friendArrIdByUserId = await contactModel.findByUserId(userId, true);
        let friendArrIdByContactId = await contactModel.findByContactId(userId, true);
        for(var i = 0; i < friendArrIdByUserId.length; i++){
            let friendByContactId = await userModel.findUserById(friendArrIdByUserId[i].contactId);
            friendArr.push(friendByContactId);
        };
        for(var i = 0; i < friendArrIdByContactId.length; i++){
            let friendByUserId = await userModel.findUserById(friendArrIdByContactId[i].userId);
            friendArr.push(friendByUserId);
        };
        resolve(friendArr);
    });
};

let getFriendRequest = (req, res, userId) => {
    return new Promise(async (resolve, reject) =>{
        // console.log(userId);
        let friendArr = [];
        let friendArrId = await contactModel.findRequestByUserId(userId);
        // console.log(friendArrId);
        for(var i = 0; i < friendArrId.length; i++){
            let friend = await userModel.findUserById(friendArrId[i].userId);
            friendArr.push({avatar: friend.avatar, username: friend.username, email: friend.email, id: friend.id});
        };
        resolve(friendArr);
    });
};

let getFriendSuggest = (req, res, userId) => {
    return new Promise(async (resolve, reject) =>{
        let friendArr = [];
        let friendArrId = [];
        let friendArrIdByUserId1 = await contactModel.findByUserId(userId, true);
        let friendArrIdByUserId2 = await contactModel.findByUserId(userId, false);
        let friendArrIdByContactId1 = await contactModel.findByContactId(userId, true);
        let friendArrIdByContactId2 = await contactModel.findByContactId(userId, false);
        for(var i = 0; i < friendArrIdByUserId1.length; i++){
            let friendByContactId1 = await userModel.findUserById(friendArrIdByUserId1[i].contactId);
            friendArr.push(friendByContactId1);
        };
        for(var i = 0; i < friendArrIdByUserId2.length; i++){
            let friendByContactId2 = await userModel.findUserById(friendArrIdByUserId2[i].contactId);
            friendArr.push(friendByContactId2);
        };
        for(var i = 0; i < friendArrIdByContactId1.length; i++){
            let friendByUserId1 = await userModel.findUserById(friendArrIdByContactId1[i].userId);
            friendArr.push(friendByUserId1);
        };
        for(var i = 0; i < friendArrIdByContactId2.length; i++){
            let friendByUserId2 = await userModel.findUserById(friendArrIdByContactId2[i].userId);
            friendArr.push(friendByUserId2);
        };
        let friendArrAll1 = await userModel.findByGroup(req.user.group);
        let friendArrAll = [];
        for(var i = 0; i < friendArrAll1.length; i++){
            friendArrAll.push({avatar: friendArrAll1[i].avatar, username: friendArrAll1[i].username, email: friendArrAll1[i].email, _id: friendArrAll1[i].id})
        }
        let user = await userModel.findUserById(req.user._id);
        // console.log("Friend All: ", friendArrAll);
        // console.log("Friend: ", friendArr);
        for(var i = 0; i < friendArr.length; i++){
            friendArrId.push(friendArr[i]._id.toString().trim());
        }
        // console.log(friendArrId);
        // console.log(friendArrAll[0]._id);
        // console.log(friendArrAll[1]._id.toString().trim() === friendArrId[0].toString().trim());
        // console.log(friendArrAll[2]._id);
        // console.log(friendArrAll[3]._id);
        // console.log(friendArrAll[4]._id);

        // console.log(friendArrId.includes(friendArrAll[0]._id.toString().trim()));
        // console.log(friendArrId.includes(friendArrAll[1]._id.toString().trim()));
        // console.log(friendArrId.includes(friendArrAll[2]._id.toString().trim()));
        // console.log(friendArrId.includes(friendArrAll[3]._id.toString().trim()));
        // console.log(friendArrId.includes(friendArrAll[4]._id.toString().trim()));

        let result = friendArrAll.filter(item => !(friendArrId.includes(item._id.toString().trim()) || item._id.toString().trim() == user._id.toString().trim() ));
        // let result = result.filter(item => item._id.toString().trim() == user._id.toString().trim());

        // console.log("Suggest friend: ", result);
        resolve(result);
    });
};

let postAcceptFriend = (req, res, userId, contactId) => {
    return new Promise(async (resolve, reject) =>{
        // console.log(userId);
        let result = await contactModel.acceptFriend(userId, contactId);
        // console.log(friendArrId);
        resolve(result);
    });
};

let postRefuseAcceptFriend = (req, res, userId, contactId) => {
    return new Promise(async (resolve, reject) =>{
        // console.log(userId);
        let result = await contactModel.refuseAcceptFriend(userId, contactId);
        // console.log(friendArrId);
        resolve(result);
    });
};

let postCancelFriend = (req, res, userId, contactId) => {
    return new Promise(async (resolve, reject) =>{
        let result = await contactModel.cancelFriend(userId, contactId);
        resolve(result);
    });
};

let postFriendRequest = (req, res, userId, contactId) => {
    return new Promise(async (resolve, reject) =>{
        let result = await contactModel.createNew({userId: userId, contactId: contactId});
        resolve(result);
    });
};

module.exports = {
    getFriend: getFriend,
    getFriendRequest: getFriendRequest,
    getFriendSuggest: getFriendSuggest,
    postAcceptFriend: postAcceptFriend,
    postRefuseAcceptFriend: postRefuseAcceptFriend,
    postCancelFriend: postCancelFriend,
    postFriendRequest: postFriendRequest
};