import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    birthday: String,
    avatar: String,
    class: String,
    // gender: {type: String, default: "male"},
    phone: {type: Number, default: null},
    // address: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean, default: false},
    verifyToken: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model("user", UserSchema);