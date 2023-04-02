import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { AppController } from '../controllers';
import { AppService } from '../services';
import { UserModule } from '.';
import configuration, { i18nOptions, typeOrmModuleOptions } from '../configs';
import { LoggerMiddleware } from '../middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    I18nModule.forRoot(i18nOptions),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
