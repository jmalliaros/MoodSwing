'use strict'

var express    = require('express')
var bodyParser = require('body-parser')
var Promise    = require('bluebird')
var webpack = require('webpack')
var config = require('./webpack.config')

var app = express()

var compiler = webpack(config)
 
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

require('./logger') (app)

require('./routes') (app)

// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
