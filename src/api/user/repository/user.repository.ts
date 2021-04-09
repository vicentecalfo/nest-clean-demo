import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';
import { IUserRepository } from './user-repository.interface';
import { UserEntity } from './user.db.entity';
@Injectable()
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
  public async updateUserById(
    userId: string,
    updatedUserData: Partial<User>,
  ): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
