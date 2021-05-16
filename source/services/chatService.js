import contactModel from "./../models/contact.model";
import userModel from "./../models/user.model";
import messageModel from "./../models/message.model";

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

let getConversation = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let messageArr = [];
        let messageArrIncoming = [];
        let messageArrOutGoing = [];
        messageArrIncoming = await messageModel.findMessageIncoming(req.params.friendId, req.params.userId);
        messageArrOutGoing = await messageModel.findMessageIncoming(req.params.userId, req.params.friendId);
        let m = 0;
        let k = 0;
        for(var i = m; i < messageArrIncoming.length; i++){
            for(var j = k; j < messageArrOutGoing.length; j++){
                if(messageArrIncoming[i]["createdAt"] < messageArrOutGoing[j]["createdAt"]){
                    m = i+1;
                    messageArr.push({"incoming": messageArrIncoming[i]});
                    break;
                }else{
                    k = j+1;
                    messageArr.push({"outgoing": messageArrOutGoing[j]});
                    continue;
                }
            };
            if(m > i) continue;
            if(k == messageArrOutGoing.length) break;
        };
        for(var j = k; j < messageArrOutGoing.length; j++){
            messageArr.push({"outgoing": messageArrOutGoing[j]});
        }
        for(var i = m; i < messageArrIncoming.length; i++){
            messageArr.push({"incoming": messageArrIncoming[i]});
        }

        resolve(messageArr);
    });
};

let postChat = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let userId = req.params.userId;
        let userUsername = req.params.Username;
        let userAvatar = req.params.userAvatar;
        let friendId = req.params.friendId;
        let friendUsername = req.params.friendUsername;
        let friendAvatar = req.params.friendAvatar;
        let text = req.params.text;
        let data = {
            sender: {
                id: userId,
                username: userUsername,
                avatar: userAvatar
            },
            receiver: {
                id: friendId,
                username: friendUsername,
                avatar: friendAvatar
            },
            text: text
        };
        let message = messageModel.createNew(data);
        resolve(message);
    });
};

module.exports = {
    getFriend: getFriend,
    getConversation: getConversation,
    postChat: postChat
};