import express from 'express';
import expressEjsExtend from 'express-ejs-extend';

/**
 * Config view engine for app
 * @param {*} app 
 */

let configViewEngine = (app) => {
    app.engine("ejs", expressEjsExtend);
    app.set("view engine", "ejs");
    app.set("views", "./source/views");
};

module.exports = configViewEngine;