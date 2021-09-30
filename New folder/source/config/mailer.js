import nodeMailer from 'nodemailer';

let adminEmail = "haupham12121999@gmail.com";
let adminPassword = "dechmenh";
let mailHost = "smtp.gmail.com";
let mailPort = "587";

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, // use SSL-TLS
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });
    let options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return transporter.sendMail(options); // This default return a promise 
};

module.exports = sendMail;