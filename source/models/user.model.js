import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    birthday: String,
    avatar: {type: String, default: "default.jpg"},
    coverAvatar: {type: String, default: "cover-default.jpg"},
    group: {type: String, default: "KHMT-02-K62"},
    // gender: {type: String, default: "male"},
    phone: {type: Number, default: null},
    // address: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean, default: false},
    verifyToken: String,
    joinedGroup: {type: Boolean, default: false},
    rejectedGroup: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    findByEmail(email) {
        return this.findOne({"email": email}).exec();
    },

    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },

    findByToken(token){
        return this.findOne({verifyToken: token}).exec();
    },

    findByGroup(group){
        return this.find({group: group, joinedGroup: true, rejectedGroup: false, role: "user"}).exec();
    },

    findRequestByGroup(group){
        return this.find({group: group, joinedGroup: false, rejectedGroup: false}).exec();
    },

    acceptMember(userId){
        return this.findOneAndUpdate(
            {_id: userId},
            {joinedGroup: true}
        ).exec();
    },

    refuseAcceptMember(userId){
        return this.findOneAndUpdate(
            {_id: userId},
            {rejectedGroup: true}
        ).exec();
    },

    cancelMember(userId){
        return this.findOneAndUpdate(
            {_id: userId},
            {joinedGroup: false, rejectedGroup: true}
        ).exec();
    },

    verify(token) {
        return this.findOneAndUpdate(
            {verifyToken: token},
            {"isActive": true, "verifyToken": null}
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

    findByIdentify(identify){
        return this.find({group: identify, joinedGroup: "true"}).exec();
    },

    findMemberRequestByIdentify(identify){
        return this.find({group: identify, joinedGroup: "false", rejectedGroup: "false"}).exec();
    },

    findMemberRequestAll(){
        return this.find({joinedGroup: "false", rejectedGroup: "false"}).exec();
    },

    postResendRequest(userId){
        return this.findByIdAndUpdate(userId, {rejectedGroup: false}).exec();
    }
};

UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password, this.password);
    }
};

module.exports = mongoose.model("user", UserSchema);