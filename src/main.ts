import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './module/app.module';
import * as CookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  // console.log("PORT: ", process.env.PORT);

  app.use(CookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
