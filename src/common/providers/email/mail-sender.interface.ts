interface IEmailAddress {
  email: string;
  name: string;
}

export interface IEmailBody {
  html: string;
  text?: string;
}

export interface IEmail {
  from: IEmailAddress;
  to: IEmailAddress;
  subject: string;
  body: IEmailBody;
}

export interface IEmailSend {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export interface IEmailForTemplate {
  template: string;
  to: IEmailAddress;
  from: string;
  subject: string;
  data: Record<string, any>;
}

export interface IMailSenderProvider {
  sendMail(email: IEmailForTemplate): Promise<void>;
}
