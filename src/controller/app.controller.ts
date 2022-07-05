import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }
}
