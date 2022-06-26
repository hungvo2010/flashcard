import { Injectable, Req } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(@Req() req: Request): string {
    console.log(req.body); 
    return 'Hello World!';
       
  }
}

@Injectable()
export class GreetingService {
  readWriteFile(filePath: string): string {
    return readFileSync(filePath).toString();
  }
}
