exports.up = (knex, Promise) =>
  Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTableIfNotExists('Group', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('org_id').notNull();
      table.string('name').notNull();
      table.string('description');
      table
        .float('correlation')
        .defaultTo(100)
        .notNull();
      table.float('occupancy'); // Beläggningsgrad
      table.float('hourly_billing'); // Timpris
      table
        .float('holiday_pay') // Semesterersättning
        .defaultTo(0.13)
        .notNull();
      table
        .bool('substitute') // Ersätts frånvaro med vikarie?
        .defaultTo(false)
        .notNull();
      table
        .float('substitute_effectivness') // Vikarie-effektivtet
        .defaultTo(0.8)
        .notNull();
      table
        .float('administrative_costs_with_substitute')
        .defaultTo(0.2)
        .notNull();
      table
        .float('administrative_costs_without_substitute')
        .defaultTo(0.018)
        .notNull();
      table
        .float('production_loss')
        .defaultTo(0.2)
        .notNull();
      table
        .float('profit')
        .defaultTo(0.15)
        .notNull();
      table.timestamps(true, true);
    }),
  ]);

exports.down = (knex, Promise) => {
  knex.raw('drop extension if exists "uuid-ossp"');
  return Promise.all([knex.schema.dropTableIfExists('Group')]);
};