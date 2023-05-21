import {
  Injectable,
  NestMiddleware,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenDTO } from '../dtos/auth';
import { AuthService } from '../services';
import { HEADERS } from '../utils';

@Injectable()
export class AnalyzeUserMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AnalyzeUserMiddleware');
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers[HEADERS.AccessToken] as string;
    if (token !== undefined) {
      try {
        const { user } = await this.authService.verifyAsync<AccessTokenDTO>(
          token,
        );
        req.user = user;
      } catch (error) {
        this.logger.warn(`${error}`);
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
