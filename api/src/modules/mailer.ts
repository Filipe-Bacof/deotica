import nodemailer from "nodemailer";

const emailEnv = process.env.MAIL_USERNAME;
const passEnv = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  // host: "smtp.kinghost.net",
  host: 'smtp.gmail.com',
  // host: "kinghost.smtpkl.com.br",
  port: 465,
  secure: true,
  auth: {
    user: emailEnv,
    pass: passEnv,
  },
});

export default transporter;
