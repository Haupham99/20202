import {check} from "express-validator/check";
// import {transValidation} from "./../../lang/vi";

const transValidation = {
    email_incorrect: "Email phải có dạng abc@gmail.com",
    password_incorrect: "Mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu không chính xác"
};

let register = [
    check("email-register", transValidation.email_incorrect)
        .isEmail()
        .trim(),
    check("pwd-register", transValidation.password_incorrect)
        .isLength({min: 8}),
        // .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),
    check("pwd-confimation-register", transValidation.password_confirmation_incorrect)
        .custom((value, {req}) => {
            return value === req.body["pwd-register"];
        })
];

let login = [
    check("email", transValidation.email_incorrect)
        .isEmail()
        .trim(),
    check("pwd", transValidation.password_incorrect)
        .isLength({min: 8})
]

module.exports = {
    register: register,
    login: login
};