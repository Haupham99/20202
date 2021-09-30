/**
 * 
 * @param {*} io from socket.io lib 
 */
 let commentPost = (io) => {
    let clients = {};
    io.on("connection", (socket) => {

        // Push socket id to array
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id);
        }else{
            clients[currentUserId] = [socket.id];
        }
        socket.on("comment-post", (data) => {
            console.log(data);
            console.log(clients);
            // console.log(socket.request.user);
            let currentUser = {
                avatar: socket.request.user.avatar,
                username: socket.request.user.username,
                id: socket.request.user._id
            };
            // Emit notification
            // console.log(clients);
            // console.log(data.postId);
            // console.log(clients[data.userIdPost]);
            if(clients[data.userIdPost]){
                // console.log(clients[data.userIdPost]);
                clients[data.userIdPost].forEach(socketId => {
                    io.sockets.connected[socketId].emit("response-comment-post", currentUser);
                });
            };
        });

        socket.on("disconnect", ()=>{
            clients[currentUserId] = clients[currentUserId].filter(socketId => socketId !== socket.id);
            
            if(!clients[currentUserId].length){
                delete clients[currentUserId];
            };
        });
        // console.log(clients);
    });
};

module.exports = commentPost;