import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.uuid('userId').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('phone');
         // For one user as both with one more roles, we should have different registered for login
        table.integer('roleId').notNullable().references('id').inTable('user_role');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('deletedAt');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user');
}

