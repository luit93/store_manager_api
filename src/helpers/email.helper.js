const nodemailer = require("nodemailer");


  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dessie.ward22@ethereal.email',
        pass: 'zNrxUfGpjDZ6vnDcrR'
    }
}); 

const sendEmail= (info)=>{
     return new Promise(async(resolve,reject)=>{
        try {
                // send mail with defined transport object
  let result = await transporter.sendMail(info);

  console.log("Message sent: %s", result.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
  resolve(result)
        } catch (error) {
            console.log(error)
        }
    })

}

const emailProcessor=(email,pin)=>{
    const info ={
        from: '"Luit Saikia 👻" <dessie.ward22@ethereal.email>', // sender address
        to: email , // list of receivers
        subject: "Password reset ✔", // Subject line
        text: "Here is your pin: "+ pin +" . This pin will expire in 10 minutes", // plain text body
        html: `
        <p>Here is your pin:</p>
        <b>${pin}</b> <p> This pin will expire in 10 minutes</p>
         `, // html body
    }
    sendEmail(info)
}


module.exports={emailProcessor}