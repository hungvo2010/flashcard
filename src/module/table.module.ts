import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "src/controller/app.controller";
import { AuthController } from "src/controller/auth.controller";
import { CardController } from "src/controller/card.controller";
import { TableController } from "src/controller/table.controller";
import { AuthorizeMiddleware } from "src/middleware/authorize.middleware";
import { AuthService } from "src/service/auth.service";
import { TableService } from "src/service/table.service";

@Module({
    imports: [],
    controllers: [TableController],
    providers: [TableService],
    exports: [TableService]
})
export class TableModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(TableController);
    }
}