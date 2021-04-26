import postModel from './../models/post.model';

let getPost = (req, userId) => {
    return new Promise(async (resolve, reject) =>{
        let postArr = await postModel.findByUserId(userId);
        resolve(postArr);
    });
};

let postPost = (req, userId, data) => {
    var formData = {email: req.user.email.split("@")[0], "userId": userId, "username": req.user.username};
    Object.keys(data).forEach((key) => {
        formData[key] = data[key];
    });
    return new Promise(async (resolve, reject) =>{
        let post = await postModel.createNew(formData);
        resolve(post);
    });
};

let likePost = (req, res) => {
    let userId = req.params.userId;
    let userIdPost = req.params.userIdPost;
    let postId = req.params.postId;
    let like = parseInt(req.params.like);
    return new Promise(async (resolve, reject) =>{
        let data = {userId: userIdPost, likes: like + 1};
        if(userId == userIdPost){
            data.isLiked = true;
        }
        let result = await postModel.likePost(postId, data);
        // req.postArr = postArr;
        // let postArr = await postModel.findByUserId(userId);
        resolve(result);
    });
}

module.exports = {
    postPost: postPost,
    getPost: getPost,
    likePost: likePost
};