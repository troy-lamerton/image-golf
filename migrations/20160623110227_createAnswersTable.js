
exports.up = function(knex, Promise) {
    console.log('create answers table')

  return knex.schema.createTableIfNotExists('answers', function(table) {
    table.increments('id')
    table.string('answer')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('answers').then(function () {
    console.log('answers table was dropped')
  })
};
