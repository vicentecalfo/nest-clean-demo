import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import Mail from 'nodemailer/lib/mailer';
import {
  IEmail,
  IEmailBody,
  IEmailForTemplate,
  IEmailSend,
  IMailSenderProvider,
} from './mail-sender.interface';
import { join } from 'path';

@Injectable()
export class MailSenderProvider implements IMailSenderProvider {
  private transporter: Mail;
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport(configService.get('mail'));
  }

  private formatMail({ from, to, subject, body }: IEmail): IEmailSend {
    return {
      from: `${from.name} <${from.email}>`,
      to: `${to.name} <${to.email}>`,
      subject,
      text: body.text,
      html: body.html,
    };
  }

  private async makeMailBody(
    template: string,
    data: Record<string, any>,
  ): Promise<IEmailBody> {
    const templatePath = './src/';
    const html = await fs.promises.readFile(
      join(process.cwd(), templatePath, `${template}.html.ejs`),
      'utf-8',
    );
    const text = await fs.promises.readFile(
      join(process.cwd(), templatePath, `${template}.text.ejs`),
      'utf-8',
    );
    return {
      html: ejs.render(html, data),
      text: ejs.render(text, data),
    };
  }

  public async sendMail({
    template,
    from,
    to,
    subject,
    data,
  }: IEmailForTemplate): Promise<void> {
    try {
      const formattedEmail = this.formatMail({
        from: this.configService.get(`mailProvider.${from}`),
        to,
        subject,
        body: await this.makeMailBody(template, { user: data }),
      });
      this.transporter.sendMail(formattedEmail);
    } catch (error) {
      // pensar no que fazer quando o envio falhar
      console.log(error);
    }
  }
}
