import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "src/controller/auth.controller";
import { TableController } from "src/controller/table.controller";
import { AuthorizeMiddleware } from "src/middleware/authorize.middleware";
import { AuthService } from "src/service/auth.service";
import { TableService } from "src/service/table.service";

@Module({
    imports: [],
    controllers: [TableController, AuthController],
    providers: [TableService, AuthService],
})
export class TableModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes({ path: '/*', method: RequestMethod.ALL });
    }
}