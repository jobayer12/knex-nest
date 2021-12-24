import { Global, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserDatabaseOperation } from './database-operation/user.database.operation';
import { UserDatabaseService } from './database-service/user.database.service';
import { DatabaseService } from '../../database/database.service';

@Global()
@Module({
  providers: [
    UserDatabaseService,
    UserDatabaseOperation,
    DatabaseService
  ],
  exports: [
    UserDatabaseService,
    UserDatabaseOperation,
    DatabaseService
  ],
  controllers: [
    UserController
  ]
})

export class UserModule{
    
}