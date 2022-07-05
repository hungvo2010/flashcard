import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';
import { fstat, writeFile } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  // @Render('index')
  getIndex(@Req() req: Request, @Res() res: Response) {
    res.render('index', {
      embedContent: ''
    })
  }

  @Get('/page')
  async getEmbedPage(@Req() req: Request, @Res() res: Response) {
    const address = req.query.address;
    // console.log(address);
    
    const htmlContent = await this.appService.getEmbedPageContent(address.toString());
    writeFile('./a.html', htmlContent, err =>{
      console.log(err);
    })
    res.render('index', {
      embedContent: htmlContent
    })
  }
}
