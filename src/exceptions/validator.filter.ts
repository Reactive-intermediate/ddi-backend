import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    /*
        不檢查原生JavaScript的型別，因為刻意寫ValidationPipe，就是要使用自定義的DTO class
        的屬性去做參數型別檢查，如果metatype是原生JavaScript的型別，就直接return 原始參數，
        不做ValidationPipe的檢查。
    */
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 這裡使用class-transformer的方法，將plain javascript object(像是JSON object)，轉換成一個class的object。
    const object = plainToClass(metatype, value);
    const options: ValidatorOptions = {
      forbidNonWhitelisted: true,
    };
    const errors = await validate(object, options);
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
      throw new BadRequestException({
        success: false,
        message: errorMessages,
      });
    }
    return value;
  }

  //檢驗是否為原生JavaScript的型別
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
