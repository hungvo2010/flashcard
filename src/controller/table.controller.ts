import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TableService } from '../service/table.service';

@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post('create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (!req.body || !req.body.name || !req.body.userID) {
        res.status(400).json({
            status: "Create table failed",
            message: "Body data is invalid"
        });
    }
    else {
        let result = await this.tableService.create(req.body);
        if (result == 1) {
          res.status(200).json({
            status: `Create new table name =  ${req.body.name} succesfully`,
          });
        } else {
          res.status(400).json({
            status: `Create new table name = ${req.body.name} failed`,
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
    let result = await this.tableService.getAll();
    res.status(200).json({
      status: 'Get all tables succesfully',
      tables: result,
    });
  }

  @Get(':id')
  async getById(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let table = await this.tableService.get(id);
    res.status(200).json({
      status: `Get a Table with id = ${id} successfully`,
      table,
    });
  }

  @Post(':id/update')
  async updateNote(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    let { id } = req.params;
    let result = await this.tableService.update(id, req.body);
    if (result == 1) {
      res.status(200).json({
        status: `Update name for table ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Update name for table ${id} failed`,
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
    let result = await this.tableService.delete(id);
    if (result == 1) {
      res.status(200).json({
        status: `Delete name for table ${id} successfully`,
      });
    } else {
      res.status(400).json({
        status: `Delete name for table ${id} failed`,
      });
    }
  }
}