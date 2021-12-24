import { Injectable } from '@nestjs/common';
import * as knexnest from 'knexnest';
import { DatabaseService } from '../../../database/database.service';
import { plainToClass } from 'class-transformer';
import { UserCreateTransformer } from '../transformer/user.transformer';

@Injectable()
export class UserDatabaseOperation {
  constructor(private readonly databaseService: DatabaseService) { }

  async loadAllUser(filter: any = {}): Promise<any> {
    const knex = await this.databaseService.getConnection();
    const sql = knex.select(['u.id as _id', 'u.user_name as _userName', 'u.email as _email'])
      .from('users as u').orderBy('u.id', 'asc');
    if (filter.hasOwnProperty('id') && +filter.id > 0) {
      sql.where({'u.id': +filter.id});
    }
    return await knexnest(sql);
  }

  async createLocalUser(user: any): Promise<any> {
    user.created_at = Date.now();
    const knex = await this.databaseService.getConnection();
    return knex.withSchema('public').insert(user, ['id']).into('users');
  }

  async loadUser(searchClause?: any): Promise<any> {
    const knex = await this.databaseService.getConnection();
    return knexnest(
      knex.select(['u.id as _id', 'u.user_name as _userName', 'u.email as _email']))
      .from('users as u').where(searchClause).orderBy('u.id', 'asc').
      then(user => { plainToClass(UserCreateTransformer, user) })
  }
}