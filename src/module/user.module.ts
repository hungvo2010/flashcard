import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CardController } from "src/controller/card.controller";
import { UserController } from "src/controller/user.controller";
import { AuthorizeMiddleware } from "src/middleware/authorize.middleware";
import { UserService } from "src/service/user.service";
import { AuthModule } from "./auth.module";

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(UserController);
    }
}