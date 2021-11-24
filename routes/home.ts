import { Router } from 'express';
import express from 'express';

const router = Router();

router.get('/', (_: express.Request, res: express.Response) => {
  res.redirect('courses');
});

export default router;
