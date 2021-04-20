// import authen from "./../libs/authen";
import cfg from "./../libs/config";

let getHome = function (req, res) {
    res.render("./student/index", {
      errors: req.flash("errors"),
      success: req.flash("success"),
      user: req.user
    });
};

module.exports = {
  getHome: getHome
};