
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Category').del()
    .then(function () {
      // Inserts seed entries
      return knex('Category').insert([
        { name: 'rowValue1',description:'discription',priority_weight:5},
        { name: 'rowValue1',description:'discription',priority_weight:5},
        { name: 'rowValue1',description:'discription',priority_weight:5},
        { name: 'rowValue1',description:'discription',priority_weight:5},
        { name: 'rowValue1',description:'discription',priority_weight:5},
        { name: 'rowValue1',description:'discription',priority_weight:5},
        
      ]);
    });
};
