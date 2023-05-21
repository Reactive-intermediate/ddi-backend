import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolEntity } from '../entities';
import { School } from '../dtos/school';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolEntity: Repository<SchoolEntity>,
  ) {}

  findBySchool(school: School) {
    return this.schoolEntity.findOne({ where: { school } });
  }
}
