import contactModel from "./../models/contact.model";
import userModel from "./../models/user.model";

let getFriend = (req, res, userId) => {
    return new Promise(async (resolve, reject) =>{
        let friendArr = [];
        let friendArrIdByUserId = await contactModel.findByUserId(userId);
        let friendArrIdByContactId = await contactModel.findByContactId(userId);
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
        let friendArrIdByUserId = await contactModel.findByUserId(userId);
        let friendArrIdByContactId = await contactModel.findByContactId(userId);
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

module.exports = {
    getFriend: getFriend,
    getFriendRequest: getFriendRequest,
    getFriendSuggest: getFriendSuggest,
    postAcceptFriend: postAcceptFriend,
    postRefuseAcceptFriend: postRefuseAcceptFriend,
    postCancelFriend: postCancelFriend
};