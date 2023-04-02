import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from '../services';
import { RegisterUserDto } from '../dtos/user';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../i18n';
import { ResponseSuccess, ResponseError } from '../utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    const user = await this.userService.findByEmail(registerUserDto.email);

    if (user !== null) {
      throw new ConflictException(
        new ResponseError(i18n.t('msg.user.register.existed')),
      );
    }

    await this.userService.register(registerUserDto);
    return new ResponseSuccess(i18n.t('msg.user.register.success'));
  }

  @Post('login')
  login(): string {
    return this.userService.login();
  }
}
