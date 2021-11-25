import express from 'express';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session['user']) {
    return res.redirect('/auth#login');
  }
  next();
};
