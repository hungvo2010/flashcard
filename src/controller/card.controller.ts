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

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

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

  @Post('/')
  async getAll(@Req() req: Request, @Res() res: Response) {
    let { table } = req.body;
    console.log(table);
    if (!table) {
      res.status(200).json({
        status: 'No table',
        result: 'failed',
      });
    } else {
      let result = await this.cardService.getAll(table);
      res.status(200).json({
        status: 'Get all cards succesfully',
        size: result.length,
        cards: result,
        result: 'success',
      });
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
  async delete(@Req() req: Request, @Res() res: Response) {
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
