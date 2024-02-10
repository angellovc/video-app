import { NextFunction, Request, Response } from "express";


export const serverErrorHandler = (err: Error, reqquest: Request, response: Response, next: NextFunction) => {
  console.error(err.stack);
  response.status(500).send('Something went wrong');
}
