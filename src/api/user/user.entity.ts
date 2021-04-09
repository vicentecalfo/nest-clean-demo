import { userMessages } from '@messages/user.messages';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class User {
  @IsUUID('all', { message: userMessages.VALIDATION.ID.FORMAT })
  @IsOptional()
  public readonly id: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.EMAIL.REQUIRED })
  @IsEmail({}, { message: userMessages.VALIDATION.EMAIL.FORMAT })
  email: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.NAME.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.NAME.FORMAT })
  name: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.ROLE.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.ROLE.FORMAT })
  role: string;

  @IsOptional()
  status: boolean;

  @IsNotEmpty({ message: userMessages.VALIDATION.PASSWORD.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.PASSWORD.FORMAT })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  salt: string;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  @Expose({ name: 'emailConfirmed' })
  email_confirmed: boolean;

  @Exclude({ toPlainOnly: true })
  email_confirmation_token: string;

  constructor(props) {
    Object.assign(this, props);
  }
}
