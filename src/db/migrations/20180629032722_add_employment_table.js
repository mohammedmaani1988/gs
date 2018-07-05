exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('Employment', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('User');
      table
        .uuid('salary_type_id')
        .references('id')
        .inTable('SalaryType');
      table
        .float('service_grade')
        .notNull()
        .defaultTo(100);
      table
        .float('fulltime_weekly_work_hours')
        .notNull()
        .defaultTo(40);
      table.float('salary', 9, 2);
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('Employment')]);
};