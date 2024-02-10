import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";

export const ormErrorHandler = (error:any, request:Request, response:Response, next:NextFunction) => {
  if (error instanceof QueryFailedError) {
      response.status(409).json({
          statusCode: 409,
          message: error.message,
      })
  } else {
      next(error);
  }
}
