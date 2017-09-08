var express = require('express');

var app = express();

// Setup the express server
var port = process.env.port || process.env.PORT || 3000
app.listen(port, function () {
  console.log('Express server is listening on port 3000...')
})

// Register bot
var bot = require('./bot')
app.post('/api/messages', bot.listen());
