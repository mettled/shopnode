import { Router } from 'express';
import express from 'express';
import { Document } from 'mongoose';
import { Course, ICourse } from '../models/course';

const router = Router();
type courseTypeResponse = ICourse & Document;

router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const courses: courseTypeResponse[] = await Course.find().populate('userId').lean();

    const convertedCourses = courses.map((course) => {
      const { userId } = course;
      //@ts-expect-error
      userId._id = userId._id.toString();
      return {
        ...course,
        userId,
      };
    });

    if (!courses) {
      return res.sendStatus(204).render('courses', {
        courses: [],
      });
    }
    //@ts-ignore
    const id = req.user ? req.user.id : null;

    res.render('courses', {
      courses: convertedCourses,
      loginUserId: id,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
