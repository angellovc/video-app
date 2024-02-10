import { User } from "@/entities/user.entity";
import { createComment, getComments } from "@/services/comment.service";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";


const router = Router();


router.get('/', 
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const comments = await getComments(request.params.videoId);
      response.json(comments);
    } catch(error) {
      next(error);
    }
});


router.post('/',
  passport.authenticate('jwt', {session: false}),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const comment = await createComment({
        userId: (request.user as User).id,
        text: request.body.text,
        videoId: request.params.id
      });
      response.json(comment);
    } catch(error) {
      next(error);
    }
});

export default router;