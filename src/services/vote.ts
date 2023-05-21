import { Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteContentEntity, VoteEntity } from '../entities';
import { InsertVoteDto, MAX_TAKES, SearchVoteDto } from '../dtos/vote';
import { AccessUser } from '../dtos/auth';

@Injectable()
export class VoteService {
  private readonly logger = new Logger('VoteService');
  constructor(
    @InjectRepository(VoteEntity)
    private readonly voteEntity: Repository<VoteEntity>,
    @InjectRepository(VoteContentEntity)
    private readonly voteContentEntity: Repository<VoteContentEntity>,
  ) {}

  findById(id: string) {
    return this.voteEntity.findOne({ where: { id } });
  }

  /**
   * @description 找投票資料
   */
  async find(searchVoteDto: SearchVoteDto) {
    const options: FindManyOptions<VoteEntity> = {
      skip: searchVoteDto.offset,
      take: MAX_TAKES,
      where: {
        school: searchVoteDto.school,
      },
    };

    return this.voteEntity.find(options);
  }

  /**
   * @description 新增投票
   */
  async insert(insertVoteDto: InsertVoteDto, user: AccessUser) {
    const vote = this.voteEntity.create({
      user: { id: user.id },
      school: user.school,
      ...insertVoteDto,
    });
    const InsertResult = await this.voteEntity.insert(vote);
    const voteId: string = InsertResult.identifiers[0].id;
    this.logger.log(`Vote<${voteId}> inster successfully`);

    insertVoteDto.content.forEach(async (content) => {
      const voteContent = this.voteContentEntity.create({ vote, ...content });
      await this.voteContentEntity.insert(voteContent);
    });

    return voteId;
  }
}
