import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from '../services';
import { VoteController } from '../controllers';
import { VoteEntity, VoteContentEntity } from '../entities';
import { AuthModule } from './auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteEntity, VoteContentEntity]),
    AuthModule,
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
