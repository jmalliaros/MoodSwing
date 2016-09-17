/**
 * Image methods controller
 */

var fs = require('fs')
var getRawBody = require('raw-body')
var indico = require('indico.io')
indico.apiKey = 'e77398fb1e34de03ac0b22d09d5fd21a'
// var request = require('request-promise')

module.exports = {

  /**
   * Endpoint that expects binary data for an image to be
   * forwarded to the indico.io/azure API and analyzed.
   * Processes the json result and returns the dominant
   * emotion as a string.
   * @param  {[object]} req
   * @param  {[object]} res
   */
  post: function (req, res) {
    getRawBody(req, {
      length: req.headers['content-length']
    }, function (err, string) {
        if (err) {
          res.status(500).json(err)
          return
        }

        var base64data = new Buffer(string).toString('base64')

        return indico.fer(base64data)
        .then(function(data) {
          res.status(200).json(processEmotions(data))
          return
        })
        .catch(function(err) {
          res.status(500).json(err.error)
          return
        })
        
        // var options = {
        //   method: 'POST',
        //   uri: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
        //   headers: {
        //     'Content-Type': 'application/octet-stream',
        //     'Ocp-Apim-Subscription-Key': '38201310d25f4271b7e80d2b28a9ba17'
        //   },
        //   body: base64data,
        //   json: true
        // }

        // return request(options)
        // .then(function(data) {
        //   res.status(200).json(data)
        // })
        // .catch(function(err) {
        //   res.status(500).json(err.error)
        // })
      })
    }

}

/**
 * Takes an object of emotions and
 * their associated values and returns
 * the dominant one
 * @param  {[object]} result
 * @return {[string]}
 */
var processEmotions = function(result) {
  var emotion
  var high = 0

  for (var key in result) {
    if (result[key] > high) {
      emotion = key
    }
  }

  return { emotion: emotion }
}
