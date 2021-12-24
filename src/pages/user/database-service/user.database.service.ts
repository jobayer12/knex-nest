import { Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { UserCreateTransformer } from '../transformer/user.transformer';
import { UserDatabaseOperation } from '../database-operation/user.database.operation';

@Injectable()
export class UserDatabaseService {
  constructor(private readonly databaseOperation: UserDatabaseOperation) {
  }

  async loadAllUser(filter = {}): Promise<any> {
    return await this.databaseOperation.loadAllUser(filter);
  }

  async createLocalUser(user: UserCreateTransformer): Promise<any> {
    const requestPayload = classToPlain(user);
    delete requestPayload.confirm_password;
    return await this.databaseOperation.createLocalUser(requestPayload);
  }

  async loadUserByEmail(email: string): Promise<UserCreateTransformer[]> {
    return await this.databaseOperation.loadUser({ 'u.email': email });
  }
}