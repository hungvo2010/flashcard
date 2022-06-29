import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "src/dto/create-card.dto";

@Injectable()
export class CardService {
    private readonly cards: CreateCardDto[] = [];

    create(card: CreateCardDto){
        this.cards.push(card);
    }

    findAll(): CreateCardDto[]{
        return this.cards;
    }
}