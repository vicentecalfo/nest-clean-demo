interface IEmailAddress {
  email: string;
  name: string;
}

export interface IEmail {
  from: IEmailAddress;
  to: IEmailAddress;
  subject: string;
  body: string;
}

export interface IEmailSend {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export interface IMailSenderProvider {
  sendMail(email: IEmail): Promise<void>;
}
