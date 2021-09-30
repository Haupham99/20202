import {admin, group, comment} from "./../../services/index";

let getMemberByIdentify = async (req, res) => {
    let memberArr = await admin.getMemberByIdentify(req, res);
    return res.status(200).send({data: memberArr});
};

let getMemberRequestByIdentify = async (req, res) => {
    let memberArr = await admin.getMemberRequestByIdentify(req, res);
    return res.status(200).send({data: memberArr});
};

let getMemberRequestAll = async (req, res) => {
    let memberArr = await admin.getMemberRequestAll(req, res);
    return res.status(200).send({data: memberArr});
};

let postResendRequest = async (req, res) => {
    let result = await admin.postResendRequest(req, res);
    return res.status(200).send({data: "success"});
};

module.exports = {
    getMemberByIdentify: getMemberByIdentify,
    getMemberRequestByIdentify: getMemberRequestByIdentify,
    getMemberRequestAll: getMemberRequestAll,
    postResendRequest: postResendRequest
};