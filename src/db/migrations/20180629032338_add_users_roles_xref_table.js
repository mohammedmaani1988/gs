exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('UserRoleXRef', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('User');
      table
        .uuid('role_id')
        .references('id')
        .inTable('Role');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('UserRoleXRef')]);
};