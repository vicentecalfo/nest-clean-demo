import { Provider } from '@nestjs/common';
import { UserRepository } from './user.repository';

export const UserRepositoryProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository,
};
