import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(@Req() req: Request): string {
    console.log(req.body); 
    return 'Hello World!';
       
  }
}