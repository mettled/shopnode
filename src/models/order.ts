import { Schema, model, Model } from 'mongoose';
import { Course, ICourse } from './course';

export interface IOrderDocument extends Document {
  userId: Schema.Types.ObjectId;
  courses: [
    {
      courseId: ICourse;
      count: number;
    },
  ];
  createdAt: number | Date;
  updatedAt: number | Date;
}

export interface IOrder extends IOrderDocument {}

export interface IOrderModel extends Model<IOrder> {
  makeNewOrder(userId: Schema.Types.ObjectId, cart: IOrderDocument['courses']): Promise<any>;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courses: [
      {
        courseId: {
          type: Object,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt' } },
);

OrderSchema.static('makeNewOrder', async (userId, cart: any) => {
  const order = new Order({ userId, courses: cart });
  await order.save();
});

export const Order: IOrderModel = model<IOrder, IOrderModel>('Order', OrderSchema);
