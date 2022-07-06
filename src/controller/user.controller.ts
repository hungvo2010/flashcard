import { Get, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
const { Controller } = require("@nestjs/common");

@Controller('')
export class UserController {
    @Get('/about')
    async getUserpage(@Req() req: Request, @Res() res: Response) {
      let user = req['user'];
      res.render('about', {
        user,
        // result: 'success',
      });
    }
}