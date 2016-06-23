var path = require('path');
var express = require('express');
var router = express.Router();
var callAPI = require('../lib/call-api')
var dbPath = path.join(__dirname, '../golf.sqlite3')
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath
  },
  useNullAsDefault: true
})

var globalAnswerObj = {
  answer: '',
  activeImageIndex: 0,
  mainImage: '',
  images: []
}
// server stores the 5 images for the current answer being guessed
var globalImages = []

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('answers')
  .pluck('answer')
  .then(function (answers) {
    var length = answers.length
    var randomId = Math.ceil(Math.random()*answers.length)
    knex('answers')
    .where('id', randomId)
    .then(function (randomAnswerObj) {
      console.log('obj-------------:', randomAnswerObj[0].answer)
      globalAnswerObj.answer = randomAnswerObj[0].answer
      callAPI(randomAnswerObj[0].answer, res, renderPage)
    })
    .catch(function (e) {
      return e
    })
  })
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', globalAnswerObj);
});

router.post('/', function(req, res, next) {
  // globalAnswerObj.mainImage = 'lalalalalal'
  globalAnswerObj.activeImageIndex++
  res.redirect('/home');
});

function renderPage (err, res) {
  if (err) {
    return err
  }
  var fourImages = res.imagesArray.slice(1,5)

  globalAnswerObj.images = fourImages
  console.log("SDD", globalAnswerObj)
  // globalAnswerObj.mainImage = glob
  res.render('home', {"mainImage": res.imagesArray[globalAnswerObj.activeImageIndex], "images": fourImages, "score":0})
}

module.exports = router;
