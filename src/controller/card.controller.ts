import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { CardService } from '../service/card.service';
import { Request, Response, NextFunction } from 'express';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (
      !req.body ||
      !req.body.highlight ||
      !req.body.expand ||
      !req.body.userID
    ) {
      res.status(400).json({
        status: 'Create card failed',
        message: 'Body data is invalid',
      });
    } else {
      let result = await this.cardService.create(req.body);
      if (result == 1) {
        res.status(200).json({
          status: 'Create new card succesfully',
        });
      } else {
        res.status(400).json({
          status: 'Create new card failed',
        });
      }
    }
  }

  @Get('')
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let result = await this.cardService.getAll();
    res.status(200).json({
      status: 'Get all cards succesfully',
      size: result.length,
      cards: result,
    });
  }

  @Get(':id')
  async getById(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let card = await this.cardService.get(id);
    if (card != null) {
      res.status(200).json({
        status: `Get a Card with id = ${id} successfully`,
        card,
      });
    } else {
      res.status(400).json({
        status: `Get a Card with id = ${id} failed`,
      });
    }
  }

  @Post(':id/update')
  async updateNote(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let { expand } = req.body;
    let result = await this.cardService.update(id, req.body);
    if (result == 1) {
      res.status(200).json({
        status: `Update expand for card ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Update expand for card ${id} failed`,
      });
    }
  }

  @Post(':id/delete')
  async deleteCard(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let result = await this.cardService.delete(id);
    if (result == 1) {
      res.status(200).json({
        status: `Delete expand for card ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Delete expand for card ${id} failed`,
      });
    }
  }
}