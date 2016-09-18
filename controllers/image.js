/**
 * Image methods controller
 */

var fs = require('fs')
var indico = require('indico.io')
indico.apiKey = 'e77398fb1e34de03ac0b22d09d5fd21a'
var request = require('request-promise')
var path = require('path')

module.exports = {

  /**
   * [get description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  get: function(req, res) {
    return res.sendFile(path.join(__dirname, '../uploads/out.png'))
  },

  /**
   * Endpoint that expects binary data for an image to be
   * forwarded to the indico.io/azure API and analyzed.
   * Processes the json result and returns the dominant
   * emotion as a string.
   * @param  {[object]} req
   * @param  {[object]} res
   */
  post: function (req, res) {
    if (!req.body.imageURI) {
      return res.status(400).json({ error: "Missing imageURI" })
    }

    var base64Data = req.body.imageURI.replace(/^data:image\/png;base64,/, "")

    fs.writeFile(__dirname + '/../uploads/out.png', base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json(err.error)
      } 
      
      var options = {
        method: 'POST',
        uri: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '38201310d25f4271b7e80d2b28a9ba17'
        },
        body: {
          url: 'https://1e6f118a.ngrok.io/images'
        },
        json: true
      }

      return request(options)
      .then(function(data) {
        console.log('azure data:', data)
        res.status(200).json(data)
      })
      .catch(function(err) {
        console.log('error:', err.error)
        res.status(500).json(err.error)
      })
    });

    // return indico.fer(base64Data)
    // .then(function(data) {
    //   res.status(200).json(processEmotionsbase64Data(data))
    //   return
    // })
    // .catch(function(err) {
    //   res.status(500).json(err.error)
    //   return
    // })
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
