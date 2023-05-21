import { I18nValidationPipe } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app';
import { setupSwagger, winstionOptions } from './configs';
import { ENV } from './utils';
import { I18nExceptionFilter } from './exceptions';
import { AuthGuard } from './guards';
import { AuthService } from './services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstionOptions,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  // Guard
  // const authService = app.get(AuthService);
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new AuthGuard(reflector, authService));

  // Pipes
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
