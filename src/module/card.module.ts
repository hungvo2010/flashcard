import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from 'src/controller/app.controller';
import { AuthController } from 'src/controller/auth.controller';
import { CardController } from 'src/controller/card.controller';
import { TableController } from 'src/controller/table.controller';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';
import { AuthService } from 'src/service/auth.service';
import { CardService } from 'src/service/card.service';

@Module({
  imports: [],
  controllers: [CardController, AuthController],
  providers: [CardService, AuthService],
})
export class CardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizeMiddleware)
      .forRoutes(CardController, TableController, AppController);
  }
}
