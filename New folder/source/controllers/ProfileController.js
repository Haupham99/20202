let getProfile = function (req, res) {
    res.render("./student/profile", {
      errors: req.flash("errors"),
      success: req.flash("success"),
      user: req.user
    });
};

let getChangePassword = function (req, res) {
  res.render("./student/change-password", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user
  });
};

module.exports = {
    getProfile: getProfile,
    getChangePassword: getChangePassword
};