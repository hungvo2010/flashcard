import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { CardService } from './card.service';
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
    let { text, meaning } = req.body;
    let category = '';
    if (req.body.category) {
      category = req.body.category;
    }
    let result = await this.cardService.create(text, meaning, category);
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

  @Get('')
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let result = await this.cardService.getAll();
    res.status(200).json({
      status: 'Get all cards succesfully',
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
    let card = await this.cardService.get(parseInt(id));
    res.status(200).json({
      status: `Get a Card with id = ${id} successfully`,
      card,
    });
  }

  @Post(':id/updatemeaning')
  async updateNote(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let { meaning } = req.body;
    let result = await this.cardService.updateMeaning(parseInt(id), meaning);
    if (result == 1) {
      res.status(200).json({
        status: `Update note for card ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Update note for card ${id} failed`,
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
    let result = await this.cardService.delete(parseInt(id));
    if (result == 1) {
      res.status(200).json({
        status: `Delete note for card ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Delete note for card ${id} failed`,
      });
    }
  }
}
