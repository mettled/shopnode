import { body } from 'express-validator';
import { User } from '../models/user';

const courseCreateValidator = [
  body('name').isLength({ min: 3 }).withMessage('Name need to be more than 3 symbols').trim(),
  body('price').isNumeric().withMessage('Price contains not only numbers'),
  body('img', 'Enter correct image link').isURL(),
];

const userRegisterValidator = [
  body('name').isLength({ min: 3 }).withMessage('Name must have at least symbols').trim(),
  body('email')
    .isEmail()
    .withMessage('Enter email')
    .custom(async (value, { req }) => {
      const { email } = req.body;
      const user = await User.findOne({ email }).lean();
      if (user && value === user.email) {
        throw new Error('Email already registered');
      }
      return true;
    }),
  body('password')
    .isStrongPassword({
      minLength: 3,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 0,
      pointsPerRepeat: 0,
      pointsForContainingLower: 0,
      pointsForContainingUpper: 0,
      pointsForContainingNumber: 0,
      pointsForContainingSymbol: 0,
    })
    .withMessage('Password must be greater than 3 and contain at least one number'),

  body('password')
    .isStrongPassword({
      minNumbers: 1,
    })
    .withMessage('Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number'),

  body('rpassword')
    .isStrongPassword({ minLength: 3 })
    .withMessage('Password must have at least 1 number, and min length 8 symbols')
    .custom((value, { req }) => {
      const { password } = req.body;
      if (value !== password) {
        throw new Error('Passwords need to be equal');
      }
      return true;
    }),
];

export default {
  courseCreateValidator,
  userRegisterValidator,
};
