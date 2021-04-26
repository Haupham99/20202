import {friend} from "./../services/index";

let getFriend = async function(req, res) {
    let friendArr = await friend.getFriend(req, res, req.user._id)
    res.render("./student/friend", {
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
    res.status(200).send({"message": "success"});
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
}

module.exports = {
    getFriend: getFriend,
    getFriendRequest: getFriendRequest,
    getFriendSuggest: getFriendSuggest,
    postAcceptFriend: postAcceptFriend,
    postRefuseAcceptFriend: postRefuseAcceptFriend,
    postCancelFriend: postCancelFriend
};