import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { METHODS } from 'http';
import { AppController, GreetingController } from './app.controller';
import { AppService, GreetingService } from './app.service';
import { CardModule } from './database/card/card.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CardModule],
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
