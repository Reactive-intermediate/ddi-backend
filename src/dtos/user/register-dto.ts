import { IsNotEmpty, Length, IsString } from 'class-validator';
import { Match } from '../../decorators';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from './user-dto';

export class RegisterUserDto extends PickType(User, [
  'school',
  'email',
  'password',
  'realName',
] as const) {
  @ApiProperty({
    minLength: 8,
    maxLength: 32,
    description: '需與 passwrod 一致',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @Match('password', { message: 'password different' })
  passwordConfirm: string;
}
