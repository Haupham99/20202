import UserModel from './../models/user.model';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import {transErrors, transSuccess, transMail} from './../lang/vi';
import { reject, resolve } from 'bluebird';
import sendMail from './../config/mailer';

let saltRounds = 7;
let salt = bcrypt.genSaltSync(saltRounds);

let register = (email, password, protocol, host) => {
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
    login: login
};