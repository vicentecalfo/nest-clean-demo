import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create';
import { FindUserByIdController } from './controllers/find-by-id';
import { UserEntity } from './repository/user.entity';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './use-cases/create';
import { FindUserByIdUseCase } from './use-cases/find-by-id';
const useCases = [CreateUserUseCase, FindUserByIdUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CreateUserController, FindUserByIdController],
  providers: [MailSenderProvider, ...useCases, UserRepository],
})
export class UserModule {}
