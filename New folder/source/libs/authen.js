// const error = require('./error');
const cfg = require('./config');
const jwt = require('jsonwebtoken');



let GeneralJWT = (password, email) => {
    if (password in cfg.account) {
        let payload = {
            "level": cfg.account[password]
        }
        let token = jwt.sign(payload, email, {
            expiresIn: 1 * 60 * 60 * cfg.authen['expiresIn']
        });
        return token;
    }

    return "";
}

let IsAuthenticated = async(token) => {
    try {
        const promise = () => new Promise((res, rej) =>
            jwt.verify(token, cfg.authen['key'], function (err, payload) {
                if (err) {
                    rej(err);
                }
                res(payload['level']);
            })
        );
        const level = await promise();
        return level;
    }catch(err){
        // console.log(err);
    }
}

let GetLevel = (password) => {
    return cfg.account[password] || "nothing";
}

// module.exports = GeneralJWT;
// module.exports = IsAuthenticated;
// module.exports = GetLevel;
// export {
    // GeneralJWT,
    // IsAuthenticated,
    // GetLevel,
// }
module.exports = {
    GeneralJWT: GeneralJWT,
    IsAuthenticated: IsAuthenticated,
    GetLevel: GetLevel
};