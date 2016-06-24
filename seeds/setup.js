
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
        knex('answers').insert({id: 10, answer: 'mud'}),
        knex('answers').insert({id: 11, answer: 'skull'}),
        knex('answers').insert({id: 12, answer: 'mouse'}),
        knex('answers').insert({id: 13, answer: 'snow'}),
        knex('answers').insert({id: 14, answer: 'love'}),
        knex('answers').insert({id: 15, answer: 'hate'}),
        knex('answers').insert({id: 16, answer: 'happy'}),
        knex('answers').insert({id: 17, answer: 'confused'}),
        knex('answers').insert({id: 18, answer: 'table'}),
        knex('answers').insert({id: 19, answer: 'rapper'}),
        knex('answers').insert({id: 20, answer: 'red peak'}),
        knex('answers').insert({id: 21, answer: 'code'})
      ]);
    });
};
