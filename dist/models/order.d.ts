import { Schema, Model } from 'mongoose';
import { ICourse } from './course';
export interface IOrderDocument extends Document {
    userId: Schema.Types.ObjectId;
    courses: [
        {
            courseId: ICourse;
            count: number;
        }
    ];
    createdAt: number | Date;
    updatedAt: number | Date;
}
export interface IOrder extends IOrderDocument {
}
export interface IOrderModel extends Model<IOrder> {
    makeNewOrder(userId: Schema.Types.ObjectId, cart: IOrderDocument['courses']): Promise<any>;
}
export declare const Order: IOrderModel;
