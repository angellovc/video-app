import { Request, Response, NextFunction } from "express"
import { Schema } from "joi";
import boom from '@hapi/boom';

export enum Validation {
  PARAMS = 'params',
  QUERY = 'query',
  BODY = 'body'
}

const validateSchema = (property:Validation, schema:Schema) => {

    return (request:Request, response:Response, next:NextFunction) => {
        let data;
        if (property === Validation.PARAMS) {
            data = request.params;
        }
        if (property === Validation.QUERY) {
            data = request.query;
        }
        if (property === Validation.BODY) {
            data = request.body;
        }

        const {error} = schema.validate(data, {abortEarly: false})
        if (error) {
            next(boom.badRequest(error.message));
        }
        next();
    }
}

export {
  validateSchema
}