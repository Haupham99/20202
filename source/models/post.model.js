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
    image4: String,
    video: String,
    isLiked: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    email: {type: String, trim: true},
    groupId: {type: String, default: null},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

PostSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    
    findByUserId(userId){
        return this.find({userId: userId, deletedAt: null, groupId: null}).sort({createdAt: -1}).exec();
    },

    findByGroupId(groupId){
        return this.find({groupId: groupId, deletedAt: null}).sort({createdAt: -1}).exec();
    },

    likePost(id, data){
        return this.findByIdAndUpdate(id, data).exec();
    },

    deletePost(id){
        // console.log(Math.round((new Date()).getTime() / 1000));
        return this.findByIdAndUpdate(id, {"deletedAt": Math.round((new Date()).getTime())}).exec();
    },

    commentPost(id){
        return this.findByIdAndUpdate(id, {$inc : {'comments' : 1}}).exec();
    },

    getHome(userId){
        return this.find({userId: userId, deletedAt: null, groupId: null}).sort({createdAt: -1}).exec();
    }
};

module.exports = mongoose.model("post", PostSchema);