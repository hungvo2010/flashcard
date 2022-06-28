import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Next, Param, Post, Req, Res } from '@nestjs/common';
import { CardService } from '../service/card.service';
import { Request, Response, NextFunction } from 'express';
import { CartDto } from 'src/dto/card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post('create')
  @HttpCode(201)
  async create(@Body() cardBody: CartDto, @Res() res: Response) {
    let result = await this.cardService.create(cardBody.highlight, cardBody.expand, cardBody.table);
    if (result == 1) {
      return 'Create new card succesfully';
    }
    else {
      throw new HttpException("Create new card failed", HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async getAll() {
    let cards = await this.cardService.all();
    return cards;
  }

  @Get(':cardId')
  async getOne(@Param() params) {
    let cartId: string = params.cardId;
    let card = await this.cardService.get(parseInt(cartId));
    return card;
  }

  @Post('update/:cardId')
  @HttpCode(204)
  async updateCard(
    @Body() cardBody: CartDto,
    @Param() params,
  ) {
    let cardId: string = params.cardIds;
    let result = await this.cardService.update(parseInt(cardId), cardBody.highlight, cardBody.expand, cardBody.table);
    if (result != 1) {
      throw new HttpException(`Update note for card ${cardId} failed`, HttpStatus.BAD_REQUEST);
    };
  }

  @Post('delete/:cardId')
  async deleteCard(
    @Param() params,
  ) {
    let cardId: string = params.cardId;
    let result = await this.cardService.delete(parseInt(cardId));
    if (result != 1) {
      throw new HttpException(`Delete note for card ${cardId} failed`, HttpStatus.BAD_REQUEST);
    }
  }
}
