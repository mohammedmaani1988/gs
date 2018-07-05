exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('ContactAlternative', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('activity_id')
        .references('id')
        .inTable('Activity');
      table.string('type').notNull();
      table.string('label');
      table.string('value').notNull();
      table.text('body');
      table.string('subject');
      table.string('cc');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('ContactAlternative')]);
};