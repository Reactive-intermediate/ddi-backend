import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UserService, AuthService, SessionService } from '../services';
import { LoginUserDto } from '../dtos/user';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../i18n';
import {
  ResponseSuccess,
  ResponseError,
  HEADERS,
  TIME_MS,
  ResponseData,
} from '../utils';
import { CookieOptions, Response, Request } from 'express';
import { verify } from 'argon2';
import { RefreshTokenDTO } from '../dtos/auth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('UserService');
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('login')
  async login(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (user === null) {
      throw new NotFoundException(
        new ResponseError(i18n.t('msg.user.login.account_not_register')),
      );
    } else if ((await verify(user.password, loginUserDto.password)) === false) {
      // password did not match
      throw new BadRequestException(
        new ResponseError(i18n.t('msg.user.login.password_error')),
      );
    }

    const expires = new Date(Date.now() + TIME_MS.sixMonths);
    const id = await this.sessionService.insert(user, expires);
    const refreshToken = await this.authService.signIn({ id });
    const options: CookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      expires,
    };

    res.cookie(HEADERS.Auth, refreshToken, options);

    return new ResponseSuccess(i18n.t('msg.user.login.success'));
  }

  @Get('refresh')
  async refresh_token(@Req() req: Request) {
    const token: string | null = req.cookies[HEADERS.Auth];
    if (token === null) {
      return new UnauthorizedException();
    }

    try {
      // Session Id
      const { id } = await this.authService.verifyAsync<RefreshTokenDTO>(token);
      const { user } = await this.sessionService.findById(id);

      const accessToken = await this.authService.accessTokenGenerate(user);
      return new ResponseData({ accessToken });
    } catch (error) {
      this.logger.warn(error);
      return new UnauthorizedException();
    }
  }
}
