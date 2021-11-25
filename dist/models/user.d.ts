import { Schema, Document, Model } from 'mongoose';
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
        }
    ];
}
export interface IUser extends IUserDocument {
    addToCart(course: ICourse | null): Promise<any>;
    removeFromCart(courseId: string): Promise<any>;
    clearCart(): Promise<any>;
}
export interface IUserModel extends Model<IUser> {
}
export declare const User: IUserModel;
