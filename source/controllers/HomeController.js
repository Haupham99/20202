// import authen from "./../libs/authen";
import cfg from "./../libs/config";

let getHome = function (req, res) {
    res.render("./student/index");
};

module.exports = {
  getHome: getHome
};