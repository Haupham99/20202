import commentModel from './../models/comment.model';
import postModel from './../models/post.model';

let postComment = (req, res) => {
    let username = req.user.username;
    let avatar = req.user.avatar;
    let userId = req.user.id;
    let email = req.user.email;
    let postId = req.params.postId;
    let comment = req.params.comment;
    let data = {postId: postId, userId: userId, username: username, avatar: avatar, comment: comment, email: email};
    return new Promise(async (resolve, reject) =>{
        let result = await commentModel.createNew(data);
        await postModel.commentPost(postId);
        resolve(result);
    });
};

let getComment = (req, res, postId) => {
    return new Promise(async (resolve, reject) =>{
        let result = await commentModel.getCommentByPostId(postId);
        resolve(result);
    });
};

module.exports = {
    postComment: postComment,
    getComment: getComment
};