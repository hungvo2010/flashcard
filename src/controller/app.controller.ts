import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';
import { CardController } from './card.controller';
import { TableService } from 'src/service/table.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
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
      address = 'https://apps.ankiweb.net/';
    }
    const tables = await this.appService.getTables();
    const htmlContent = await this.appService.getEmbedPageContent(
      address.toString(),
    );
    res.render('index', {
      embedContent: htmlContent,
      url: address,
      tables,
    });
  }

  @Get('/about')
  async getUserpage(@Req() req: Request, @Res() res: Response) {
    let user = req['user'];
    res.render('about', {
      user,
      result: 'success',
    });
  }

  @Get('card')
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
}
