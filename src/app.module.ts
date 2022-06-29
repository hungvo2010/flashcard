import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { METHODS } from 'http';
import { AppController, GreetingController } from './app.controller';
import { AppService, GreetingService } from './app.service';
import { CardModule } from './database/card/card.module';
import { TableModule } from './database/table/table.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CardModule, TableModule],
  controllers: [AppController, GreetingController],
  providers: [AppService, GreetingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '/app', method: RequestMethod.GET});
  }
}
