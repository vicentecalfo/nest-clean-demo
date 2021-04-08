import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@persistence/user/user.repository';
import { User } from './user';

@Injectable()
export class CreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private mailSenderProvider: MailSenderProvider,
  ) {}

  public async execute(user: User): Promise<User> {
    const createdUser = await this.userRepository.createUser(user);
    // Resolver melhor os email enviados pela api
    this.mailSenderProvider.sendMail({
      to: {
        name: createdUser.name,
        email: createdUser.email,
      },
      from: {
        name: 'Codeworker Team',
        email: 'team@codeworker.com.br',
      },
      subject: 'Bem vindo ao sistema',
      body: `Você precisa confirmar seu e-mail para acessar o sistema. Token ${createdUser.email_confirmation_token}`,
    });
    return createdUser;
  }
}
