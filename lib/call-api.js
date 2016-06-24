var dotenv = require('dotenv')
dotenv.load()
var request = require('request')

function callAPI (answer, renderResponse, callback) {
  var imgUrlArr = []
  var baseRequest = request.defaults({
    headers: {'Api-Key': process.env.GETTY_KEY,
              'Client-Secret': process.env.GETTY_SECRET}
  })
  var picAPI = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=' + answer

  baseRequest(picAPI, function(err, res, body) {
    // Maybe write something in case it doesn't return 5
    if (!err && res.statusCode == 200) {
      var imgObj = JSON.parse(body)
    }
    for(var i = 0; i < 5; i++) {
      imgUrlArr.push(imgObj.images[i].display_sizes[0].uri)
    }
    renderResponse.imagesArray = imgUrlArr
    callback(null, renderResponse)
  })
}
module.exports = callAPI
