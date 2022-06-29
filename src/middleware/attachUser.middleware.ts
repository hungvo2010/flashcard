import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AttachUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        let token: string;
        if (req.headers['Authorization'] && req.head && req.headers['Authorization'].startsWith('Bearer')){
            token = req.headers['Authorization'].split(' ')[1];
        }   
    }
}