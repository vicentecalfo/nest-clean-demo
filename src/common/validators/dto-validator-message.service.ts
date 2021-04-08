import { Injectable } from '@nestjs/common';

interface IFormatMessage {
  message: string;
}

@Injectable()
export class DTOValidatorMessagesService {
  private formatMessage(message: string): IFormatMessage {
    return { message };
  }

  public isNotEmpty(property: string) {
    return this.formatMessage(`O campo ${property} é obrigatório.`);
  }

  public isString(property: string) {
    return this.formatMessage(`O campo ${property} deve ser do tipo string.`);
  }

  public isEmail(property: string) {
    return this.formatMessage(
      `O valor do campo ${property} deve ser um e-mail válido.`,
    );
  }

  public isUUID(property: string) {
    return this.formatMessage(
      `O valor do campo ${property} deve ser do tipo UUID.`,
    );
  }
}
