let getChat = function (req, res) {
    res.render("./student/chat", {
      errors: req.flash("errors"),
      success: req.flash("success"),
      user: req.user
    });
};

module.exports = {
  getChat: getChat
};