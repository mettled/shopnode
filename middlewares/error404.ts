import express from 'express';

export default (_: express.Request, res: express.Response) => {
  res.status(404).render('404');
};
