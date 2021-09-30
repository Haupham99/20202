import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    memberId: String,
    roleId: String,
    username: String,
    avatar: {type: String, default: "default.jpg"},
    coverAvatar: {type: String, default: "cover-default.jpg"},
    group: {type: String, default: "Khoa học máy tính 02-K62"},
    role: {type: String, default: "user"},
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean, default: false},
    verifyToken: String,
    resetToken: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    search(searchValue){
        return this.find({"username" : {$regex : ".*"+ searchValue +".*"}})
    },

    findByEmail(email) {
        return this.findOne({"email": email}).exec();
    },

    findByEmailAndUpdate1(email, groupName) {
        return this.findOneAndUpdate(
            {email: email},
            {group: groupName}
        ).exec();
    },

    findByEmailAndUpdate(user) {
        return this.findOneAndUpdate(
            {email: user.email},
            {resetToken: user.resetToken}
        ).exec();
    },

    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },

    findByToken(token){
        return this.findOne({verifyToken: token}).exec();
    },

    findByResetToken(resetToken){
        return this.findOne({resetToken: resetToken}).exec();
    },

    findByGroup(group){
        return this.find({group: group}).exec();
    },

    // findRequestByGroup(group){
    //     return this.find({group: group, joinedGroup: false, rejectedGroup: false}).exec();
    // },

    // acceptMember(userId){
    //     return this.findOneAndUpdate(
    //         {_id: userId},
    //         {joinedGroup: true}
    //     ).exec();
    // },

    // refuseAcceptMember(userId){
    //     return this.findOneAndUpdate(
    //         {_id: userId},
    //         {rejectedGroup: true}
    //     ).exec();
    // },

    // cancelMember(userId){
    //     return this.findOneAndUpdate(
    //         {_id: userId},
    //         {joinedGroup: false, rejectedGroup: true}
    //     ).exec();
    // },

    verify(token) {
        return this.findOneAndUpdate(
            {verifyToken: token},
            {"isActive": true, "verifyToken": null}
        ).exec();
    },

    verifyReset(token) {
        return this.findOneAndUpdate(
            {resetToken: token},
            {"isActive": true, "resetToken": null}
        ).exec();
    },

    findUserById(id) {
        return this.findById(id).exec();
    },

    updateUser(id, item){
        return this.findByIdAndUpdate(id, item).exec(); //return old item after updated
    },

    updatePassword(id, password){
        return this.findByIdAndUpdate(id, {password: password, updatedAt: Date.now()}).exec();
    },

    // findByIdentify(identify){
    //     return this.find({group: identify, joinedGroup: "true"}).exec();
    // },

    // findMemberRequestByIdentify(identify){
    //     return this.find({group: identify, joinedGroup: "false", rejectedGroup: "false"}).exec();
    // },

    // findMemberRequestAll(){
    //     return this.find({joinedGroup: "false", rejectedGroup: "false"}).exec();
    // },

    // postResendRequest(userId){
    //     return this.findByIdAndUpdate(userId, {rejectedGroup: false}).exec();
    // }
};

UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password, this.password);
    }
};

module.exports = mongoose.model("user", UserSchema);