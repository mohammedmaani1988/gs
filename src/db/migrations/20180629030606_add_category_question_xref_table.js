exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('CategoryQuestionXRef', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('category_id')
        .references('id')
        .inTable('Category');
      table.uuid('question_id').notNull();
      table
        .float('impact')
        .defaultTo(1)
        .notNull();
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('CategoryQuestionXRef')]);
};