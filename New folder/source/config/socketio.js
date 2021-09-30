let configSocketIo = (io, passportSocketIo, cookieParser, session) => {
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,       // the same middleware you registrer in express
        key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
        secret:       'mySecret',    // the session_secret to parse the cookie
        store:        session,        // we NEED to use a sessionstore. no memorystore please
        success:      (data, accept) => {
            if(!data.user.logged_in) {
                return accept("Invalid user", false);
            }else{
                return accept(null, true);
            }
        },  // *optional* callback on success - read more below
        fail:         (data, message, error, accept) => {
            if(error){
                console.log("Failed to connect to socket.io", message);
                return accept(new Error(message), false);
            }
        },     // *optional* callback on fail/error - read more below
    }));
};

module.exports = configSocketIo;