import { Schema, model, Document, Model } from 'mongoose';
import { ICourse } from './course';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  token: string | undefined;
  tokenDate: number | undefined;
  avatarUlr: string;
  cart: [
    {
      courseId: Schema.Types.ObjectId;
      count: number;
    },
  ];
}

export interface IUser extends IUserDocument {
  addToCart(course: ICourse | null): Promise<any>;
  removeFromCart(courseId: string): Promise<any>;
  clearCart(): Promise<any>;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: String,
  tokenDate: Number,
  avatarUlr: {
    type: String,
  },
  cart: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      count: {
        type: Number,
        default: 1,
      },
    },
  ],
});

UserSchema.method('addToCart', async function (course) {
  const cart: IUserDocument['cart'] = <IUserDocument['cart']>[...this.cart];
  const idxCourse = cart.findIndex((c) => c.courseId.toString() === course._id.toString());

  if (idxCourse >= 0) {
    cart[idxCourse].count += 1;
  } else {
    cart.push({
      courseId: course._id,
      count: 1,
    });
  }
  this.cart = cart;
  return await this.save();
});

UserSchema.methods.removeFromCart = async function (courseId) {
  const cart: IUserDocument['cart'] = <IUserDocument['cart']>[...this.cart];
  const idxCourse = cart.findIndex((c) => c.courseId.toString() === courseId.toString());
  cart[idxCourse].count -= 1;
  this.cart = <IUserDocument['cart']>cart.filter(({ count }) => count > 0);
  return await this.save();
};

UserSchema.method('clearCart', async function () {
  this.cart = <IUserDocument['cart']>new Array();

  return await this.save();
});

export const User: IUserModel = model<IUser>('User', UserSchema);
