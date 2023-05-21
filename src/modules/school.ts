import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolService } from '../services';
import { SchoolEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  controllers: [],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
