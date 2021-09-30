import {comment} from './../services/index';

let postComment = async (req, res) => {
    let result = await comment.postComment(req, res);
    return res.status(200).send({data: result});
};

module.exports = {
    postComment: postComment
}