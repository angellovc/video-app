import {Express} from 'express';
import userRouter from './user.route';
import videoRouter from './video.route';
import commentRouter from './comment.route';
import { Validation, validateSchema } from '@/middlewares/validations/schemaValidation';
import { paramsVideoSchema } from '@/schemas/video.schema';
import loginRouter from './login.route';
import likeRouter from './likes.route';

export default (app: Express) => {
  app.use(loginRouter);
  app.use('/user', userRouter);
  app.use('/video', videoRouter);  
  app.use(
    '/video/:videoId/comment',
    validateSchema(Validation.PARAMS, paramsVideoSchema),
    commentRouter
  );
  app.use(
    '/video/:videoId/like',
    validateSchema(Validation.PARAMS, paramsVideoSchema),
    likeRouter
  )
}

