import { PickType } from '@nestjs/swagger';
import { VoteDto } from './vote-dto';

export class InsertVoteDto extends PickType(VoteDto, [
  'topic',
  'content',
] as const) {}
