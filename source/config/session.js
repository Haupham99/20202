import session from 'express-session';
// import expressEjsExtend from 'exp'
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

let DB_CONNECTION = "mongodb";
let DB_HOST = "localhost";
let DB_PORT = "27017";
let DB_NAME = "soictnet";
let DB_USERNAME = "";
let DB_PASSWORD = "";

/**
 * This variable is where save session, in this case is mongodb
 */
let sessionStore = new MongoStore({
    url: `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    autoReconnect: true
    // autoRemove: "native"
});

/**
 * Config session for app
 * @param app from exactly express module
 */

let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 864000 seconds = 1 day 
        }
    }));
};

module.exports = configSession;