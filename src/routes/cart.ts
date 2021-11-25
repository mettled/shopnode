import { Router } from 'express';
import express from 'express';
import { Course } from '../models/course';
import { IUser } from '../models/user';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, async (req: express.Request, res: express.Response): Promise<void> => {
  //@ts-ignore
  const userCart = await req.user.populate('cart.courseId');
  if (!userCart) {
    return res.sendStatus(204).redirect('courses');
  }

  const courses = userCart.cart;
  res.render('cart', { courses, cartId: userCart._id });
});

router.post('/change', auth, async (req: express.Request, res: express.Response) => {
  const change = req.body.change;
  //@ts-ignore
  const user: IUser = req.user;
  const courseId = req.body.id;

  if (change === 'add') {
    const course = await Course.findById(courseId).lean();
    await user.addToCart(course);
  } else {
    await user.removeFromCart(courseId);
  }
  res.redirect('/cart');
});

router.post('/delete', auth, async (req: express.Request, res: express.Response): Promise<void> => {
  //@ts-ignore
  const user: IUser = req.user;
  const courseId = req.body.id;

  if (!courseId) {
    return res.sendStatus(204).redirect('/cart');
  }

  await user.removeFromCart(courseId);
  res.redirect('/cart');
});

router.post('/add', auth, async (req: express.Request, res: express.Response): Promise<void> => {
  //@ts-ignore
  const user: IUser = req.user;
  if (!user) {
    return res.redirect('/courses');
  }
  const id = req.body.id;
  const course = await Course.findById(id).lean();

  await user.addToCart(course);
  res.redirect('/cart');
});

export default router;
