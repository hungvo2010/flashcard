import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { doc, getDoc } from 'firebase/firestore';
import { RCode } from 'src/constant/RCode';
import { TableService } from '../service/table.service';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) { }

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    if (!req.body || !req.body.table) {
      // console.log("body");
      return res.render('user', {
        error: 'Create table failed',
        tables: []
      });
    } else {
      let result = await this.tableService.create(req.body, req["user"].userId);
      if (result == RCode.SUCCESS) {
        return res.redirect('/about');
      } else {
        return res.render('user', {
          error: 'Create table failed',
          tables: []
        });
      }
    }
  }

  @Post('')
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      let { userID: userId } = req.body;
      if (!userId) {
        res.status(200).json({
          status: 'Get table failed',
          message: 'No userID',
          result: 'failed',
        });
      } else {
        let tables = await this.tableService.getAll(userId);
        if (tables) {
          res.status(200).json({
            status: 'Get table successfully',
            result: 'success',
            tables,
          });
        } else {
          res.status(200).json({
            status: 'Get table failed',
            result: 'failed',
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: 'Error while getting table by userID',
        message: error.message,
      });
    }
  }

  @Get(':tableId')
  async getById(@Req() req: Request, @Res() res: Response) {
    let cards = [];
    try {
      let { tableId } = req.params;
      let cards = await this.tableService.getCards(tableId);
      
    } catch (error) {
      cards = [];
    }
    res.render('card', {
      cards
    })
  }

  // @Post(':id/update')
  // async update(@Req() req: Request, @Res() res: Response) {
  //   let { id } = req.params;
  //   let result = await this.tableService.update(id, req.body);
  //   if (result == 1) {
  //     res.status(200).json({
  //       status: `Update name for table ${id} successfully`,
  //       result: 'success',
  //     });
  //   } else {
  //     res.status(400).json({
  //       status: `Update name for table ${id} failed`,
  //       result: 'failed',
  //     });
  //   }
  // }

  @Post(':tableId/delete')
  async deleteCard(@Req() req: Request, @Res() res: Response) {
    let { tableId } = req.params;
    let result = await this.tableService.delete(tableId);
    if (result == 1) {
      res.status(200).json({
        status: `Delete name for table ${tableId} successfully`,
        result: 'success',
      });
    } else {
      res.status(400).json({
        status: `Delete name for table ${tableId} failed`,
        result: 'failed',
      });
    }
  }
}
