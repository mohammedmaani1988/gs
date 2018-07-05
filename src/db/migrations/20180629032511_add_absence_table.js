exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('Absence', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('User');
      table.enu('type', ['Short', 'Long']).defaultTo('Short');
      table.timestamp('start').notNull();
      table.timestamp('end').notNull();
      table.float('quantity');
      table
        .enu('quantity_unit', ['Number', 'Workday', 'CalendarDay', 'Month', 'Hour', 'Week'])
        .defaultTo('Hour');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('Absence')]);
};