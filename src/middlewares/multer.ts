import { Express, Request } from 'express';
import multer from 'multer';
import crypro from 'crypto';

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'images');
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const [, ext] = file.originalname.split('.');
    const uniquePreffix = crypro.createHash('MD5').update(req.body.email).digest('hex');
    cb(null, uniquePreffix + '.' + ext);
  },
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
function fileFilter(_: any, file: Express.Multer.File, cb: (error: null, acceptFile: boolean) => any) {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export default multer({ storage, fileFilter });
