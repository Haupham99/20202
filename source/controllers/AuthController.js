import authen from "./../libs/authen";
import cfg from "./../libs/config";

let getLoginRegister = async function (req, res) {
  const username = await authen.IsAuthenticated(req.cookies["xxxxx"]);
  if (username) {
      res.redirect("/")
  }
  res.render("./login/login", {layout: false});
};

let getLogout = (req, res) => {
  res.cookie("xxxxx", "");
  res.redirect("/");
};

let postLogin = (req, res) => {
  let email = req.body.email;
  let pwd = req.body.pwd;
  console.log(email, pwd);
  let token = authen.GeneralJWT(pwd, email);
  if (token) {
      res.cookie("xxxxx", token, {
          maxAge: 1 * 60 * 6000 * cfg.authen['expiresIn']
      }); //token được encode thành xxxxx
      
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