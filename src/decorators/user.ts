import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessUser } from 'src/dtos/auth';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
