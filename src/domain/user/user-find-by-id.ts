import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@persistence/user/user.repository';
import { User } from './user';

@Injectable()
export class FindUserById {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  public async execute(userId: string): Promise<User> {
    return await this.userRepository.findUserById(userId);
  }
}
