import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        req.body = {
            "greet": "Hello World",
        }
        console.log('Request...');
        next();        
    }
}