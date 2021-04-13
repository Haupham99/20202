const mongoose = require("mongoose");
const bluebird = require("bluebird");

/**
 * Connect to MongoDB
 */

let connectDB = () => {
    mongoose.Promise = bluebird;

    let DB_CONNECTION = "mongodb";
    let DB_HOST = "localhost";
    let DB_PORT = "27017";
    let DB_NAME = "soictnet";
    let DB_USERNAME = "";
    let DB_PASSWORD = "";

    let URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    return mongoose.connect(URI, {useMongoClient: true});
}

let getUser = (email, password) => {
    //
}

module.exports = {
    connectDB: connectDB,
    getUser: getUser
};