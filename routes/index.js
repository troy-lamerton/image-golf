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
  score: 0,
  answer: '',
  activeImageIndex: 0,
  seenImages: [],  // what is sent to fill four boxes
  finished: false,
  result: ''
}
// server stores the 5 images for the current answer being guessed
var globalImages = []  // all five images

/* GET home page. */
router.get('/home', function(req, res, next) {
  resetGlobalObj()
  console.log('ROUTER GET')
  knex('answers')
  .pluck('answer')
  .then(function (answers) {
    var length = answers.length
    var randomId = Math.ceil(Math.random()*answers.length)
    knex('answers')
    .where('id', randomId)
    .then(function (randomAnswerObj) {
      console.log('new answer-------------:', randomAnswerObj[0].answer)
      globalAnswerObj.answer = randomAnswerObj[0].answer
      callAPI(randomAnswerObj[0].answer, res, renderNewAnswer)
    })
    .catch(function (e) {
      return e
    })
  })
});

router.post('/home', function(req, res, next) {
  globalAnswerObj.score++

  //compare answer to guess
  var guess = req.body.guess.toLowerCase()
  if (guess === globalAnswerObj.answer) {
    // correct, reset globalAnwerObj
    console.log('---correct')
    res.render('home', {"mainImage": globalImages[globalAnswerObj.activeImageIndex], "images": globalAnswerObj.seenImages, "score": globalAnswerObj.score, finished: true, result: 'You won, the answer was "' + globalAnswerObj + '"'})
    resetGlobalObj()
    return
  } else {
    // wrong, new image
    console.log('---wrong')
    //handle if this is the 5th wrong guess
    if (globalAnswerObj.activeImageIndex === 4) {
      // you failed --- what do we wana do here?
      console.log('WRONG x 5')
      res.render('home', {"mainImage": globalImages[globalAnswerObj.activeImageIndex], "images": globalAnswerObj.seenImages, "score": globalAnswerObj.score, finished: true, result: 'You lose, the answer was "' + globalAnswerObj + '"'})
      resetGlobalObj()
      return
    }
    globalAnswerObj.seenImages.push(globalImages[globalAnswerObj.activeImageIndex])
    globalAnswerObj.activeImageIndex++
    renderPageAfterGuess(null, res)
  }

  console.log(globalAnswerObj)
});

function renderPageAfterGuess (err, res) {
  res.render('home', {"mainImage": globalImages[globalAnswerObj.activeImageIndex], "images": globalAnswerObj.seenImages, "score": globalAnswerObj.score})
}

function renderNewAnswer (err, res) {
  if (err) {
    return err
  }
  //res.imagesArray = ['www', 'www'.....]
  globalImages = res.imagesArray

  globalAnswerObj.seenImages = []
  console.log("SDD", globalAnswerObj)
  res.render('home', {"mainImage": globalImages[globalAnswerObj.activeImageIndex], "images": globalAnswerObj.seenImages, "score": globalAnswerObj.score})
}

function resetGlobalObj () {
  globalAnswerObj = {
    score: 0,
    answer: '',
    activeImageIndex: 0,
    seenImages: [],  // what is sent to fill four boxes}
    finished: false,
    result: ''
  }
  globalImages = []
}

router.get('/', function(req, res) {
  res.redirect('/home')
})

module.exports = router;
