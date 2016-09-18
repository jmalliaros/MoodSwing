/**
 * Main route definitions
 */

var path = require('path')
var image = require('../controllers/image')

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'))
  })

  // Image processing endpoints
  app.get('/images', image.get)
  app.post('/images', image.post)

  app.get('/music/:song', function(req, res) {
    var song = req.params.song
    if (!song) {
      return res.send(404)
    }

    res.sendFile(path.join(__dirname, '../music/' + song + '.mp3'))
  })
}
