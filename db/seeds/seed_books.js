
exports.seed = (knex, Promise) => {
  return knex('books').del()
    .then(function () {
      return knex('books').insert([
        {id: 1, title: 'Seeded book 1'},
        {id: 2, title: 'Seeded book 2'}
      ])
    })
}
