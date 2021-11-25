import mailer from '../utils/mailer';

export default (email: string, token: string) =>
  mailer(
    email,
    'Reset password',
    '',
    `
  <h1>Hi my friend</h1>
  <p>For reset password clink on link bellow</p>
  <p><a href=${process.env.BASE_URL}/auth/reset/${token} target=_blank> Click for reset</a></p>
  <hr />
  <a href="${process.env.BASE_URL}">Магазин курсов</a>
`,
  );
