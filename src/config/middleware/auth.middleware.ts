import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    try {
      const decoded = jwt.verify(token, 'jwt');
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send('Unauthorized');
    }
  }
}
