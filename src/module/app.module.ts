import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CardModule } from './card.module';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeMiddleware } from 'src/middleware/authorize.middleware';
import { join } from 'path';

// process.env.PORT = "4000";

console.log(join(__dirname, '.development.env'));


@Module({
  imports: [CardModule, ConfigModule.forRoot({
    envFilePath: join(__dirname, '.development.env'),
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
