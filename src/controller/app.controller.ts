import { Controller, Get, Param, Post, Redirect, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {MethodManager} from '../Method/MethodManager';
import { Pdf } from 'src/Method/Pdf';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/')
  // @Render('index')
  async getIndex(@Req() req: Request, @Res() res: Response) {
    MethodManager.initialize();
    res.render('index', {
      embedContent: '',
      url: '',
      tables: [],
    });
  }

  @Get('/page')
  async getEmbedPage(@Req() req: Request, @Res() res: Response) {
    let address = req.query.address;
    if (!address) {
      return;
    }

    const tables = await this.appService.getTables(req["user"].userId);
    const htmlContent = await this.appService.getEmbedPageContent(
      address.toString(),
    );

    // let data = MethodManager.render('web', address.toString());
    res.render('index', {
      embedContent: htmlContent,
      url: address,
      tables,
    });
  }

  @Get('/about')
  async getUserpage(@Req() req: Request, @Res() res: Response) {
    try {
      let user = req['user'];
      if (!user) {
        res.status(400).json({
          status: 'Render user page failed',
          message: 'There is no user',
          result: 'failed',
        });
      } else {
        let tables = await this.appService.getTables(user.userId);
        res.render('user', {
          error: false,
          user,
          tables,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'There is some error when rendering user page',
        result: 'failed',
        message: error.message,
      });
    }
  }

  @Get('/table')
  async getCardpage(@Req() req: Request, @Res() res: Response) {
    try {
      let user = req['user'];
      if (!user) {
        res.status(400).json({
          status: 'Render card page failed',
          result: 'failed',
        });
      } else {
        fetch('http://localhost:3000/cards', {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ userID: user.id }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.result === 'success') {
              res.render('user', {
                error: false,
                user,
                cards: data.cards,
              });
            } else {
              res.status(400).json({
                status: 'Render card page failed',
                message: 'No cards data',
                result: 'failed',
              });
            }
          });
      }
    } catch (error) {
      res.status(400).json({
        status: 'There is some error when rendering card page',
        result: 'failed',
        message: error.message,
      });
    }
  }


  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
    storage: Pdf.storage
  }))

  uploadFile(@UploadedFile() file) {
    const response = MethodManager.render('pdf',"http://localhost:3000/file/" + file.filename);
    return response
        
}


    @Get('file/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './uploads' });
    }

}
