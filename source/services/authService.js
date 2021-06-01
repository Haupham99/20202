import UserModel from './../models/user.model';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import {transErrors, transSuccess, transMail, transMailResetPassWord} from './../lang/vi';
import { reject, resolve } from 'bluebird';
import sendMail from './../config/mailer';

let saltRounds = 7;
let salt = bcrypt.genSaltSync(saltRounds);

let register = (email, password, group, role, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if(userByEmail){
            if(userByEmail.deletedAt != null){
                return reject(transErrors.account_removed);
            };
            if(!userByEmail.isActive){
                return reject(transErrors.account_not_active);
            };
            return reject(transErrors.account_in_use);
        };

        let userItem = {
            username: email.split("@")[0],
            email: email,
            group: group,
            role: role,
            password: bcrypt.hashSync(password, salt),
            verifyToken: uuidv4() 
        };

        let user = await UserModel.createNew(userItem);
        let linkVerify = `${protocol}://${host}/verify/${user.verifyToken}`;
        // Send email
        sendMail(email, transMail.subject, transMail.template(linkVerify))
            .then(success => {
                resolve(transSuccess.userCreated(user.email));
            })
            .catch(async (error) => {
                await UserModel.removeById(user._id);
                console.log(error);
                reject(transMail.send_failed)
            });
        resolve(transSuccess.userCreated(user.email));
    });
};

let postForgotPassword = (email, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if(!userByEmail){
            return reject(transErrors.wrong_account);
        };

        let userItem = {
            email: email,
            resetToken: uuidv4() 
        };

        let user = await UserModel.findByEmailAndUpdate(userItem);
        let linkVerifyReset = `${protocol}://${host}/${email}/reset/${userItem.resetToken}`;
        // Send email
        sendMail(email, transMailResetPassWord.subject, transMailResetPassWord.template(linkVerifyReset))
            .then(success => {
                resolve(transSuccess.reset_send);
            })
            .catch(async (error) => {
                await UserModel.removeById(user._id);
                console.log(error);
                reject(transMail.send_failed)
            });
        resolve(transSuccess.reset_send);
    });
};

let verifyAccount = (token) => {
    return new Promise(async (resolve, reject) => {
        let userByToken = await UserModel.findByToken(token);
        if(!userByToken){
            return reject(transErrors.token_undefined); 
        }
        await UserModel.verify(token);
        resolve(transSuccess.account_actived);
    });
};

let postResetPassword = (req, res, email, token) => {
    return new Promise(async (resolve, reject) => {
        let data = req.body;
        console.log(email, token);
        let userByToken = await UserModel.findByResetToken(token);
        if(!userByToken){
            return reject(transErrors.token_undefined); 
        }
        let user = await UserModel.findByEmail(email.split('@')[0]);
        if(data["new-password"] != data["confirm-password"]){
            // req.flash("errors", "Mật khẩu mới không khớp");
            return reject(transErrors.confirm_password_wrong);
        }
        await UserModel.updatePassword(userByToken._id, bcrypt.hashSync(data["new-password"], salt));
        await UserModel.verifyReset(token);
        resolve("Cập nhật mật khẩu thành công");
    });
};

let login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        let pass = bcrypt.hashSync(password, salt);
        if(userByEmail != null){
            // console.log(userByEmail);
            if(userByEmail.deletedAt != null){
                return reject(transErrors.account_removed);
            }else if(!userByEmail.isActive){
                return reject(transErrors.account_not_active);
            }else if(bcrypt.compareSync(pass, userByEmail.password)){
                return reject(transErrors.account_wrong_password);
            }
            resolve();
        }
        return reject(transErrors.account_not_found);
    });
};

module.exports = {
    register: register,
    verifyAccount: verifyAccount,
    login: login,
    postForgotPassword: postForgotPassword,
    postResetPassword: postResetPassword
};