import { User } from '@domain/user/user';
import { IUserRepository } from '@domain/user/user-repository.interface';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository {
  public async createUser(user: User): Promise<UserEntity> {
    const newUser = this.create(user);
    const createdUser = await this.save(newUser);
    return createdUser;
  }
  public async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.findOne(userId);
    return user;
  }
  updateUserById(
    userId: string,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
