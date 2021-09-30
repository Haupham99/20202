import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    search(userId, contactId){
        return this.find({userId: userId, contactId: contactId});
    },
    
    findRequestByUserId(userId){
        return this.find({contactId: userId, status: false}).sort({createdAt: -1}).exec(); // Find one post
    },

    findByUserId(userId, status){
        return this.find({userId: userId, status: status}).sort({createdAt: -1}).exec(); // Find one post
    },

    findByContactId(contactId, status){
        return this.find({contactId: contactId, status: status}).sort({createdAt: -1}).exec(); // Find one post
    },

    acceptFriend(userId, contactId){
        return this.findOneAndUpdate(
            {userId: userId, contactId: contactId},
            {status: true}
        ).exec();
    },

    refuseAcceptFriend(userId, contactId){
        return this.deleteOne(
            {userId: userId, contactId: contactId, status: false}
        ).exec();
    },

    cancelFriend(userId, contactId){
        this.deleteOne(
            {userId: contactId, contactId: userId, status: true}
        ).exec();
        this.deleteOne(
            {userId: userId, contactId: contactId, status: true}
        ).exec();
        return;
    },
};

module.exports = mongoose.model("contact", ContactSchema);