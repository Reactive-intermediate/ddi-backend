import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity, UserEntity } from '../entities';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async insert(user: UserEntity, expireAt: Date) {
    const InsertResult = await this.sessionRepository.insert({
      user,
      expireAt,
    });
    return InsertResult.identifiers[0].id as string;
  }

  findById(id: string) {
    return this.sessionRepository.findOne({ where: { id } });
  }
}
