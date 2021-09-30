import {friend} from "./../services/index";
import userModel from './../models/user.model';
import contactModel from './../models/contact.model';

let getFriend = async function(req, res) {
    let friendArr = await friend.getFriend(req, res, req.user._id)
    res.render("./student/friend", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        friendArr: friendArr
    });
};

let getFriendSearch = async function(req, res) {
    let searchValue = req.body["search"];
    console.log(searchValue);
    let friendArr1 = await userModel.search(searchValue);
    // friendArr1[0].status = true;
    let friendArr = []
    for(var i = 0; i < friendArr1.length; i++){
        let sender = await contactModel.search(req.user._id, friendArr1[i]._id);
        let receiver = await contactModel.search(friendArr1[i]._id, req.user._id);
        // console.log(sender);
        if(sender.length != 0){
            if(sender[0].status == true){
                friendArr1[i].status = "true";
                friendArr1[i].sender = "true";
                // console.log(friendArr1[i].status);
            }else if(sender[0].status == false){
                friendArr1[i].status = "false";
                friendArr1[i].sender = "true";
                // console.log(friendArr1[i].avatar);
            }
        }
        if(receiver.length != 0){
            if(receiver[0].status == true){
                friendArr1[i].status = "true";
                friendArr1[i].receiver = "true";
                // console.log(friendArr1[i].status);
            }else if(receiver[0].status == false){
                friendArr1[i].status = "false";
                friendArr1[i].receiver = "true";
                // console.log(friendArr1[i].avatar);
            }
        }
        // console.log("Receiver: ", receiver);
    }
    // console.log(friendArr1);
    for(var i = 0; i < friendArr1.length; i++){
        if(friendArr1[i]._id != req.user.id && friendArr1[i].email != "admin@gmail.com"){
            friendArr.push(friendArr1[i]);
        }
    }
    res.render("./student/search", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        friendArr: friendArr
    });
};

let getFriendRequest = async function(req, res) {
    let friendArr = await friend.getFriendRequest(req, res, req.params.userId);
    res.status(200).send({"data": friendArr});
};

let getFriendSuggest = async function(req, res) {
    let friendArr = await friend.getFriendSuggest(req, res, req.params.userId, req.params.contactId);
    res.status(200).send({"data": friendArr});
};

let postAcceptFriend = async function(req, res) {
    let friendArr = await friend.postAcceptFriend(req, res, req.params.userId, req.params.contactId);
    res.status(200).send({"message": "success"});
};

let postRefuseAcceptFriend = async function(req, res) {
    let friendArr = await friend.postRefuseAcceptFriend(req, res, req.params.userId, req.params.contactId);
    res.status(200).send({"message": "success"});
};

let postCancelFriend = async function(req, res) {
    let friendArr = await friend.postCancelFriend(req, res, req.params.userId, req.params.contactId);
    res.status(200).send({"message": "success"});
};

let postFriendRequest = async function(req, res) {
    let friendArr = await friend.postFriendRequest(req, res, req.params.userId, req.params.contactId);
    res.status(200).send({"message": "success"});
};

module.exports = {
    getFriend: getFriend,
    getFriendRequest: getFriendRequest,
    getFriendSuggest: getFriendSuggest,
    postAcceptFriend: postAcceptFriend,
    postRefuseAcceptFriend: postRefuseAcceptFriend,
    postCancelFriend: postCancelFriend,
    postFriendRequest: postFriendRequest,
    getFriendSearch: getFriendSearch
};