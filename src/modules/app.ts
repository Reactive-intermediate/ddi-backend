import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { I18nModule } from 'nestjs-i18n';
import Configuration, { i18nOptions, typeOrmModuleOptions } from '../configs';
import { UserModule, AuthModule, VoteModule } from '.';
import { AppController } from '../controllers';
import { AppService } from '../services';
import { AnalyzeUserMiddleware, LoggerMiddleware } from '../middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      privateKey: Configuration().jwtPrivateKey,
      signOptions: { algorithm: 'RS256' },
      verifyOptions: { ignoreExpiration: false },
    }),
    I18nModule.forRoot(i18nOptions),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    UserModule,
    AuthModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
    consumer.apply(AnalyzeUserMiddleware).forRoutes('');
  }
}
