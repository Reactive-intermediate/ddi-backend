import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenDTO } from '../dtos/auth';
import { AuthService } from '../services';
import { HEADERS } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthGuard');
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers[HEADERS.AccessToken] as string;

    if (!token) {
      return false;
    }

    try {
      const { user } = await this.authService.verifyAsync<AccessTokenDTO>(
        token,
      );
      request.user = user;
      return true;
    } catch (error) {
      this.logger.warn(`${error}`);
      return false;
    }
  }
}
