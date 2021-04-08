import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
  IEmail,
  IEmailSend,
  IMailSenderProvider,
} from './mail-sender.interface';

@Injectable()
export class MailSenderProvider implements IMailSenderProvider {
  private transporter: Mail;
  constructor(configService: ConfigService) {
    this.transporter = nodemailer.createTransport(configService.get('mail'));
  }

  public async sendMail(email: IEmail): Promise<void> {
    const fomattedEmail = this.formatMail(email);
    await this.transporter.sendMail(fomattedEmail);
  }

  private formatMail({ from, to, subject, body }: IEmail): IEmailSend {
    return {
      from: `${from.name} <${from.email}>`,
      to: `${to.name} <${from.email}>`,
      subject,
      html: body,
    };
  }
}
