exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('Activity', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('org_id').notNull();
      table.string('name').notNull();
      table.text('description');
      table.string('type');
      table.boolean('compulsory');
      table.text('image');
      table.timestamp('start_date');
      table.timestamp('end_date');
      table.timestamp('visible_from').defaultTo(knex.fn.now());
      table.timestamp('visible_to');
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('Activity')]);
};