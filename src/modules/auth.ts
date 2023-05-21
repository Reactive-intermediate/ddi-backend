import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, SessionService, UserService } from '../services';
import { AuthController } from '../controllers';
import {
  SchoolEntity,
  SessionEntity,
  UserEntity,
  UserRoleEntity,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRoleEntity,
      UserEntity,
      SessionEntity,
      SchoolEntity,
    ]),
  ],
  providers: [AuthService, SessionService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
