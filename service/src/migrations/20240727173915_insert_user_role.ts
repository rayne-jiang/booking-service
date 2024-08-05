import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex('user_role').insert([
        {roleId: 'GUEST'},
        {roleId: 'EMPLOYEE'}
    ])
}


export async function down(knex: Knex): Promise<void> {
}

