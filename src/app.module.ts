import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@config/db.config';
import { config } from '@config/config';
import { DomainModule } from '@domain/domain.module';
import { AuthModule } from '@auth/auth.module';
import { PersistenceModule } from '@persistence/persistence.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestResponseInterceptor } from '@core/http/nest-response.interceptor';
import { ExceptionHttpFilter } from '@common/filters/exception-http.filter';
import { ControllersModule } from '@controllers/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env-dev',
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    DomainModule,
    ControllersModule,
    AuthModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NestResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionHttpFilter,
    },
  ],
})
export class AppModule {}
