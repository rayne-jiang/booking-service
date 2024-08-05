import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('reservation', (table) => {
        table.uuid('reservation_id').primary();
        table.uuid('user_id').notNullable();
        table.enum('status', ['queued', 'confirmed', 'cancelled', 'completed', 'outdated']).notNullable();
        table.integer('table_size').notNullable();
        table.string('arrival_date').notNullable();
        table.string('arrival_slot').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('cancelled_at');
        table.string('cancelled_by');
        table.timestamp('confirmed_at');
        table.timestamp('completed_at');
        table.string('completed_by');
        table.unique(['user_id', 'arrival_date']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('reservation');
}

