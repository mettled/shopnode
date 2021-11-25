import { Router } from 'express';
import express from 'express';
import { validationResult } from 'express-validator';
import { Document } from 'mongoose';

import validators from '../validators';
import { Course, ICourse } from '../models/course';
import auth from '../middlewares/auth';

const router = Router();
type courseTypeResponse = ICourse & Document;

function isOwner(course: any, req: any) {
  return course.userId.toString() === req.user._id.toString();
}

router.get('/add', auth, (_: express.Request, res: express.Response) => {
  try {
    res.render('add');
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', auth, validators.courseCreateValidator, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('courseMessage', errors.array()[0].msg);
      return res.render('add', {
        courseMessage: req.flash('courseMessage'),
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
      });
    }

    const content = req.body ? (req.body as ICourse) : undefined;
    //@ts-ignore
    const { id } = req.user;
    if (!content) {
      return res.sendStatus(204).redirect('/courses');
    }

    const course = new Course({
      name: content.name,
      price: content.price,
      img: content.img,
      userId: id,
    });
    await course.save();
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

router.get('/edit/:id', auth, async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id ? (req.params.id as String) : undefined;
    if (!id) {
      return res.sendStatus(204).render('courses');
    }

    const course: courseTypeResponse = await Course.findOne({ _id: id }).lean();

    const isOwnerUser = isOwner(course, req);

    if (!isOwnerUser) {
      return res.redirect('/courses');
    }

    if (!course) {
      return res.sendStatus(204).render('courses');
    }
    const { _id, name, price, img } = course;
    res.render('course-edit', {
      id: _id,
      name,
      price,
      img,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/edit', auth, async (req: express.Request, res: express.Response) => {
  try {
    const content = req.body ? (req.body as ICourse) : undefined;
    if (!content) {
      return res.sendStatus(204).render('courses');
    }
    const { id, name, price, img } = content;

    const course = await Course.findById(id);
    const isOwnerUser = isOwner(course, req);
    if (!isOwnerUser) {
      return res.redirect('/courses');
    }

    await Course.findByIdAndUpdate(id, {
      name,
      price,
      img,
    });
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

router.post('/delete', auth, async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(204).render('courses');
    }

    await Course.findOneAndDelete({
      _id: id,
    });
    res.redirect('/courses');
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id ? (req.params.id as String) : undefined;
    if (!id) {
      return res.sendStatus(204).render('courses');
    }

    const course: courseTypeResponse = await Course.findOne({ _id: id }).lean();

    if (!course) {
      return res.sendStatus(204).render('courses');
    }
    const { name, price, img } = course;
    res.render('course', {
      name,
      price,
      img,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
