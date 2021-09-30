import multer from 'multer';
import {app} from "./../config/app";
import {transErrors, transSuccess} from "./../lang/vi";
import uuidv4 from "uuid/v4";
import {user} from "./../services/index";
import fsExtra from 'fs-extra';

let storageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.avatar_directory);
    },
    filename: (req, file, callback) => {
        let math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transErrors.avatar_type, null);
        }

        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null, avatarName);
    }
});

let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {fileSize: app.avatar_limit_size}
}).single("avatar");

let updateAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if(error){
            console.log(error);
            return;
        }
        try {
            if(req.file != undefined){
                // console.log(group);
                var updateUserItem = {
                    avatar: req.file.filename,
                    updateAt: Date.now(),
                    username: req.body.username,
                };
            }else{
                // console.log(group);
                var updateUserItem = {
                    updateAt: Date.now(),
                    username: req.body.username,
                };
            }
            // Update user
            let userUpdate = await user.updateUser(req.user._id, updateUserItem);
            // Remove old user avatar
            // await fsExtra.remove(`${app.avatar_directory}/${req.file.filename}`);
            // let result = {
            //     message: transSuccess.avatar_updated,
            //     imageSrc: `/images/${req.file.filename}`
            // };
            // return res.status(200).send(result);
            req.flash("success", transSuccess.avatar_updated);
            return res.redirect("/profile");
        } catch (error) {
            console.log(error);
            // return res.status(500).send(error);
            req.flash("errors", transErrors.avatar_update_failed);
            return res.redirect("/profile");
        }
    });
};

let updateCoverAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if(error){
            console.log(error);
            return;
        }
        try {
            var updateUserItem = {
                coverAvatar: req.params.fileName,
                updateAt: Date.now(),
            };
            // Update user
            let userUpdate = await user.updateUser(req.user._id, updateUserItem);
            // Remove old user avatar
            // await fsExtra.remove(`${app.avatar_directory}/${req.file.filename}`);
            // let result = {
            //     message: transSuccess.avatar_updated,
            //     imageSrc: `/images/${req.file.filename}`
            // };
            // return res.status(200).send(result);
            req.flash("success", transSuccess.avatar_updated);
            return res.redirect("/profile");
        } catch (error) {
            console.log(error);
            // return res.status(500).send(error);
            req.flash("errors", transErrors.avatar_update_failed);
            return res.redirect("/profile");
        }
    });
};

let updatePassword = async (req, res) => {
    try {
        // let oldPassword = req.body["old-password"];
        // let newPassword = req.body["new-password"];
        // let confirmPassword = req.body["confirm-password"];
        let data = req.body;
        let result = await user.updatePassword(req, req.user._id, data); 
        res.redirect("/change-password");
    } catch (error) {
        res.redirect("/change-password");
    }
}

module.exports = {
    updateAvatar: updateAvatar,
    updatePassword: updatePassword,
    updateCoverAvatar: updateCoverAvatar
};