import {
  IsNotEmpty,
  Length,
  IsString,
  IsDate,
  Min,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsVoteContent } from 'src/decorators/vote';
import { School } from '../school';

export class VoteContentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  static validate(content: any): boolean {
    return (
      typeof content === 'object' &&
      Object.keys(content).length === 2 &&
      typeof content.title === 'string' &&
      typeof content.content === 'string'
    );
  }
}

export class VoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ enum: School })
  @IsNotEmpty()
  @IsEnum(School)
  school: School;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 36)
  topic: string;

  @ApiProperty({ type: [VoteContentDto] })
  @IsNotEmpty()
  @IsArray()
  @IsVoteContent({ message: 'content type error' })
  content: VoteContentDto[];

  @IsNotEmpty()
  @IsString()
  @Length(10)
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  voteCount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
