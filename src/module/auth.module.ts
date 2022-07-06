import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
