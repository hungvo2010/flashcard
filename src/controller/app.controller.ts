import { Controller, Get, Param, Post, Redirect, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from '../service/app.service';

import { Request, Response, Express } from 'express';
import { fstat, writeFile } from 'fs';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import multer ,{ diskStorage } from 'multer';
import { CardController } from './card.controller';
import { TableService } from 'src/service/table.service';




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
    });
  }

  @Get('/page')
  async getEmbedPage(@Req() req: Request, @Res() res: Response) {
    let address = req.query.address;
    // console.log(address);
    if (!address) {
      return;
    }
    // console.log(req["user"]);
    
    const tables = await this.appService.getTables(req["user"].userId);
    // console.log(tables);
    
    const htmlContent = await this.appService.getEmbedPageContent(
      address.toString(),
    );
    res.render('index', {
      embedContent: htmlContent,
      url: address,
      tables,
    });
  }
<<<<<<< HEAD
=======

  @Get('/about')
  async getUserpage(@Req() req: Request, @Res() res: Response) {
    let user = req['user'];
    res.render('about', {
      user,
      result: 'success',
    });
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
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
      },
    })
  }))
  uploadFile(@UploadedFile() file) {
    const response = `http://localhost:3000/${file.filename}`
    return response
        
}

<<<<<<< HEAD
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './uploads' });
    }

=======
>>>>>>> origin/main
>>>>>>> 55b331b75bf0bcbeb6b654ff6ab7e575e5391add
}
