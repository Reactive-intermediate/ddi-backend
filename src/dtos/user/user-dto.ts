import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 16,
    description: '真實姓名',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 16)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  realName: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 16,
    description: '學校名稱',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 16)
  school: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  studentID: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 32,
    pattern: '((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 16)
  alias: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isVerify: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isLock: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
