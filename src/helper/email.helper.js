const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options?.email,
    subject: options.subject,
    text: options.message,
  };

  return await transporter.sendMail(mailOptions);
};

const sendMailToAll = async (options) => {
  let emails = [];
  options?.email?.filter((data) => emails.push(data.email));
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: emails,
    subject: options.subject,
    text: options.message,
  };
  // console.log(mailOptions);
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendMailToAll, sendEmail };
