import { CryptoProvider } from '@common/providers/crypto/crypto.provider';
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
import { UserRole } from '../user';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
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
  password: string;

  @Column({ nullable: false, select: false })
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
  emailConfirmationToken: string;

  @BeforeInsert() async prepareCryptoData() {
    const cryptoProvider = new CryptoProvider();
    this.salt = await cryptoProvider.generateSalt();
    this.password = await cryptoProvider.hashPassword(this.password, this.salt);
    this.emailConfirmationToken = await cryptoProvider.generateToken(32);
  }
}
