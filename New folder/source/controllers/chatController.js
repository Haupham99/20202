import {friend, chat} from "./../services/index";

let getChat = async function (req, res) {
    let friendArr = await friend.getFriend(req, res, req.user._id)
    res.render("./student/chat", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        friendArr: friendArr
    });
};

let getConversation = async (req, res) => {
  let messageArr = await chat.getConversation(req, res);
  return res.status(200).send({data: messageArr});
}

let postChat = async (req, res) => {
  let message = await chat.postChat(req, res);
  return res.status(200).send({data: {"outgoing": message}});
}

module.exports = {
  getChat: getChat,
  getConversation: getConversation,
  postChat: postChat
};