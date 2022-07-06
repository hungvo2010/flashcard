import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Request, Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
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
  async getUserPage(@Req() req: Request, @Res() res: Response) {
    try {
      let user = req['user'];
      if (!user) {
        console.log("No user");
        res.status(200).json({
          status: 'Render user page failed',
          message: 'There is no user',
          result: 'failed',
        });
      } else {
        res.render('user', {
          user,
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
  async getTablePage(@Req() req: Request, @Res() res: Response) {
    try {
      let user = req['user'];
      if (!user) {
        res.status(400).json({
          status: 'Render card page failed',
          result: 'failed',
        });
      } else {
        fetch('http://localhost:3000/tables', {
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
                tables: data.tables,
              });
            } else {
              res.status(400).json({
                status: 'Render table page failed',
                message: 'No table data',
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

  @Get('/table/:id')
  async getDetailPage(@Req() req: Request, @Res() res: Response) {
    let { id } = req.params;
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
        body: JSON.stringify({ table: id }),
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
  }
}
