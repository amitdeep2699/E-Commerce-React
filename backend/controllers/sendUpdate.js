const nodemailer = require("nodemailer");
module.exports =  function(email,msg,callback) {
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
        subject: "Update Password ", 
        text: "Your Password "+ msg +" Successfuly", 
        html: ``
     });
     callback(null,info.messageId);
}