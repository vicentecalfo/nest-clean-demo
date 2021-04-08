import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageProvider {
  classValidatorFormat(message: string) {
    return { message };
  }
}
