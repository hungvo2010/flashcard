import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { METHODS } from 'http';
import { AppController, GreetingController } from '../controller/app.controller';
import { AppService, GreetingService } from '../service/app.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { CardModule } from './card.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [CardModule],
  controllers: [AppController],
  providers: [AppService, GreetingService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '/app', method: RequestMethod.GET});
  }
}
