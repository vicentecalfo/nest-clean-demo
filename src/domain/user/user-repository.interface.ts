import { User } from './user';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserById(userId: string): Promise<User>;
  updateUserById(userId: string, updatedUserData: Partial<User>): Promise<User>;
}
