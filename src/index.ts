import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

// import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import compression from 'compression';
import csrf from 'csurf';
import flash from 'connect-flash';
import dbConnect from './core/db';

import variables from './middlewares/variables';
import homeRouter from './routes/home';
import courseRouter from './routes/course';
import coursesRouter from './routes/courses';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';
import authRouter from './routes/auth';
import profileRouter from './routes/profile';

import multer from './middlewares/multer';
import user from './middlewares/user';
import error404 from './middlewares/error404';
import path from 'path';

const app = express();
app.set('views', './src/views');
app.set('view engine', 'pug');

const sessionDBConnection = dbConnect();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: sessionDBConnection,
      dbName: 'shop',
    }),
  }),
);
app.use(multer.single('avatar'));
app.use(csrf());
app.use(flash());
// app.use(helmet());
app.use(compression());
app.use(user);
app.use(variables);

app.use('/', homeRouter);
app.use('/course', courseRouter);
app.use('/courses', coursesRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.use(error404);

app.listen(process.env.PORT, () => {
  console.log('SERVER RUNNING!!!', process.env.PORT);
});
