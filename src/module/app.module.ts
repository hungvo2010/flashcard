import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CardModule } from './card.module';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';
import { TableModule } from './table.module';
import { AuthModule } from './auth.module';
import { TableService } from 'src/service/table.service';
import { UserModule } from './user.module';

@Module({
  imports: [AuthModule, CardModule, TableModule, UserModule],
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
