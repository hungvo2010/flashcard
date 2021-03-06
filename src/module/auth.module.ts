import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "src/controller/auth.controller";
// import { AuthorizeMiddleware } from "src/middleware/authorize.middleware";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { AuthService } from "src/service/auth.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],

})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
            .forRoutes(AuthController)
    }

}