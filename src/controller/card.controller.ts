import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { CardService } from '../service/card.service';
import { Request, Response, NextFunction } from 'express';
import { CartDto } from 'src/dto/card.dto';
import { RCode } from 'src/constant/RCode';
import { collection, getDocs, where } from 'firebase/firestore';

import { Method } from 'src/Method/Method';
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) { }



  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      let { highlight, expand, table } = req.body;
      if (!req.body || !highlight || !expand || !table) {
        res.status(400).json({
          status: 'Create card failed',
          message: 'Body data is invalid',
          result: 'failed',
        });
      } else {
        let result = await this.cardService.create(req.body);
        if (result === RCode.SUCCESS) {
          res.status(200).json({
            status: 'Create new card succesfully',
            result: 'success',
          });
        } else if (result === RCode.FAIL) {
          res.status(400).json({
            status: 'Create new card failed',
            result: 'failed',
          });
        } else {
          res.status(400).json({
            status: 'Create new card which already existed.',
            result: 'failed',
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: 'Error while creating new card',
        result: 'failed',
        message: error.message,
      });
    }
  }

  @Get('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    let tables = await this.cardService.getTables(req["user"].userId);
    if (tables != []) {
      let cardsResult = [];
      for (let i = 0; i <tables.length; i++) {
        let cards = await this.cardService.getAll(tables[i].id);
        cards.forEach(card => {
          cardsResult.push(card);
        })
      }
      res.render('card', {
        cards: cardsResult,
      })
    }
    
  }

@Post(':id/update')
async update(@Req() req: Request, @Res() res: Response) {
  try {
    let { id } = req.params;
    let result = await this.cardService.update(id, req.body);
    if (result == 1) {
      res.status(200).json({
        status: `Update expand for card ${id} successfully`,
        result: 'success',
      });
    } else {
      res.status(400).json({
        status: `Update expand for card ${id} failed`,
        result: 'failed',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Error while updating card',
      message: error.message,
      result: 'failed',
    });
  }
}

@Post(':id/delete')
async delete (@Req() req: Request, @Res() res: Response) {
  try {
    let { id } = req.params;
    let result = await this.cardService.delete(id);
    if (result == 1) {
      res.status(200).json({
        status: `Delete expand for card ${id} successfully`,
        result: 'success',
      });
    } else {
      res.status(400).json({
        status: `Delete expand for card ${id} failed`,
        result: 'failed',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: `Delete expand for card failed`,
      result: 'failed',
      message: error.message
    });
  }
}
}
