// import { v2 as cloudinary } from 'cloudinary';
import { Router } from 'express';
import express from 'express';
// import { User } from '../models/user';
const router = Router();
// cloudinary.config();

router.get('/', (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const { avatarUlr, email, name } = req.user;
  res.render('profile', { email, name, avatarUlr });
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    if (req.file) {
    }
    // const updatedUser = {
    //   ...req.user,
    //   name: req.body.name,
    //   avatarUlr: req.file.path,
    // };
    //@ts-ignore
    (req.user.name = req.body.name), (req.user.avatarUlr = req.file.path), req.user.save();
    res.redirect('profile');
  } catch (error) {
    console.log(error);
  }
  // cloudinary.uploader
  //   .upload_stream({ resource_type: 'auto', folder: 'images', unique_filename: false }, (error, result) => {
  //     if (error) {
  //       return res.status(500).json({
  //         status: 'error',
  //         message: error || 'upload error',
  //       });
  //     }
  //     console.log('result', result.url);
  //   })
  //   .end(req.file.buffer);
});

export default router;
