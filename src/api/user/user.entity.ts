import { userMessages } from '@messages/user.messages';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  @IsUUID('all', { message: userMessages.VALIDATION.ID.FORMAT })
  @IsOptional()
  public readonly id: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.EMAIL.REQUIRED })
  @IsEmail({}, { message: userMessages.VALIDATION.EMAIL.FORMAT })
  public email: string;

  @IsNotEmpty({ message: userMessages.VALIDATION.NAME.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.NAME.FORMAT })
  public name: string;

  @IsOptional()
  @IsString({ message: userMessages.VALIDATION.ROLE.FORMAT })
  public role: UserRole;

  @IsOptional()
  public status: boolean;

  @IsNotEmpty({ message: userMessages.VALIDATION.PASSWORD.REQUIRED })
  @IsString({ message: userMessages.VALIDATION.PASSWORD.FORMAT })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Exclude({ toPlainOnly: true })
  public salt: string;

  @Expose({ name: 'createdAt' })
  public created_at: Date;

  @Expose({ name: 'updatedAt' })
  public updated_at: Date;

  @Expose({ name: 'emailConfirmed' })
  public email_confirmed: boolean;

  @Exclude({ toPlainOnly: true })
  public email_confirmation_token: string;

  constructor(props) {
    Object.assign(this, props);
  }
}
