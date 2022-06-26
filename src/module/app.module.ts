import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { METHODS } from 'http';
import { AppController, GreetingController } from '../controller/app.controller';
import { AppService, GreetingService } from '../service/app.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { CardModule } from './card.module';

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
