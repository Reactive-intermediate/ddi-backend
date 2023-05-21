import { School } from '../school';
import { Role } from '../user';

export type AccessUser = {
  id: string;
  realName: string;
  school: School;
  studentID: string;
  email: string;
  alias: string;
  isVerify: boolean;
  isLock: boolean;
  createdAt: Date;
  role: Role[];
};

export class AccessTokenDTO {
  user: AccessUser;
  iat: number;
  exp: number;
}
