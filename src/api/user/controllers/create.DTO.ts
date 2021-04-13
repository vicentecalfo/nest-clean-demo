import { InputEqualsTo } from '@common/validators/input-equals-to.validator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../user.entity';
import { userMessages } from '../user.messages';
export class CreateUserRequestDTO {
  @IsNotEmpty({ message: userMessages.VALIDATION.EMAIL.REQUIRED })
  @IsEmail({}, { message: userMessages.VALIDATION.EMAIL.FORMAT })
  public readonly email: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.NAME.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.NAME.FORMAT })
  public readonly name: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.PASSWORD.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.PASSWORD.FORMAT })
  @Matches(
    new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))',
    ),
    {
      message: userMessages.VALIDATION.PASSWORD.WEAK,
    },
  )
  @MinLength(8, {
    message: userMessages.VALIDATION.PASSWORD.MIN,
  })
  @MaxLength(16, {
    message: userMessages.VALIDATION.PASSWORD.MAX,
  })
  public readonly password: string;

  @IsNotEmpty({
    message: userMessages.VALIDATION.PASSWORD_CONFIRMATION.REQUIRED,
  })
  @InputEqualsTo('password', {
    message: userMessages.VALIDATION.PASSWORD_CONFIRMATION.NOT_EQUAL,
  })
  public readonly passwordConfirmation: string;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
