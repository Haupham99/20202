import authen from "./../libs/authen";
import cfg from "./../libs/config";
import {validationResult} from 'express-validator/check';
import {auth} from './../services/index';

let getLogin = async function (req, res) {
  const username = await authen.IsAuthenticated(req.cookies["xxxxx"]);
  if (username) {
      res.redirect("/")
  }
  res.render("./login/login", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
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

let getRegister = (req, res) => {
  res.render("./login/register", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postRegister = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });

    req.flash("errors", errorArr);
    return res.redirect('./register');
  };

  try {
    let createUserSuccess = await auth.register(req.body["email-register"], req.body["pwd-register"]);
    successArr.push(createUserSuccess);
    req.flash("success", successArr);
    return res.redirect('./login');
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect('./register');
  }
};

module.exports = {
  getLogin: getLogin,
  getLogout: getLogout,
  getRegister: getRegister,
  postLogin: postLogin,
  postRegister: postRegister
};