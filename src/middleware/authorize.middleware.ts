import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
    private readonly dev: boolean = process.env.NODE_ENV !== 'production';
    use(req: Request, res: Response, next: NextFunction) {
        console.log(process.env.PORT);
        
        let jwtToken: string;
        if (req.header['Authorization'] && req.header['Authorization'].startsWith('Bearer')) {
            jwtToken = req.header['Authorization'].split(' ')[1];
        }

        if (!jwtToken && req.cookies && req.cookies.jwt) {
            jwtToken = req.cookies.jwt;
        }
        if (!jwtToken) {
            return next();
        }

        try {
            const JWT_SECRET = this.dev ? process.env.JWT_SECRET_DEV : process.env.JWT_SECRET_LIVE;
            const userInfo = verify(jwtToken, JWT_SECRET);
            req["user"] = userInfo;
            next();
        }

        catch (err) {
            next();
        }
    }
}