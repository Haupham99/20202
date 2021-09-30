/**
 * 
 * @param {*} io from socket.io lib 
 */
 let sendMessage = (io) => {
    let clients = {};
    io.on("connection", (socket) => {

        // Push socket id to array
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id);
        }else{
            clients[currentUserId] = [socket.id];
        }
        socket.on("send-message", (data) => {
            // console.log(data);
            // console.log(clients);
            // console.log(data);
            // console.log(socket.request.user);
            let currentUser = {
                avatar: socket.request.user.avatar,
                username: socket.request.user.username,
                id: socket.request.user._id,
                text: data.text
            };
            // console.log(clients[data.friendId]);
            // Emit notification
            if(clients[data.friendId]){
                // console.log(clients[data.friendId]);
                clients[data.friendId].forEach(socketId => {
                    // console.log("Send message Backend!");
                    io.sockets.connected[socketId].emit("response-send-message", currentUser);
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

module.exports = sendMessage;