import { dbMessages } from '@common/messages/db.messages';
import { HttpStatus } from '@nestjs/common';

function buildException(error: string, message) {
  return {
    status: HttpStatus[error],
    body: {
      statusCode: HttpStatus[error],
      message,
    },
  };
}

function buildGenericError(message, path) {
  const isDBConnectionIssue = message.split(' ')[1] === 'ECONNREFUSED';
  if (isDBConnectionIssue) {
    return buildException(
      'SERVICE_UNAVAILABLE',
      dbMessages.UNABLE_TO_CONNECT_DB,
    );
  } else {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message,
        path,
      },
    };
  }
}

export function getException(exception) {
  const exceptionName = exception.constructor.name;
  const message = exception.message;
  const exceptions = {
    NotFoundError: buildException('NOT_FOUND', message),
    ConstraintViolationError: buildException('CONFLICT', message),
    Error: buildGenericError(message, exception.path),
  };
  return exceptions.hasOwnProperty(exceptionName)
    ? exceptions[exceptionName]
    : exceptions.Error;
}
