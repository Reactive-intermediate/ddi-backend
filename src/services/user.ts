import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { SchoolEntity, UserEntity, UserRoleEntity } from '../entities';
import { I18nTranslations } from '../i18n';
import { RegisterUserDto } from '../dtos/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  /**
   * @description find user by userId
   */
  findById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  /**
   * @description find user by email
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
  async register(registerUserDto: RegisterUserDto, school: SchoolEntity) {
    // Insert User
    const studentID = registerUserDto.email.match(/^[^@]+/)[0];
    const user = this.userRepository.create({
      school,
      studentID,
      alias: studentID,
      email: registerUserDto.email,
      password: registerUserDto.password,
      realName: registerUserDto.realName,
    });
    const InsertResult = await this.userRepository.insert(user);
    const userId: string = InsertResult.identifiers[0].id;
    this.logger.log(`User<${userId}> registered successfully`);

    // Insert Role
    const role = this.userRoleRepository.create({ user });
    await this.userRoleRepository.insert(role);

    return userId;
  }
}
