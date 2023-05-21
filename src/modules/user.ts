import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRoleEntity } from '../entities';
import { UserController } from '../controllers';
import { UserService } from '../services';
import { SchoolModule } from './school';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRoleEntity]),
    SchoolModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
