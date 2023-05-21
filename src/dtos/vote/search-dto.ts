import { PickType } from '@nestjs/swagger';
import { VoteDto } from './vote-dto';

export class SearchVoteDto extends PickType(VoteDto, [
  'school',
  'offset',
] as const) {}
