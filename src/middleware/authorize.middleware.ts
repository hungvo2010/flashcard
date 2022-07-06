import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Config } from 'src/constant/Config';

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
  private readonly dev: boolean = process.env.NODE_ENV !== 'production';
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let jwtToken: string;
      if (
        req.header['Authorization'] &&
        req.header['Authorization'].startsWith('Bearer')
      ) {
        jwtToken = req.header['Authorization'].split(' ')[1];
      }
      if (!jwtToken && req.cookies && req.cookies.jwt) {
        jwtToken = req.cookies.jwt;
      }

      if (!jwtToken) {
        return res.redirect('/signin');
      }
    } catch (error) {
      return res.redirect('/signin');
    }
  }
}
