import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('')
  @Render('signin')
  renderView(@Res() res: Response) {}
}
