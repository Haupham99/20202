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
            let userByEmail = await UserModel.findByEmail(email);
            // let pass = bcrypt.hashSync(password, salt);
            if(userByEmail != null){
                // console.log(userByEmail);
                if(userByEmail.deletedAt != null){
                    return done(null, false, req.flash("errors", transErrors.account_removed));
                }else if(!userByEmail.isActive){
                    return done(null, false, req.flash("errors", transErrors.account_not_active));
                }
                let checkPassword = await userByEmail.comparePassword(password);
                // console.log(checkPassword);
                if(!checkPassword){
                    return done(null, false, req.flash("errors", transErrors.account_wrong_password));
                }
                return done(null, userByEmail);
            }
            console.log("Dang nhap thanh cong!");
            return done(null, userByEmail, req.flash("errors", transErrors.account_not_found));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));
    // Save UserId to session
    passport.serializeUser((userByEmail, done) => {
        done(null, userByEmail._id);
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