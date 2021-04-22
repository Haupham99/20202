import { reject, resolve } from 'bluebird';
import postModel from './../models/post.model';

let getPost = (req, userId) => {
    return new Promise(async (resolve, reject) =>{
        let postArr = await postModel.findByUserId(userId);
        resolve(postArr);
    });
};

let postPost = (req, userId, data) => {
    var formData = {"userId": userId, "username": req.user.username};
    Object.keys(data).forEach((key) => {
        formData[key] = data[key];
    });
    // console.log(formData);
    return new Promise(async (resolve, reject) =>{
        // console.log(postArr);
        let post = await postModel.createNew(formData);
        // req.postArr = postArr;
        // let postArr = await postModel.findByUserId(userId);
        resolve(post);
    });
};

module.exports = {
    postPost: postPost,
    getPost: getPost
};