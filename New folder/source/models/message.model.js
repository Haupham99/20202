import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
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
    text: String,
    file: {data: Buffer, contentType: String, fileName: String},
    isRead: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

MessageSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findMessageIncoming(senderId, receiverId){
        return this.find({ 'sender.id': senderId, 'receiver.id': receiverId }).sort({createdAt: 1}).exec();
    },
    findMessageOutgoing(senderId, receiverId){
        return this.find({ 'sender.id': senderId, 'receiver.id': receiverId }).sort({createdAt: 1}).exec();
    }
};


module.exports = mongoose.model("message", MessageSchema);