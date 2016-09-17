/**
 * Image methods controller
 */

var fs = require('fs')
var request = require('request-promise')
var indico = require('indico.io')
indico.apiKey = 'e77398fb1e34de03ac0b22d09d5fd21a'

module.exports = {

  /**
   * [post description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  post: function (req, res) {
    fs.readFile(__dirname + '/../test_images/test-image.jpg', function(err, data) {
      if (err) {
        console.log(err)
        res.status(500)
        return
      }

      var base64data = new Buffer(data.buffer).toString('base64')

      return indico.fer(base64data)
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(500).json(err.error)
      })
    })
  
    //   var options = {
    //     method: 'POST',
    //     uri: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    //     headers: {
    //       'Content-Type': 'application/octet-stream',
    //       'Ocp-Apim-Subscription-Key': '38201310d25f4271b7e80d2b28a9ba17'
    //     },
    //     body: base64data,
    //     json: true
    //   }

    //   return request(options)
    //   .then(function(data) {
    //     res.status(200).json(data)
    //   })
    //   .catch(function(err) {
    //     res.status(500).json(err.error)
    //   })
    // })
    
  }
}
