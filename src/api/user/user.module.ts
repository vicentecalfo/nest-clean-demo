import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create';
import { FindUserByIdController } from './controllers/find-by-id';
import { UserRepository } from './user.repository';
import { CreateUserUseCase } from './use-cases/create';
import { FindUserByIdUseCase } from './use-cases/find-by-id';
const useCases = [CreateUserUseCase, FindUserByIdUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [CreateUserController, FindUserByIdController],
  providers: [MailSenderProvider, ...useCases],
})
export class UserModule {}
