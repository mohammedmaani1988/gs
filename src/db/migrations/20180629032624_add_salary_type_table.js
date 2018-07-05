exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('SalaryType', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('name')
        .unique()
        .notNull();
      table.string('description');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('SalaryType')]);
};