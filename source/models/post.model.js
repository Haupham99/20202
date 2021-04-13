import mongoose from "mongoose";

let Schema = mongoose.Schema;

let PostSchema = new Schema({
    userId: String,
    username: String,
    description: String,
    timeAgo: String,
    imageUrl: String,
    image1: String, 
    image2: String,
    image3: String,
    video: String,
    isLiked: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    groupId: String,
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model("post", PostSchema);