import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@persistence/user/user.repository';
import { User } from './user';

@Injectable()
export class CreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }
}
