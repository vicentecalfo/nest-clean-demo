import { InputEqualsTo } from '@common/validators/input-equals-to.validator';
import { userMessages } from '@messages/user.messages';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../user.entity';
export class CreateUserResquestDTO {
  @IsNotEmpty({ message: userMessages.VALIDATION.EMAIL.REQUIRED })
  @IsEmail({}, { message: userMessages.VALIDATION.EMAIL.FORMAT })
  public readonly email: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.NAME.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.NAME.FORMAT })
  public readonly name: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.PASSWORD.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.PASSWORD.FORMAT })
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
