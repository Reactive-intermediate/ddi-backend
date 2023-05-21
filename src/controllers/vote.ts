import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from '../services';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../i18n';
import { ResponseSuccess, ResponseError, ResponseData } from '../utils';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards';
import { InsertVoteDto, SearchVoteDto } from '../dtos/vote';
import { User } from '../decorators';
import { AccessUser } from '../dtos/auth';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('list')
  async list(@Body() searchVoteDto: SearchVoteDto) {
    const voteList = await this.voteService.find(searchVoteDto);
    console.log(voteList);

    return voteList;
  }

  @UseGuards(AuthGuard)
  @Post()
  async insert(@Body() insertVoteDto: InsertVoteDto, @User() user: AccessUser) {
    const voteId = await this.voteService.insert(insertVoteDto, user);
    return new ResponseData({ voteId });
  }
}
