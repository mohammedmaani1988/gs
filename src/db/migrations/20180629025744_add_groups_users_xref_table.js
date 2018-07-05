
exports.up = (knex, Promise) =>
Promise.all([
  knex.raw('create extension if not exists "uuid-ossp"'),
  knex.schema.createTableIfNotExists('GroupUserXRef', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('group_id')
      .references('id')
      .inTable('Group');
    table.uuid('user_id').notNull();
    table
      .boolean('analyze')
      .notNull()
      .defaultTo(false);
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => {
knex.raw('drop extension if exists "uuid-ossp"');
return Promise.all([knex.schema.dropTableIfExists('GroupUserXRef')]);
};