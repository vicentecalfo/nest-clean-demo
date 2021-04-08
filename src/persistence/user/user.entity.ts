import { CryptoProvider } from '@common/providers/crypto/crypto.provider';
import { MessageProvider } from '@common/providers/messages/message.provider';
import { userMessages } from '@common/providers/messages/user.messages';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

const messageProvider = new MessageProvider();

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @IsUUID(
    'all',
    messageProvider.classValidatorFormat(userMessages.VALIDATION.ID.FORMAT),
  )
  @IsOptional()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty(
    messageProvider.classValidatorFormat(
      userMessages.VALIDATION.EMAIL.REQUIRED,
    ),
  )
  @IsEmail(
    {},
    messageProvider.classValidatorFormat(userMessages.VALIDATION.EMAIL.FORMAT),
  )
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @IsNotEmpty(
    messageProvider.classValidatorFormat(userMessages.VALIDATION.NAME.REQUIRED),
  )
  @IsString(
    messageProvider.classValidatorFormat(userMessages.VALIDATION.NAME.FORMAT),
  )
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @IsNotEmpty(
    messageProvider.classValidatorFormat(userMessages.VALIDATION.ROLE.REQUIRED),
  )
  @IsString(
    messageProvider.classValidatorFormat(userMessages.VALIDATION.ROLE.FORMAT),
  )
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @IsOptional()
  @Column({ nullable: false, default: true })
  status: boolean;

  @IsNotEmpty(
    messageProvider.classValidatorFormat(
      userMessages.VALIDATION.PASSWORD.REQUIRED,
    ),
  )
  @IsString(
    messageProvider.classValidatorFormat(
      userMessages.VALIDATION.PASSWORD.FORMAT,
    ),
  )
  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, select: false })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, select: false })
  salt: string;

  @Expose({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'emailConfirmed' })
  @Column({ nullable: false, default: false })
  email_confirmed: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false, select: false, type: 'varchar', length: 64 })
  email_confirmation_token: string;

  @BeforeInsert() async hashPassword() {
    const cryptoProvider = new CryptoProvider();
    this.salt = await cryptoProvider.generateSalt();
    this.password = await cryptoProvider.hashPassword(this.password, this.salt);
    this.email_confirmation_token = await cryptoProvider.generateToken(32);
  }
}
