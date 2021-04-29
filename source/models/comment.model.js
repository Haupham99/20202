import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    index: {type: Number, default: 0},
    postId: String,
    userId: String,
    username: String,
    avatar: String,
    comment: String,
    email: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

CommentSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    getCommentByPostId(postId) {
        return this.find({postId: postId}).exec();
    }
};

module.exports = mongoose.model("comment", CommentSchema);