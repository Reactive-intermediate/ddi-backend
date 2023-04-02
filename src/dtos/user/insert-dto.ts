import { OmitType, IntersectionType } from '@nestjs/swagger';
import { User } from './user-dto';
import { RegisterUserDto } from './register-dto';

export class InsertUserDto extends IntersectionType(
  OmitType(User, [
    'id',
    'isVerify',
    'isLock',
    'createdAt',
    'updatedAt',
  ] as const),
) {
  constructor(registerUserDto: RegisterUserDto) {
    super();

    const { email, realName, school, password } = registerUserDto;
    this.email = email;
    this.realName = realName;
    this.school = school;
    this.password = password;
    this.studentID = email.match(/^[^@]+/)[0];
    this.alias = this.studentID;
  }
}
