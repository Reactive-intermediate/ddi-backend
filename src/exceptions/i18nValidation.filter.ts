import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { ResponseError } from '../utils';

@Catch(I18nValidationException)
export class I18nExceptionFilter
  implements ExceptionFilter<I18nValidationException>
{
  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errors = exception.errors;
    if (errors.length > 0) {
      // 錯誤訊息整理
      const errorMessages = errors.map((error) => {
        const constraints = error.constraints;
        const property = error.property;
        const message = [];

        for (const key in constraints) {
          if (constraints.hasOwnProperty(key)) {
            message.push(constraints[key]);
          }
        }

        return {
          property,
          message: message.join(', '),
        };
      });

      // 回傳錯誤
      return response.status(status).json(new ResponseError(errorMessages));
    }

    console.log('errors', errors);

    return response.status(status).json(errors);
  }
}
