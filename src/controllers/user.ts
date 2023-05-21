import {
  Controller,
  Post,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserService, SchoolService } from '../services';
import { RegisterUserDto } from '../dtos/user';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../i18n';
import { ResponseSuccess, ResponseError } from '../utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly schoolService: SchoolService,
  ) {}

  @Post('signup')
  async signup(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    // password != passwordConfirm
    if (registerUserDto.password !== registerUserDto.passwordConfirm) {
      throw new BadRequestException(
        new ResponseError(i18n.t('msg.user.register.password_different')),
      );
    }

    // User already register
    const user = await this.userService.findByEmail(registerUserDto.email);
    if (user !== null) {
      throw new ConflictException(
        new ResponseError(i18n.t('msg.user.register.existed')),
      );
    }

    // User school not found (資料庫未找到該學校)
    const school = await this.schoolService.findBySchool(
      registerUserDto.school,
    );
    if (school === null) {
      throw new ConflictException(
        new ResponseError(i18n.t('msg.user.register.school_not_found')),
      );
    }

    // Insert User
    await this.userService.register(registerUserDto, school);
    return new ResponseSuccess(i18n.t('msg.user.register.success'));
  }
}
