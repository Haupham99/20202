import { reject, resolve } from "bluebird";
import UserModel from "./../models/user.model";
import {transErrors, transSuccess} from "./../lang/vi";
import bcrypt from "bcrypt";


let saltRounds = 7;
let salt = bcrypt.genSaltSync(saltRounds);

/**
 * Update UserInfo
 * @param {userId} id 
 * @param {data update} item 
 */
let updateUser = async (id, item) => {
    await UserModel.updateUser(id, item);
};

let updatePassword = (req, id, data) => {
    return new Promise(async (resolve, reject) => {
        let user = await UserModel.findUserById(id);
        let checkCurrentPassword = await user.comparePassword(data["old-password"]);
        if(!checkCurrentPassword){
            req.flash("errors", "Mật khẩu cũ không chính xác");
            return reject(transErrors.old_password_incorrect);
        }else if(data["new-password"] != data["confirm-password"]){
            req.flash("errors", "Mật khẩu mới không khớp");
            return reject(transErrors.confirm_password_wrong);
        }else if(data["old-password"] == data["new-password"]){
            req.flash("errors", "Mật khẩu mới không được trùng với mật khẩu cũ");
            return reject(transErrors.new_password_not_changed);
        }
        await UserModel.updatePassword(id, bcrypt.hashSync(data["new-password"], salt));
        req.flash("success", "Cập nhật mật khẩu thành công");
        resolve(true);
    });
};

module.exports = {
    updateUser: updateUser,
    updatePassword: updatePassword
};