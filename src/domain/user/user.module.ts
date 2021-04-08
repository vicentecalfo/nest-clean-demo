import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '@persistence/user/user-repository.module';
import { CreateUser } from './user-create';
import { FindUserById } from './user-find-by-id';

const useCases = [CreateUser, FindUserById];

@Module({
  imports: [UserRepositoryModule],
  providers: [...useCases, MailSenderProvider],
  exports: [...useCases],
})
export class UserModule {}
