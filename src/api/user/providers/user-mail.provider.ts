import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UserMailProvider {
  constructor(private mailSenderProvider: MailSenderProvider) {}

  public sendToNewUser({
    name,
    email,
    emailConfirmationToken,
  }: Partial<User>): void {
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
        emailConfirmationToken,
      },
    });
  }
}
