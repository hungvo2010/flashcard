import { Controller } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController {
    constructor(private cardService: CategoryService) {}
}