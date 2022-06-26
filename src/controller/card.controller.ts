import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCardDto } from "src/dto/create-card.dto";
import { CardService } from "src/service/card.service";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {

    }

    @Post('create')
    postAddCard(@Body() cardDto: CreateCardDto) {
        this.cardService.create(cardDto);
    }

    @Get('getall')
    async getAllCards(): Promise<CreateCardDto[]> {
        return this.cardService.findAll();
    }
}