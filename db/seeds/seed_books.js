
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {id: 1, title: 'Seeded book 1'},
        {id: 2, title: 'Seeded book 2'}
      ]);
    });
};
