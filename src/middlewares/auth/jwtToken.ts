import { getUserById } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


const getUserFromToken = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }
    try {
      const payload = jwt.verify(token, 'jwt-secret') as { id: string, email: string, name: string };
      const user = await getUserById(payload.id);
      request.user = user;
    } catch (error) {
      console.error('Invalid token:', error);
    }
    next();
}

export {
  getUserFromToken
}