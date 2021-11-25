import express from 'express';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //@ts-ignore
  res.locals.isAuth = Boolean(req.session.user);
  // res.locals.csrf = '12312143';
  res.locals.csrf = req.csrfToken();

  next();
};
