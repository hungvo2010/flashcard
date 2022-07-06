import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CardModule } from './card.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';
import { TableModule } from './table.module';
import { AuthModule } from './auth.module';
import { TableService } from 'src/service/table.service';

@Module({
  imports: [AuthModule, CardModule, TableModule],
  controllers: [AppController],
  providers: [AppService, TableService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizeMiddleware)
      .forRoutes(AppController)
  }
}
