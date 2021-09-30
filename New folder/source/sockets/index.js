import likePost from "./post/likePost";
import commentPost from "./post/commentPost";
import sendMessage from "./chat/sendMessage";

let initSockets = (io) => {
    likePost(io);
    commentPost(io);
    sendMessage(io);
};

module.exports = initSockets;