import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    index: {type: Number, default: 0},
    postId: String,
    userId: String,
    username: String,
    avatar: String,
    comment: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model("comment", CommentSchema);