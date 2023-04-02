import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { UserEntity } from '../entities';
import { I18nTranslations } from '../i18n';
import { RegisterUserDto, InsertUserDto } from '../dtos/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  /**
   * @description find user by emai
   */
  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  /**
   * @description 新增用戶，如果已被註冊回傳 ConflictException
   * @param registerUserDto
   */
  async register(registerUserDto: RegisterUserDto) {
    const InsertResult = await this.userRepository.insert(
      new InsertUserDto(registerUserDto),
    );

    const id: string = InsertResult.identifiers[0].id;
    this.logger.log(`User<${id}> registered successfully`, 'signup');
  }

  login(): string {
    const message = this.i18n.t('msg.test');
    this.logger.log(message);
    return message;
  }
}
