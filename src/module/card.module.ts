import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { GreetingController } from "src/controller/app.controller";
import { AuthController } from "src/controller/auth.controller";
import { CardController } from "src/controller/card.controller";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { AuthService } from "src/service/auth.service";
import { CardService } from "src/service/card.service";

@Module({
    imports: [],
    controllers: [CardController, AuthController],
    providers: [CardService, AuthService],
})
export class CardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '/app', method: RequestMethod.GET });
    }
}