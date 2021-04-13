import { MailSenderProvider } from '@common/providers/email/mail-sender.provider';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UserMailProvider {
  private readonly templatePath = 'api/user/templates/email/';
  constructor(private mailSenderProvider: MailSenderProvider) {}

  public sendToNewUser({
    name,
    email,
    emailConfirmationToken,
  }: Partial<User>): void {
    this.mailSenderProvider.sendMail({
      template: `${this.templatePath}user-created`,
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

  public sendToDeletedUser({ name, email }: Partial<User>): void {
    this.mailSenderProvider.sendMail({
      template: `${this.templatePath}user-deleted`,
      subject: 'Foi bom enquanto durou...',
      from: 'system',
      to: {
        name,
        email,
      },
      data: {
        name,
      },
    });
  }
}
