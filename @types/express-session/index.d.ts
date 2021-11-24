import session from 'express-session';
import { IUserDocument } from '../../models/user';

declare module 'express-session' {
  export interface SessionData {
    user: IUserDocument;
  }
}
