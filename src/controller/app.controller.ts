import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService, GreetingService } from '../service/app.service';
import { Request, Response } from 'express';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }
}

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {

  }

  @Get()
  getGreeting(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.body);
    return "asfasf";
  }
}
