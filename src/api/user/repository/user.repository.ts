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
    const newUser = this.create(user);
    const createdUser = await this.save(newUser);
    return createdUser;
  }

  public async emailAlreadyInUse({ email }: Partial<User>): Promise<boolean> {
    const users = await this.find({ where: { email } });
    return users.length > 0;
  }

  public async findUserById(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    return user;
  }

  public async deleteUserById(userId: string): Promise<any> {
    await this.delete(userId);
  }

  public async updateUserById(
    userId: Pick<User, 'id'>,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
