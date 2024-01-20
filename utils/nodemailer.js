import nodemailer from "nodemailer"
async function  mailSender (email, title, body) {
    try {
      // Create a Transporter to send emails
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });
      // Send emails to users
      let info = await transporter.sendMail({
        from: 'admin@paeep.ps',
        to: email,
        subject: title,
        html: body,
      });
      console.log("Email info: ", info);
      return info;
    } catch (error) {
      console.log(error.message);
    }
  };
 export default {mailSender} 