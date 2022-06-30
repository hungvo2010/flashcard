import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CardModule } from './card.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';


@Module({
  imports: [CardModule, ConfigModule.forRoot({
    envFilePath: 'conf/.development.env',
    isGlobal: true,
    ignoreEnvFile: true,
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
