import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repository/user.repository';
@Injectable()
@ValidatorConstraint()
export class EmailAlreadyInUseValidator
  implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const emailAlreadyInUse = await this.userRepository.emailAlreadyInUse({
      email,
    });
    return !emailAlreadyInUse;
  }
}
export function CheckIfEmailAlreadyInUse(validationOptions: ValidationOptions) {
  return function (Object: any, propertyName: string) {
    registerDecorator({
      target: Object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyInUseValidator,
    });
  };
}
