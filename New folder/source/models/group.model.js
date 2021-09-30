import mongoose from "mongoose";

let Schema = mongoose.Schema;

let GroupSchema = new Schema({
    name: String,
    userAmount: {type: Number, min: 1, max: 177},
    userId: String,
    members: [
        {userId: String}
    ],
    posts: [
        {postId: String}
    ],
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model("group", GroupSchema);