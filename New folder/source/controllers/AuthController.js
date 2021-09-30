// import authen from "./../libs/authen";
import cfg from "./../libs/config";
import {validationResult} from 'express-validator/check';
import {auth} from './../services/index';

let getLogin = async function (req, res) {
  res.render("./login/login", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let getLogout = (req, res) => {
  req.logout(); // Remove session passport
  return res.redirect("/login");
};

// let postLogin = async (req, res) => {
//   let email = req.body.email;
//   let pwd = req.body.pwd;
//   let errorArr = [];
//   let successArr = [];
  
//   let validationErrors = validationResult(req);
//   if(!validationErrors.isEmpty()){
//     let errors = Object.values(validationErrors.mapped());
//     errors.forEach((item) => {
//       errorArr.push(item.msg);
//     });

//     req.flash("errors", errorArr);
//     return res.redirect('/login');
//   };

//   try {
//     let loginUserSuccess = await auth.login(email, pwd);
//     successArr.push(loginUserSuccess);
//     req.flash("success", successArr);
//     // let token = authen.GeneralJWT(pwd, email);
//     // console.log(token);
//     // if (token) {
//     //     res.cookie("xxxxx", token, {
//     //         maxAge: 1 * 60 * 6000 * cfg.authen['expiresIn']
//     //     }); //token được encode thành xxxxx
        
//     //     res.redirect("/index");
        
//     // } else {
//     //     res.redirect("/login");
//     // }
//   } catch (error) {
//     errorArr.push(error);
//     req.flash("errors", errorArr);
//     return res.redirect('/login');
//   }
// }

let getRegister = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("./login/register", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let getResetPassword = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("./login/reset-password", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postResetPassword = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  try {
    let verifySuccess = await auth.postResetPassword(req, res, req.params.email, req.params.token);
    successArr.push(verifySuccess);
    req.flash("success", successArr);
    return res.redirect('./login'); 
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect('back');
  }
}


let getForgotPassword = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("./login/forgot-password", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postForgotPassword = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });

    req.flash("errors", errorArr);
    return res.redirect('/forgot-password');
  };

  try {
    let email = req.body["email"];
    // console.log(role);
    let createUserSuccess = await auth.postForgotPassword(email, req.protocol, req.get("host"));
    successArr.push(createUserSuccess);
    req.flash("success", successArr);
    return res.redirect('/forgot-password');
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect('/forgot-password');
  }
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
    return res.redirect('/register');
  };

  try {
    let group = req.body["group"] + "-" + req.body["year"];
    let role = req.body["role"];
    // console.log(role);
    let createUserSuccess = await auth.register(req.body["email-register"], req.body["pwd-register"], group, role, req.protocol, req.get("host"));
    successArr.push(createUserSuccess);
    req.flash("success", successArr);
    return res.redirect('/login');
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect('/register');
  }
};

let verifyAccount = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  try {
    let verifySuccess = await auth.verifyAccount(req.params.token);
    successArr.push(verifySuccess);
    req.flash("success", successArr);
    return res.redirect('/login'); 
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect('/register');
  }
};

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect("/index");
  }
  next();
};

let checkTeacher = (req, res, next) => {
  if(req.isAuthenticated()) {
    if(req.user.role == "teacher"){
      next();
    }else{
      return res.redirect("/group");
    }
  }
  next();
};

let checkAdmin = (req, res, next) => {
  if(req.isAuthenticated()) {
    if(req.user.role == "admin"){
      next();
    }else{
      return res.redirect("/group");
    }
  }
  next();
};



module.exports = {
  getLogin: getLogin,
  getLogout: getLogout,
  getRegister: getRegister,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  checkTeacher: checkTeacher,
  checkAdmin: checkAdmin,
  getForgotPassword: getForgotPassword,
  postForgotPassword: postForgotPassword,
  getResetPassword: getResetPassword,
  postResetPassword: postResetPassword
};