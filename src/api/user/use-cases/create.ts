import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';
import { UserMailProvider } from '../providers/user-mail.provider';
import { ConstraintViolationError } from '@common/errors/constraint-violation.error';
import { userMessages } from '@messages/user.messages';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userMailProvider: UserMailProvider,
  ) {}

  public async execute(user: Partial<User>): Promise<User> {
    const emailAlreadyInUse = await this.userRepository.emailAlreadyInUse({
      email: user.email,
    });
    /**
     * Poderia ter testado com o decorators no DTO, mas preferi ter controle
     * do status http 409 Conflict e não usar o padrão de 400 para Bad Request
     **/
    if (emailAlreadyInUse)
      throw new ConstraintViolationError(userMessages.EMAIL_ALREADY_IN_USE);
    const createdUser = await this.userRepository.createUser(user);
    this.userMailProvider.sendToNewUser(createdUser);
    return createdUser;
  }
}
