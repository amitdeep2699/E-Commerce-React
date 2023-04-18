const nodemailer = require("nodemailer");
module.exports =  function(email,token,callback) {
    let testAccount =  nodemailer.createTestAccount();
    let transporter =  nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "saul.fay@ethereal.email",
          pass: "tUyQspuEPD34pNgvbE", 
        }
      });
      let info =  transporter.sendMail({
        from: '"Amit Deep" <amitdeep@gmail.com>',
        to: email, 
        subject: "Reset Password", 
        text: "Click here for Reset password", 
        html: `<p>Click here for Reset password</p><br><a href='http://localhost:3000/reset/${token}'> Reset </a>`
     });
     callback(null,info.messageId);
}