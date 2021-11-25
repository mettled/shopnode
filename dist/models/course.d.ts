import { Schema } from 'mongoose';
export interface ICourse {
    id?: String;
    name: string;
    price: number;
    img: string;
    userId: Schema.Types.ObjectId;
}
export declare const Course: import("mongoose").Model<ICourse, {}, {}, {}>;
