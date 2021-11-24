import express from 'express';
import { User } from '../models/user';

export default async (req: express.Request, _: express.Response, next: express.NextFunction) => {
  //@ts-ignore
  if (req.session?.user) {
    //@ts-ignore
    req.user = await User.findById(req.session.user._id);
  }
  next();
};
