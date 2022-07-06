import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { doc, getDoc } from 'firebase/firestore';
import { TableService } from '../service/table.service';

@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    if (!req.body || !req.body.userID) {
      res.status(400).json({
        status: 'Create table failed',
        message: 'Body data is invalid',
        result: 'failed',
      });
    } else {
      let result = await this.tableService.create(req.body);
      if (result == 1) {
        res.status(200).json({
          status: `Create new table name =  ${req.body.name} succesfully`,
          result: 'success',
        });
      } else {
        res.status(400).json({
          status: `Create new table name = ${req.body.name} failed`,
          result: 'failed',
        });
      }
    }
  }

  @Post('')
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      let { userID } = req.body;
      if (!userID) {
        res.status(200).json({
          status: 'Get table failed',
          message: 'No userID',
          result: 'failed',
        });
      } else {
        let tables = await this.tableService.getAll(userID);
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

  @Get(':id')
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      let { id } = req.params;
      let table = await this.tableService.get(id);
      if (!table) {
        res.status(400).json({
          status: 'Get table with ID failed',
          message: 'No table with this ID',
          result: 'failed',
        });
      } else {
        res.status(200).json({
          status: 'Get table with ID successfully',
          result: 'success',
          table,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 'Error while getting table by ID',
        message: error.message,
      });
    }
  }

  @Post(':id/update')
  async update(@Req() req: Request, @Res() res: Response) {
    let { id } = req.params;
    let result = await this.tableService.update(id, req.body);
    if (result == 1) {
      res.status(200).json({
        status: `Update name for table ${id} successfully`,
        result: 'success',
      });
    } else {
      res.status(400).json({
        status: `Update name for table ${id} failed`,
        result: 'failed',
      });
    }
  }

  @Post(':id/delete')
  async deleteCard(@Req() req: Request, @Res() res: Response) {
    let { id } = req.params;
    let result = await this.tableService.delete(id);
    if (result == 1) {
      res.status(200).json({
        status: `Delete name for table ${id} successfully`,
        result: 'success',
      });
    } else {
      res.status(400).json({
        status: `Delete name for table ${id} failed`,
        result: 'failed',
      });
    }
  }
}
