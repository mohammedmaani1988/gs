exports.up = (knex, Promise) =>
  // This table is for storing the followup questions
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('Attitude', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('activity_id')
        .references('id')
        .inTable('Activity')
        .notNull();
      table.string('name').notNull();
      table.integer('order_index');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('Attitude')]);
};