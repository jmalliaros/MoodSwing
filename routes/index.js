/**
 * Main route definitions
 */

var image = require('../controllers/image')

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Hack The North 2016')
  })

  // Image processing endpoints
  app.post('/images', image.post)
}
