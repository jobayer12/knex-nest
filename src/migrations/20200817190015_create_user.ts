import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users',(table)=>{
        table.increments('id').primary();
        table.string('user_name', 100).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).nullable();
        table.bigInteger('created_at').notNullable().defaultTo(123456789);
        table.bigInteger('updated_at').nullable();
        table.bigInteger('deleted_at').nullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return Promise.resolve(true);
}
