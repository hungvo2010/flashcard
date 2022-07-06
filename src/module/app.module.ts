import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CardModule } from './card.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';
<<<<<<< HEAD
import { TableModule } from './table.module';


@Module({
  imports: [CardModule, TableModule, ConfigModule.forRoot({
    envFilePath: 'conf/.development.env',
=======
import { join } from 'path';



@Module({
  imports: [CardModule, ConfigModule.forRoot({
    envFilePath: '.development.env',
>>>>>>> 257c164 (jwt authorized)
    isGlobal: true,
  })],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizeMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
