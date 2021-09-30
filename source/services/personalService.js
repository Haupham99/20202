import postModel from './../models/post.model';

let getPost = (req, userId) => {
    return new Promise(async (resolve, reject) =>{
        let postArr = [];
        let postArr1 = await postModel.findByUserId(userId);
        postArr1.forEach(post => {
            if(post.groupId == undefined){
                postArr.push(post);
            };
        });
        resolve(postArr);
    });
};

let getPostByGroupId = (req, res) => {
    return new Promise(async (resolve, reject) =>{
        let postArr = await postModel.findByGroupId(groupId);
        resolve(postArr);
    });
}

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

let deletePost = (req, res) => {
    let postId = req.params.postId;
    return new Promise(async (resolve, reject) =>{
        let result = await postModel.deletePost(postId);
        // req.postArr = postArr;
        // let postArr = await postModel.findByUserId(userId);
        // console.log(result);
        resolve(result);
    });
}

module.exports = {
    postPost: postPost,
    getPost: getPost,
    likePost: likePost,
    getPostByGroupId: getPostByGroupId,
    deletePost: deletePost
};