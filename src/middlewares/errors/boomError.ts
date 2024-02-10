import { NextFunction, Request, Response } from "express";

export const boomErrorHandler = (error: any, request:Request, response:Response, next:NextFunction) => {
  if (error.isBoom) {
      const {statusCode, payload} = error.output;
      response.status(statusCode).json(payload);
      return;
  } else {
      next(error);
  }
}