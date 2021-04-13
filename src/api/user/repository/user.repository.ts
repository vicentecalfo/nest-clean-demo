import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from './user-repository.interface';
import { UnableToConnectDBError } from '@common/errors/unable-to-connect-db.error';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository {
  constructor() {
    super();
  }
  public async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.create(user);
      const createdUser = await this.save(newUser);
      return createdUser;
    } catch (error) {
      throw new UnableToConnectDBError();
    }
  }

  public async emailAlreadyInUse({ email }: Partial<User>): Promise<boolean> {
    try {
      const users = await this.find({ where: { email } });
      return users.length > 0;
    } catch (error) {
      throw new UnableToConnectDBError();
    }
  }

  public async findUserById(userId: string): Promise<User> {
    try {
      const user = await this.findOne(userId);
      return user;
    } catch (error) {
      throw new UnableToConnectDBError();
    }
  }

  public async deleteUserById(userId: string): Promise<any> {
    try {
      const result = await this.delete(userId);
      console.log(`deletei ${result}`);
      return result;
    } catch (error) {
      throw new UnableToConnectDBError();
    }
  }

  public async updateUserById(
    userId: Pick<User, 'id'>,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
