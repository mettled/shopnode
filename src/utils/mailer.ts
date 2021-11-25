import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '62cefeff84c93a',
    pass: 'a890cd7d12f5d4',
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
