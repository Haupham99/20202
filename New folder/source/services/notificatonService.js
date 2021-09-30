import contactModel from "./../models/contact.model";
import userModel from "./../models/user.model";
import notificationModel from "./../models/notification.model";

let getNotification = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let notificationArr = await notificationModel.findByUserId(req.params.userId);        
        resolve(notificationArr);
    });
};

let postNotification = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let senderId = req.params.senderId;
		let senderAvatar = req.params.senderAvatar;
		let senderUsername = req.params.senderUsername;
		let receiverId = req.params.receiverId;
		let receiverAvatar = req.params.receiverAvatar;
		let receiverUsername = req.params.receiverUsername;
        let content = req.params.content;
        let data = {
            sender: {
                id: senderId,
                avatar: senderAvatar,
                username: senderUsername
            },
            receiver: {
                id: receiverId,
                avatar: receiverAvatar,
                username: receiverUsername
            },
            content: content
        }
        let notification = await notificationModel.createNew(data);        
        resolve(notification);
    });
};

let postReadNotification = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let notificationArr = await notificationModel.readComment(req.params.notificationId);        
        resolve(notificationArr);
    });
};

module.exports = {
    getNotification: getNotification,
    postNotification: postNotification,
    postReadNotification: postReadNotification
}