import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('reservation', (table) => {
        table.uuid('reservationId').primary();
        table.uuid('userId').notNullable();
        table.enum('status', ['queued', 'confirmed', 'cancelled', 'completed', 'outdated']).notNullable();
        table.integer('tableSize').notNullable();
        table.string('arrivalDate').notNullable();
        table.string('arrivalSlot').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('cancelledAt');
        table.string('cancelledBy');
        table.timestamp('confirmedAt');
        table.timestamp('completedAt');
        table.string('completedBy');
        table.unique(['userId', 'arrivalDate']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('reservation');
}

