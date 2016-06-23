
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('answers').insert({id: 1, answer: 'red'}),
        knex('answers').insert({id: 2, answer: 'chocolate'}),
        knex('answers').insert({id: 3, answer: 'queen'}),
        knex('answers').insert({id: 4, answer: 'planet'}),
        knex('answers').insert({id: 5, answer: 'peter jackson'}),
        knex('answers').insert({id: 6, answer: 'music'}),
        knex('answers').insert({id: 7, answer: 'boat'}),
        knex('answers').insert({id: 8, answer: 'car'}),
        knex('answers').insert({id: 9, answer: 'cat'}),
        knex('answers').insert({id: 10, answer: 'dog'})
      ]);
    });
};
