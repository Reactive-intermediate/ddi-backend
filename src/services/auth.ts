import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV, TIME_STRING } from '../utils';
import { UserEntity } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signIn(payload: string | object | Buffer) {
    return this.jwtService.signAsync(payload, {
      expiresIn: TIME_STRING.sixMonths,
    });
  }

  accessTokenGenerate(user: UserEntity) {
    delete user.password;
    delete user.updatedAt;
    user.role = user.role.map((x) => x.role) as any;
    user.school = user.school.school as any;

    const options: JwtSignOptions = {
      expiresIn: TIME_STRING.oneMinute,
    };
    return this.jwtService.signAsync({ user }, options);
  }

  verifyAsync<T extends object>(token: string): Promise<T> {
    const options: JwtVerifyOptions = {
      publicKey: this.configService.get(ENV.jwtPublicKey),
    };
    return this.jwtService.verifyAsync<T>(token, options);
  }
}
