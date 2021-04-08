import { CryptoProvider } from '@common/crypto/crypto.provider';
import { DTOValidatorMessagesService } from '@common/validators/dto-validator-message.service';
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

const validatorMessage = new DTOValidatorMessagesService();

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @IsUUID('all', validatorMessage.isUUID('id'))
  @IsOptional()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty(validatorMessage.isNotEmpty('email'))
  @IsString(validatorMessage.isString('email'))
  @IsEmail({}, validatorMessage.isEmail('email'))
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @IsNotEmpty(validatorMessage.isNotEmpty('name'))
  @IsString(validatorMessage.isString('name'))
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @IsNotEmpty(validatorMessage.isNotEmpty('role'))
  @IsString(validatorMessage.isString('role'))
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @IsOptional()
  @Column({ nullable: false, default: true })
  status: boolean;

  @IsNotEmpty(validatorMessage.isNotEmpty('password'))
  @IsString(validatorMessage.isString('password'))
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

  @BeforeInsert() async hashPassword() {
    const cryptoProvider = new CryptoProvider();
    this.salt = await cryptoProvider.generateSalt();
    this.password = await cryptoProvider.hashPassword(this.password, this.salt);
  }
}
