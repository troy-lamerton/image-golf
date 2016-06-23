function createAnswer (firstInput) {
  knex('answers').insert({answer: firstInput})
  console.log('Created new answer with text: ', firstInput)
}
