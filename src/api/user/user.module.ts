import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { CryptoProvider } from '@common/providers/crypto/crypto.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create';
import { FindUserByIdController } from './controllers/find-by-id';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './use-cases/create';
import { FindUserByIdUseCase } from './use-cases/find-by-id';
import { UserMailProvider } from './providers/user-mail.provider';

const useCases = [CreateUserUseCase, FindUserByIdUseCase];
const validators = [];
const providers = [MailSenderProvider, CryptoProvider];
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [CreateUserController, FindUserByIdController],
  providers: [UserMailProvider, ...providers, ...validators, ...useCases],
})
export class UserModule {}
