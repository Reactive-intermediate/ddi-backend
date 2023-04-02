import { I18nValidationPipe } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { setupSwagger, winstionOptions } from './configs';
import { ENV } from './utils';
import { I18nExceptionFilter } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstionOptions,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new I18nExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>(ENV.PORT);

  const isProd = configService.get<boolean>(ENV.isProd);
  if (isProd !== true) {
    // Dev env show swagger
    setupSwagger(app);
  }

  await app.listen(port);
}
bootstrap();
