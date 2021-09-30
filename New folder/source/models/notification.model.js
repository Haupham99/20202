import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    sender: {
        id: String,
        username: String,
        avatar: String
    },
    receiver: {
        id: String,
        username: String,
        avatar: String
    },
    type: String,
    content: String,
    isRead: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now}
});

NotificationSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    
    findByUserId(userId){
        return this.find({ 'receiver.id': userId }).exec();
    },

    likePost(id, data){
        return this.findByIdAndUpdate(id, data).exec();
    },

    readComment(notificationId){
        return this.findByIdAndUpdate(notificationId, {'isRead' : true}).exec();
    }
};

module.exports = mongoose.model("notification", NotificationSchema);