import authen from "./../libs/authen";
import cfg from "./../libs/config";

let getLoginRegister = async function (req, res) {
  const username = await authen.IsAuthenticated(req.cookies["dG9rZW4"]);
  if (username) {
      res.redirect("/")
  }
  res.render("./login/login", {layout: false});
};

let getLogout = (req, res) => {
  res.cookie("dG9rZW4", "");
  res.redirect("/");
};

let postLogin = (req, res) => {
  let token = authen.GeneralJWT(req.body.pwd);
  if (token) {
      res.cookie("dG9rZW4", token, {
          maxAge: 1 * 60 * 6000 * cfg.authen['expiresIn']
      }); //token được encode thành dG9rZW4
      
      res.redirect("/index");
      
  } else {
      res.redirect("/login");
  }
}

module.exports = {
  getLoginRegister: getLoginRegister,
  getLogout: getLogout,
  postLogin: postLogin
};