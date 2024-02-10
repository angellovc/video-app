import { User } from "@/entities/user.entity";
import { createLike, removeLike } from "@/services/like.service";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";


const router = Router();

router.post('/',
  passport.authenticate('jwt', {session: false}),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const comment = await createLike(
        (request.user as User).id,
        request.params.videoId
      );
      response.json(comment);
    } catch(error) {
      next(error);
    }
});

router.delete('/',
  passport.authenticate('jwt', {session: false}),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const comment = await removeLike(
        (request.user as User).id,
        request.params.videoId
      );
      response.json(comment);
    } catch(error) {
      next(error);
    }
});

export default router;