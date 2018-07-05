exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('User', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('username')
        .unique()
        .notNull();
      table.string('first_name');
      table.string('last_name');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('User')]);
};