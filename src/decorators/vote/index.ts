import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { VoteContentDto } from '../../dtos/vote/vote-dto';

@ValidatorConstraint({ async: true })
export class IsVoteContentConstraint implements ValidatorConstraintInterface {
  validate(contentList: Array<any>) {
    return contentList.every((content: any) =>
      VoteContentDto.validate(content),
    );
  }
}

export function IsVoteContent(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVoteContentConstraint,
    });
  };
}
