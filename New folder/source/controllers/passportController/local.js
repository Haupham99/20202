import passport, { use } from 'passport';
import passportLocal from 'passport-local';
import UserModel from './../../models/user.model';
import {transErrors, transSuccess, transMail} from './../../lang/vi';

let localStrategy = passportLocal.Strategy;

/**
 * Valid user account type local
 */

let initPassportLocal = () => {
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findByEmail(email);
            // let pass = bcrypt.hashSync(password, salt);
            if(user != null){
                // console.log(user);
                if(user.deletedAt != null){
                    return done(null, false, req.flash("errors", transErrors.account_removed));
                }else if(!user.isActive){
                    return done(null, false, req.flash("errors", transErrors.account_not_active));
                }
                let checkPassword = await user.comparePassword(password);
                // console.log(checkPassword);
                if(!checkPassword){
                    return done(null, false, req.flash("errors", transErrors.account_wrong_password));
                }
                return done(null, user);
            }
            console.log("Dang nhap thanh cong!");
            return done(null, user, req.flash("errors", transErrors.account_not_found));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));
    // Save UserId to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(user => {
                return done(null, user);
            })
            .catch(error => {
                return done(error, null)
            });
    });
};

module.exports = initPassportLocal;