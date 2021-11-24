import { Router } from 'express';
import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

import { User } from '../models/user';
import auth from '../middlewares/auth';
import register from '../mail/register';
import resetEmail from '../mail/reset';
import validators from '../validators';

const router = Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.render('auth/auth', {
    messageLogin: req.flash('messageLogin'),
    messageRegister: req.flash('messageRegister'),
  });
});

router.post('/login', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const condidate = await User.findOne({ email }).select('+password');
  console.log('condidate', condidate);
  if (!condidate) {
    req.flash('messageLogin', 'No user');
    res.redirect('/auth#login');
  } else {
    const isSame = await bcrypt.compare(password, condidate.password);

    if (isSame) {
      //@ts-ignore
      req.session.user = condidate;
      req.session.save((error) => {
        if (error) {
          return console.log(error);
        }
      });
      res.redirect('/');
    } else {
      req.flash('messageLogin', 'Wrong password');
      res.redirect('/auth#login');
    }
  }
});

router.get('/logout', auth, async (req: express.Request, res: express.Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post('/register', validators.userRegisterValidator, async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('messageRegister', errors.array()[0].msg);
    return res.redirect('/auth#register');
  }
  const { email, name, rpassword } = req.body;

  const user = new User({
    name,
    email,
    password: await bcrypt.hash(rpassword, 10),

    cart: [],
  });
  await user.save();
  res.redirect('/auth#login');
  await register(email);
});

router.get('/reset', (_: express.Request, res: express.Response) => {
  res.render('auth/reset');
});

router.get('/reset/:token', async (req: express.Request, res: express.Response) => {
  try {
    const { token } = req.params;
    const condidate = await User.findOne({ token, tokenDate: { $gt: Date.now() } });
    if (!condidate) {
      return res.redirect('/auth#login');
    }
    res.render('auth/password', {
      messageResetPassword: req.flash('messageResetPassword'),
      userId: condidate._id,
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/reset', async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const condidate = await User.findOne({ email });
    if (!condidate) {
      req.flash('messageLogin', 'User does not exist');
      res.redirect('/auth/reset');
    } else {
      crypto.randomBytes(10, async (err, buf) => {
        if (err) {
          throw err;
        }
        const token = buf.toString('hex');
        condidate.token = token;
        condidate.tokenDate = Date.now() + 1000 * 60 * 60;
        await condidate.save();
        req.flash('messageLogin', 'Check pls your email');
        res.redirect('/auth#login');
        await resetEmail(condidate.email, token);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/password', async (req: express.Request, res: express.Response) => {
  try {
    const { id, password, rpassword, token } = req.body;
    if (password !== rpassword) {
      req.flash('messageResetPassword', 'Passwords are not the same');
      return res.redirect(`/auth/reset/${token}`);
    }
    const condidate = await User.findOne({
      _id: id,
      token,
      tokenDate: { $gt: Date.now() },
    });
    if (!condidate) {
      req.flash('messageLogin', 'Session was expared');
      res.redirect('/auth/reset');
    } else {
      condidate.token = undefined;
      condidate.tokenDate = undefined;
      condidate.password = await bcrypt.hash(password, 10);

      await condidate.save();
      req.flash('messageLogin', 'Enter using new password');
      res.redirect('/auth#login');
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
