import { userMessages } from '../user.messages';

export class UserNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = userMessages.NOT_FOUND;
  }
}
