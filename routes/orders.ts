//@ts-check
import express from 'express';
import { Router } from 'express';
import { Order } from '../models/order';
import format from 'date-fns/format';
import calculateOrderPrice from '../utils/calculateOrderPrice';
import auth from '../middlewares/auth';
import { IUser } from '../models/user';

const router = Router();

router.post('/', auth, async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const user = (await req.user.populate('cart.courseId')) as IUser;

  if (!user) {
    return res.redirect('/courses');
  }
  //@ts-ignore
  await Order.makeNewOrder(user.id, user.cart);
  res.redirect('/orders');
  await user.clearCart();
});

router.get('/', auth, async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const user = req.user;
  const orders = await Order.find({ userId: user._id }).populate('userId', 'name email').populate('courses.courseId').lean();
  const convertedOrders = orders.map((order) => {
    return {
      ...order,
      createdAt: format(order.createdAt, 'yyyy-MM-dd HH:mm'),
      updatedAt: format(order.updatedAt, 'yyyy-MM-dd HH:mm'),
      price: calculateOrderPrice(order.courses),
    };
  });
  res.render('orders', { orders: convertedOrders });
});

export default router;
