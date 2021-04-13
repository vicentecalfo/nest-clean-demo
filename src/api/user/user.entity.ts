import { CryptoProvider } from '@common/providers/crypto/crypto.provider';
import { Exclude } from 'class-transformer';
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

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
    default: UserRole.ADMIN,
  })
  role: UserRole;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: false, select: false })
  @Exclude({ toPlainOnly: true })
  salt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'email_confirmed' })
  emailConfirmed: boolean;

  @Column({
    nullable: false,
    select: false,
    type: 'varchar',
    length: 64,
    name: 'email_confirmation_token',
  })
  @Exclude({ toPlainOnly: true })
  emailConfirmationToken: string;

  // resolver isso de 48horas
  @CreateDateColumn({
    nullable: false,
    name: 'date_email_confirmation_token',
  })
  dateEmailConfirmationToken: Date;

  @BeforeInsert() async prepareCryptoData() {
    const cryptoProvider = new CryptoProvider();
    this.salt = await cryptoProvider.generateSalt();
    this.password = await cryptoProvider.hashPassword(this.password, this.salt);
    this.emailConfirmationToken = await cryptoProvider.generateToken();
  }
}
