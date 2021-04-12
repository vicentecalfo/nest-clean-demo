import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { IUserRepository } from './user-repository.interface';
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
  public async findUserById(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    return user;
  }
  public async updateUserById(
    userId: string,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
