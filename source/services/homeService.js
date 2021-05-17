import postModel from './../models/post.model';
import contactModel from './../models/contact.model';
import friend from './friendService';

let getHome = (req, res, userId) => {
    return new Promise(async (resolve, reject) =>{
        let postArr = [];
        let friendArr = await friend.getFriend(req, res, userId);
        for(var i = 0; i < friendArr.length; i++){
            let postArr1 = await postModel.findByUserId(friendArr[i]._id);
            postArr1.forEach(post => {
                if(post.groupId == undefined){
                    postArr.push(post);
                };
            });
        }
        postArr.sort(function(a, b){return b["createdAt"] - a["createdAt"]});
        resolve(postArr.slice(0, 10));
    });
};

module.exports = {
    getHome: getHome
};