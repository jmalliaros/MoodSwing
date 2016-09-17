/**
 * Main route definitions
 */

module.exports = function(app) {
  // Index route
  app.get('/', function (req, res) {
    res.send('Hack The North 2016')
  })
}
