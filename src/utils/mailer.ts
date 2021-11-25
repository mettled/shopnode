import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const mailer = (to: string, subject: string, text: string, html: string) =>
  transport.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });

export default mailer;
