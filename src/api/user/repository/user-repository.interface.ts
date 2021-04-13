import { User } from '../user.entity';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserById(userId: string): Promise<User>;
  emailAlreadyInUse(email: Pick<User, 'email'>): Promise<boolean>;
  updateUserById(
    userId: Pick<User, 'id'>,
    updatedUserData: Partial<User>,
  ): Promise<User>;
}
