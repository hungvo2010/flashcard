import { Controller, Get, Post, Redirect, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response, Express } from 'express';
import { fstat, writeFile } from 'fs';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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


  @Post('/upload')
  @UseInterceptors(FileInterceptor('file')
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): void {
    MulterModule.register({
      dest: './upload',
    });
  console.log(file);
}

}
