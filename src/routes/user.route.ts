import { User } from "@/entities/user.entity";
import { Validation, validateSchema } from "@/middlewares/validations/schemaValidation";
import { postPutUserSchema, paramUserSchema, patchUserSchema } from "@/schemas/user.schema";
import { createUser, deleteUserById, getUserById, updateUser } from "@/services/user.service";
import { NextFunction, Request, Response, Router } from "express"
import passport from "passport";

const router = Router();

router.post('/',
  validateSchema(Validation.BODY, postPutUserSchema),
  async (request:Request, response:Response, next:NextFunction) => {
  try {
    const user = await createUser(request.body);
    response.json(user);
  } catch(error) {
    next(error);
  }
});

router.get('/',
  passport.authenticate('jwt', {session: false}),
  (request:Request, response:Response) => {
    response.json(
      request.user
    );
});

router.put('/',
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.BODY, postPutUserSchema),
  async (request, response, next) => {
  try {
    const user = request.user as User;
    const updatedUser = await updateUser(user.id, request.body);
    response.json(updatedUser);
  } catch(error) {
    next(error);
  }
});

router.patch('/', 
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.BODY, patchUserSchema),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const user = await updateUser(request.params.id, request.body);
      response.json(user);
    } catch(error) {
      next(error);
    }
});

router.delete('/',
  passport.authenticate('jwt', {session: false}),
  async (request, response, next) => {
    try {
      const user = request.user as User;
      await deleteUserById(user.id);
      response.json({
        result: 'success'
      })
    } catch(error) {
      next(error);
    }
})





export default router;
