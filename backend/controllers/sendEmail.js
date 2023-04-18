const nodemailer = require("nodemailer");
module.exports =  function(data,callback) {
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
        to: data.email, 
        subject: "Verify Your Account.", 
        text: "Activate Your Account", 
        html:  `<h1>Activate Your Account</h1><br>
        <div>We just need to validate your email address to activate your Mailjet account. Simply click the following button:</div><br>
        <div style="text-align:center"><a type="button" style="text-decoration:none" href="http://localhost:5173/verify/${data.mailToken}">Activate Your Account</a></div>`
      });
      callback(null,info.messageId);
}