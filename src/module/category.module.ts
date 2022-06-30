import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthorizeMiddleware } from "src/middleware/authorize.middleware";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../service/category.service";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes({ path: '/*', method: RequestMethod.ALL });
    }
};