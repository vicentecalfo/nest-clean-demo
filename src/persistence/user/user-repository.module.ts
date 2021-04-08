import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

const ormModuleRepository = [TypeOrmModule.forFeature([UserRepository])];

@Module({
  imports: [...ormModuleRepository],
  providers: [],
  exports: [...ormModuleRepository],
})
export class UserRepositoryModule {}
