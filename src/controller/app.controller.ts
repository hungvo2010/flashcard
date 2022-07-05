import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';
import { fstat, writeFile } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  @Get('/')
  // @Render('index')
  async getIndex(@Req() req: Request, @Res() res: Response) {
    res.render('index', {
      embedContent: '',
      url: '',
      tables: [],
    })
  }

  @Get('/page')
  async getEmbedPage(@Req() req: Request, @Res() res: Response) {
    let address = req.query.address;
    // console.log(address);
    if (!address) {
      address = "https://apps.ankiweb.net/"
    }
    const tables = await this.appService.getTables();
    const htmlContent = await this.appService.getEmbedPageContent(address.toString());
    res.render('index', {
      embedContent: htmlContent,
      url: address,
      tables,
    })
  }
}
