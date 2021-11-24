import mailer from '../utils/mailer';

export default (email: string) =>
  mailer(
    email,
    'Account is registered',
    '',
    `
  <h1> Welcome to our store </h1>
  <p>You have successfully created an account - ${email}</p>
  <hr />
  <a href="${process.env.BASE_URL}">Shop courses</a>
`,
  );
