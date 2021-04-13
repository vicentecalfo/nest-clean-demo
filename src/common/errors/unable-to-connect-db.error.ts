import { dbMessages } from '@common/messages/db.messages';

export class UnableToConnectDBError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = dbMessages.UNABLE_TO_CONNECT_DB;
  }
}
