import { User } from '../user.entity';
import { UserEntity } from './user.db.entity';

export interface IUserRepository {
  createUser(user: User): Promise<UserEntity>;
  findUserById(userId: string): Promise<UserEntity>;
  updateUserById(
    userId: string,
    updatedUserData: Partial<User>,
  ): Promise<UserEntity>;
}
