import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './user/user-repository.module';

const repositoriesModules = [UserRepositoryModule];

@Module({
  imports: [...repositoriesModules],
  exports: [...repositoriesModules],
  providers: [],
})
export class PersistenceModule {}
