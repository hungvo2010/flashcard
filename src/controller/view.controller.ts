import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller('/')
export class ViewController {

  @Get('home')
  getHome(@Req() req: Request, @Res() res: Response) {
    try {
      let account = req['user'];
      if (account) {
        res.locals.account = account;
        fetch(`http://localhost:3000/cards`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ userID: account.id }),
        })
          .then((resp) => resp.json())
          .then((ans) => {
            if (ans.result === 'success') {
              res.render('src/views/index', {
                cards: ans.cards,
              });
            }
          });
      } else {
        res.status(400).json({
          status: 'Render homepage failed',
          message: 'There is no userID',
          result: 'failed',
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'Render homepage failed',
        message: error.message,
        result: 'failed',
      });
    }
  }

  @Get('about')
  getUser(req: Request, res: Response) {}
}
