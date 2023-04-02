import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, httpVersion } = request;
    const referer = request.headers.referer || '-';
    const userAgent = request.headers['user-agent'] || '-';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${ip} ${method} ${originalUrl} HTTP/${httpVersion} ${statusCode} ${contentLength} ${referer} ${userAgent} `,
      );
    });

    next();
  }
}
