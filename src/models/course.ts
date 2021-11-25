import { Schema, model } from 'mongoose';

export interface ICourse {
  id?: String;
  name: string;
  price: number;
  img: string;
  userId: Schema.Types.ObjectId;
}

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Course = model('Course', courseSchema);
