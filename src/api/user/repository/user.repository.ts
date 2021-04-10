import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAdapter } from '../adapters/user.adapter';
import { User } from '../user';
import { IUserRepository } from './user-repository.interface';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private userAdapter: UserAdapter,
  ) {}
  public async createUser(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    const createdUser = await this.repository.save(newUser);
    return this.userAdapter.create(createdUser);
  }
  public async findUserById(userId: string): Promise<User> {
    const user = await this.repository.findOne(userId);
    return this.userAdapter.create(user);
  }
  public async updateUserById(
    userId: string,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
