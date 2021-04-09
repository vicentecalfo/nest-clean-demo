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

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, select: false })
  salt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false, default: false })
  email_confirmed: boolean;

  @Column({ nullable: false, select: false, type: 'varchar', length: 64 })
  email_confirmation_token: string;

  @BeforeInsert() async hashPassword() {
    const cryptoProvider = new CryptoProvider();
    this.salt = await cryptoProvider.generateSalt();
    this.password = await cryptoProvider.hashPassword(this.password, this.salt);
    this.email_confirmation_token = await cryptoProvider.generateToken(32);
  }
}
