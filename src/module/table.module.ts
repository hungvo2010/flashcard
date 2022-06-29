import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { consumers } from "stream";

@Module({
    imports: [],
    controllers: [],
    providers: [],
})
export class TableModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        throw new Error("Method not implemented.");
    }
    
}