import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailSenderProvider: MailSenderProvider,
  ) {}

  public async execute(user: User): Promise<User> {
    const createdUser = await this.userRepository.createUser(user);
    const { name, email, email_confirmation_token } = createdUser;
    this.mailSenderProvider.sendMail({
      template: 'user-created',
      subject: 'Bem vindo!',
      from: 'system',
      to: {
        name,
        email,
      },
      data: {
        name,
        emailConfirmationToken: email_confirmation_token,
      },
    });
    return new User({ ...createdUser });
  }
}
