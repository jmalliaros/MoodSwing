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
  app.post('/images', image.post)
}
