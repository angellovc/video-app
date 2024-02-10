import { User } from "@/entities/user.entity";
import { NextFunction, Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

router.post('/login', 
  passport.authenticate('local', {session: false}),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
        const user = (request as any).user as User;
        const payload = {
            id: user?.id,
        }
        const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET as string, {expiresIn: '2h'})
        response.json({user, token});
    } catch(error) {
        next(error);
    }
  }
);

export default router;
